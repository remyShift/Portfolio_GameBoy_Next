import { getMusicVolume } from "./audioSettings";
import {
	getSharedAudioContext,
	getWelcomeChimeEndTime,
} from "./retroAudio";
import { getLoadedTrack, loadTrack } from "./trackCache";

const FADE_OUT_SECONDS = 0.4;
// Why: fondu court — au-dela, les premieres centaines de ms restent sous le
// seuil d'audibilite et la musique donne l'impression de ne pas demarrer
const FADE_IN_SECONDS = 0.25;
// Why: hausse mesuree de +10 dB par rapport a l'ancien 0.07 sur 30 dB, qui
// sortait a -52 dBFS RMS. Echelle obtenue sur des pistes a -17 dBFS RMS :
// -52 dBFS au cran 1, -42 dBFS au cran 3 (defaut), -32 dBFS au cran 5.
const MUSIC_MAX_GAIN = 0.17;
const MUSIC_DB_RANGE = 24;

function musicGainFromVolume(volume: number): number {
	if (volume <= 0) return 0;
	volume = Math.min(1, volume);
	// Why: perception logarithmique — chaque cran du reglage vaut ~5 dB,
	// sinon les niveaux hauts sont indistinguables
	return MUSIC_MAX_GAIN * Math.pow(10, (-MUSIC_DB_RANGE * (1 - volume)) / 20);
}

type MusicPlayerState = {
	gain: GainNode;
	source: AudioBufferSourceNode | null;
	buffer: AudioBuffer | null;
	currentTrack: string | null;
	startedAt: number;
	startOffset: number;
	pausedAt: number | null;
	switchToken: number;
};

type WindowWithMusicPlayer = Window & {
	__retroMusicPlayer?: MusicPlayerState;
};

function getPlayer(): MusicPlayerState {
	const w = window as WindowWithMusicPlayer;
	if (!w.__retroMusicPlayer) {
		// Why: le singleton survit aux remounts React et au HMR, sinon chaque
		// remontage rebranche un graphe concurrent sur la meme sortie
		const ctx = getSharedAudioContext();
		const gain = ctx.createGain();
		gain.gain.value = 0;
		gain.connect(ctx.destination);
		w.__retroMusicPlayer = {
			gain,
			source: null,
			buffer: null,
			currentTrack: null,
			startedAt: 0,
			startOffset: 0,
			pausedAt: null,
			switchToken: 0,
		};
	}
	return w.__retroMusicPlayer;
}

function rampGainTo(
	player: MusicPlayerState,
	target: number,
	seconds: number,
	startAt: number = getSharedAudioContext().currentTime,
): void {
	player.gain.gain.cancelScheduledValues(startAt);
	player.gain.gain.setValueAtTime(player.gain.gain.value, startAt);
	player.gain.gain.linearRampToValueAtTime(target, startAt + seconds);
}

function startSource(
	player: MusicPlayerState,
	buffer: AudioBuffer,
	offset: number,
	startAt: number = getSharedAudioContext().currentTime,
): void {
	const ctx = getSharedAudioContext();
	const source = ctx.createBufferSource();
	source.buffer = buffer;
	source.loop = true;
	source.connect(player.gain);
	source.start(startAt, offset % buffer.duration);

	player.source = source;
	player.buffer = buffer;
	player.startedAt = startAt;
	player.startOffset = offset % buffer.duration;
	player.pausedAt = null;
}

function stopSource(player: MusicPlayerState): void {
	if (!player.source) return;
	try {
		player.source.stop();
	} catch {
		// Why: stop() jette si la source n'a jamais demarre
	}
	player.source.disconnect();
	player.source = null;
}

function readPlaybackOffset(player: MusicPlayerState): number {
	if (!player.source || !player.buffer) return 0;
	// Why: la source peut être programmée dans le futur, derrière l'arpège
	const elapsed = Math.max(
		0,
		getSharedAudioContext().currentTime - player.startedAt,
	);
	return (player.startOffset + elapsed) % player.buffer.duration;
}

function wait(seconds: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export function getCurrentTrack(): string | null {
	if (typeof window === "undefined") return null;
	const w = window as WindowWithMusicPlayer;
	return w.__retroMusicPlayer?.currentTrack ?? null;
}

export async function playTrack(src: string): Promise<boolean> {
	if (typeof window === "undefined") return false;
	const player = getPlayer();

	if (player.currentTrack === src && player.source) return true;

	const token = ++player.switchToken;

	if (player.source) {
		rampGainTo(player, 0, FADE_OUT_SECONDS);
		await wait(FADE_OUT_SECONDS);
		// Why: une navigation plus recente a pu relancer un switch pendant le fondu
		if (token !== player.switchToken) return false;
		stopSource(player);
	}

	// Why: quand la piste est deja decodee, ce chemin reste synchrone et start()
	// s'execute dans le geste utilisateur, seul moment ou WebKit ouvre la sortie
	const buffer = getLoadedTrack(src) ?? (await loadTrack(src));
	if (!buffer || token !== player.switchToken) return false;

	player.currentTrack = src;
	// Why: sur le geste qui congédie le splash, l'arpège d'accueil est encore en
	// train de sonner — la musique entre derrière lui plutôt que par-dessus
	const startAt = Math.max(
		getSharedAudioContext().currentTime,
		getWelcomeChimeEndTime(),
	);
	startSource(player, buffer, 0, startAt);
	rampGainTo(
		player,
		musicGainFromVolume(getMusicVolume()),
		FADE_IN_SECONDS,
		startAt,
	);
	return true;
}

export function stopMusic(): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player) return;

	const token = ++player.switchToken;
	player.currentTrack = null;
	if (!player.source) return;

	rampGainTo(player, 0, FADE_OUT_SECONDS);
	void wait(FADE_OUT_SECONDS).then(() => {
		if (token === player.switchToken) stopSource(player);
	});
}

export function applyMusicVolume(volume: number): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player || !player.currentTrack) return;

	if (volume <= 0) {
		const token = ++player.switchToken;
		rampGainTo(player, 0, FADE_OUT_SECONDS);
		void wait(FADE_OUT_SECONDS).then(() => {
			if (token !== player.switchToken) return;
			player.pausedAt = readPlaybackOffset(player);
			stopSource(player);
		});
		return;
	}

	if (!player.source) {
		if (!player.buffer) return;
		player.switchToken++;
		startSource(player, player.buffer, player.pausedAt ?? 0);
		rampGainTo(player, musicGainFromVolume(volume), FADE_IN_SECONDS);
		return;
	}

	rampGainTo(player, musicGainFromVolume(volume), 0.1);
}

export function pauseForHiddenTab(): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player || !player.source) return;

	// Why: une AudioBufferSourceNode ne se met pas en pause — on retient la
	// position pour repartir exactement la ou on s'etait arrete
	player.switchToken++;
	const offset = readPlaybackOffset(player);
	stopSource(player);
	player.pausedAt = offset;
}

export function resumeFromHiddenTab(): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player || player.source || player.pausedAt === null) return;
	if (!player.buffer || !player.currentTrack || getMusicVolume() <= 0) return;

	player.switchToken++;
	startSource(player, player.buffer, player.pausedAt);
	rampGainTo(player, musicGainFromVolume(getMusicVolume()), FADE_IN_SECONDS);
}
