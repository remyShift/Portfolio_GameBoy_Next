import { getMusicVolume } from "./audioSettings";
import { getSharedAudioContext } from "./retroAudio";

const FADE_OUT_SECONDS = 0.4;
const FADE_IN_SECONDS = 0.8;
const MUSIC_MAX_GAIN = 0.07;
const MUSIC_DB_RANGE = 30;

function musicGainFromVolume(volume: number): number {
	if (volume <= 0) return 0;
	volume = Math.min(1, volume);
	// Why: perception logarithmique — chaque cran du réglage vaut 6 dB
	// (gain doublé par niveau), sinon les niveaux hauts sont indistinguables
	return MUSIC_MAX_GAIN * Math.pow(10, (-MUSIC_DB_RANGE * (1 - volume)) / 20);
}

type MusicPlayerState = {
	element: HTMLAudioElement;
	gain: GainNode;
	currentTrack: string | null;
	wasPlayingBeforeHidden: boolean;
	switchToken: number;
};

type WindowWithMusicPlayer = Window & {
	__retroMusicPlayer?: MusicPlayerState;
};

function getPlayer(): MusicPlayerState {
	const w = window as WindowWithMusicPlayer;
	if (!w.__retroMusicPlayer) {
		// Why: createMediaElementSource ne peut être appelé qu'une seule fois
		// par élément — le singleton survit aux remounts React et au HMR.
		const ctx = getSharedAudioContext();
		const element = new Audio();
		element.loop = true;
		element.preload = "none";
		const source = ctx.createMediaElementSource(element);
		const gain = ctx.createGain();
		gain.gain.value = 0;
		source.connect(gain);
		gain.connect(ctx.destination);
		w.__retroMusicPlayer = {
			element,
			gain,
			currentTrack: null,
			wasPlayingBeforeHidden: false,
			switchToken: 0,
		};
	}
	return w.__retroMusicPlayer;
}

function rampGainTo(
	player: MusicPlayerState,
	target: number,
	seconds: number,
): void {
	const ctx = getSharedAudioContext();
	const now = ctx.currentTime;
	player.gain.gain.cancelScheduledValues(now);
	player.gain.gain.setValueAtTime(player.gain.gain.value, now);
	player.gain.gain.linearRampToValueAtTime(target, now + seconds);
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

	if (player.currentTrack === src && !player.element.paused) return true;

	const token = ++player.switchToken;

	if (!player.element.paused) {
		rampGainTo(player, 0, FADE_OUT_SECONDS);
		await wait(FADE_OUT_SECONDS);
		// Why: une navigation plus récente a pu relancer un switch pendant le fade
		if (token !== player.switchToken) return false;
		player.element.pause();
	}

	player.element.src = src;
	player.currentTrack = src;

	try {
		await player.element.play();
	} catch {
		// Why: autoplay policy — le prochain geste utilisateur retentera
		return false;
	}

	if (token !== player.switchToken) return false;
	rampGainTo(player, musicGainFromVolume(getMusicVolume()), FADE_IN_SECONDS);
	return true;
}

export function stopMusic(): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player) return;

	const token = ++player.switchToken;
	player.currentTrack = null;
	if (player.element.paused) return;

	rampGainTo(player, 0, FADE_OUT_SECONDS);
	void wait(FADE_OUT_SECONDS).then(() => {
		if (token === player.switchToken) player.element.pause();
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
			if (token === player.switchToken) player.element.pause();
		});
		return;
	}

	if (player.element.paused) {
		player.switchToken++;
		void player.element.play().then(
			() => rampGainTo(player, musicGainFromVolume(volume), FADE_IN_SECONDS),
			() => undefined,
		);
		return;
	}

	rampGainTo(player, musicGainFromVolume(volume), 0.1);
}

export function pauseForHiddenTab(): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player) return;

	player.wasPlayingBeforeHidden = !player.element.paused;
	if (player.wasPlayingBeforeHidden) {
		player.switchToken++;
		player.element.pause();
	}
}

export function resumeFromHiddenTab(): void {
	if (typeof window === "undefined") return;
	const w = window as WindowWithMusicPlayer;
	const player = w.__retroMusicPlayer;
	if (!player) return;

	if (
		player.wasPlayingBeforeHidden &&
		player.currentTrack &&
		getMusicVolume() > 0
	) {
		void player.element.play().then(
			() => rampGainTo(player, musicGainFromVolume(getMusicVolume()), FADE_IN_SECONDS),
			() => undefined,
		);
	}
	player.wasPlayingBeforeHidden = false;
}
