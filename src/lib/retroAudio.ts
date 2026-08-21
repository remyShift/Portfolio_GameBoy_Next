import { getUiVolume } from './audioSettings';

// Why: gains calibrés pour rester au-dessus du lit musical, qui sort a
// -19 dBFS crete au reglage par defaut (cf. MUSIC_MAX_GAIN dans musicPlayer.ts)
// — les trois valeurs s'ajustent ensemble
export const WELCOME_CHIME_BASE_GAIN = 0.18;
const NAV_CLICK_BASE_GAIN = 0.06;

// Why: plancher de decroissance exprime en fraction du gain de depart, pour que
// l'enveloppe garde la meme forme quel que soit le niveau
export const DECAY_FLOOR_RATIO = 0.01;

// Why: marge minimale pour ne pas programmer un événement dans le quantum de
// rendu déjà en cours (128 frames), sinon le premier son claque
export const SCHEDULE_LEAD_SECONDS = 0.02;

const NAVIGABLE_FOR_SOUND =
	"a, button, input, select, textarea, label, [role='button'], [tabindex]";

export const BOOT_OVERLAY_SELECTOR = '[data-boot-overlay]';

type WindowWithAudio = Window & {
	__retroAudioContext?: AudioContext;
	__isRetroAudioOutputWarm?: boolean;
};

export function isTargetNavigableForClickSound(
	target: EventTarget | null,
): boolean {
	if (!target || !(target instanceof Element)) return false;
	const el = target.closest(NAVIGABLE_FOR_SOUND);
	if (!el) return false;
	if (el.closest('[data-no-sound]')) return false;
	if (el instanceof HTMLInputElement) {
		const t = el.type;
		if (t === 'hidden' || t === 'range' || t === 'color' || t === 'file')
			return false;
	}
	return true;
}

export function getSharedAudioContext(): AudioContext {
	if (typeof window === 'undefined') {
		throw new Error('getSharedAudioContext is browser-only');
	}
	const w = window as WindowWithAudio;
	if (!w.__retroAudioContext) {
		w.__retroAudioContext = new AudioContext();
	}
	return w.__retroAudioContext;
}

// Why: instancier l'AudioContext coûte 100 à 500 ms sur mobile (ouverture de la
// route audio matérielle). Appelé au montage, ce coût est payé pendant le boot
// au lieu de l'être au moment du geste, là où il s'entend.
export function prepareAudioContext(): void {
	if (typeof window === 'undefined') return;
	getSharedAudioContext();
}

function warmUpAudioOutput(ctx: AudioContext): void {
	const w = window as WindowWithAudio;
	if (w.__isRetroAudioOutputWarm) return;
	w.__isRetroAudioOutputWarm = true;
	// Why: iOS n'ouvre réellement la sortie qu'au premier rendu — un buffer muet
	// la déclenche avant le premier son utile, qui sinon arrive en retard
	const silentTick = ctx.createBufferSource();
	silentTick.buffer = ctx.createBuffer(1, 1, ctx.sampleRate);
	silentTick.connect(ctx.destination);
	silentTick.start();
}

// Why: resume() doit partir de façon synchrone depuis le handler de geste —
// après un await, WebKit ne voit plus d'activation utilisateur. Sa promesse ne
// se résout parfois jamais, donc on ne l'attend pas : currentTime reste gelé
// tant que le contexte dort, les sons programmés partent dès la reprise.
export function unlockAudioContext(): AudioContext {
	const ctx = getSharedAudioContext();
	if (ctx.state !== 'running') {
		void ctx.resume().catch(() => undefined);
	}
	warmUpAudioOutput(ctx);
	return ctx;
}

// Why: arpege monte d'une octave — un haut-parleur de telephone chute de 20 a
// 30 dB sous ~700 Hz, et l'ancien G4/C5 (392/523 Hz) n'y sortait pas du tout :
// la premiere note reellement entendue etait la troisieme, a +180 ms
export const WELCOME_CHIME_NOTES: readonly {
	readonly freq: number;
	readonly start: number;
	readonly dur: number;
}[] = [
	{ freq: 784, start: 0, dur: 0.09 },
	{ freq: 1046, start: 0.08, dur: 0.09 },
	{ freq: 1318, start: 0.18, dur: 0.1 },
	{ freq: 1568, start: 0.28, dur: 0.36 },
];

function scheduleWelcomeChime(
	ctx: AudioContext,
	t0: number,
	volume: number,
): void {
	for (const { freq, start, dur } of WELCOME_CHIME_NOTES) {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.type = 'triangle';
		osc.frequency.value = freq;
		const peak = WELCOME_CHIME_BASE_GAIN * volume;
		gain.gain.setValueAtTime(peak, t0 + start);
		gain.gain.exponentialRampToValueAtTime(
			peak * DECAY_FLOOR_RATIO,
			t0 + start + dur,
		);
		osc.start(t0 + start);
		osc.stop(t0 + start + dur + 0.03);
	}
}

type WindowWithEarlyChime = Window & { __retroEarlyChime?: boolean };

// Why: le script inline a pu jouer l'arpege des le tap, avant l'hydratation —
// le rejouer ici le ferait sonner deux fois
export function hasEarlyChimePlayed(): boolean {
	if (typeof window === 'undefined') return false;
	return (window as WindowWithEarlyChime).__retroEarlyChime === true;
}

export function playWelcomeChime(
	ctx: AudioContext,
	time: number = ctx.currentTime,
): void {
	const volume = getUiVolume();
	if (volume <= 0) return;
	try {
		// Why: currentTime bondit quand le contexte sort de veille — sans ce
		// plancher, les notes se programment dans le passé et la rampe est tronquée
		scheduleWelcomeChime(ctx, Math.max(time, ctx.currentTime) + SCHEDULE_LEAD_SECONDS, volume);
	} catch {
		// ignore
	}
}

export function playNavClickBlip(
	ctx: AudioContext,
	time: number = ctx.currentTime,
): void {
	const volume = getUiVolume();
	if (volume <= 0) return;
	try {
		const startAt = Math.max(time, ctx.currentTime) + SCHEDULE_LEAD_SECONDS;
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.type = 'square';
		// Why: meme raison que l'arpege — sous ~700 Hz le blip n'existe pas sur
		// un haut-parleur de telephone
		osc.frequency.setValueAtTime(1200, startAt);
		osc.frequency.exponentialRampToValueAtTime(820, startAt + 0.03);
		const peak = NAV_CLICK_BASE_GAIN * volume;
		gain.gain.setValueAtTime(peak, startAt);
		gain.gain.exponentialRampToValueAtTime(
			peak * DECAY_FLOOR_RATIO,
			startAt + 0.035,
		);
		osc.start(startAt);
		osc.stop(startAt + 0.04);
	} catch {
		// ignore
	}
}
