import { getUiVolume } from './audioSettings';

// Why: gains calibrés pour rester audibles au-dessus du lit musical
// (pistes -18 LUFS × MUSIC_MAX_GAIN, cf. musicPlayer.ts) — ajuster ensemble
const WELCOME_CHIME_BASE_GAIN = 0.06;
const NAV_CLICK_BASE_GAIN = 0.018;

// Why: marge minimale pour ne pas programmer un événement dans le quantum de
// rendu déjà en cours (128 frames), sinon le premier son claque
const SCHEDULE_LEAD_SECONDS = 0.02;

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

const WELCOME_CHIME_NOTES: readonly {
	readonly freq: number;
	readonly start: number;
	readonly dur: number;
}[] = [
	{ freq: 392, start: 0, dur: 0.1 },
	{ freq: 523, start: 0.12, dur: 0.1 },
	{ freq: 659, start: 0.28, dur: 0.12 },
	{ freq: 784, start: 0.44, dur: 0.4 },
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
		gain.gain.setValueAtTime(WELCOME_CHIME_BASE_GAIN * volume, t0 + start);
		gain.gain.exponentialRampToValueAtTime(0.0006 * volume, t0 + start + dur);
		osc.start(t0 + start);
		osc.stop(t0 + start + dur + 0.03);
	}
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
		osc.frequency.setValueAtTime(720, startAt);
		osc.frequency.exponentialRampToValueAtTime(500, startAt + 0.03);
		gain.gain.setValueAtTime(NAV_CLICK_BASE_GAIN * volume, startAt);
		gain.gain.exponentialRampToValueAtTime(0.0008 * volume, startAt + 0.035);
		osc.start(startAt);
		osc.stop(startAt + 0.04);
	} catch {
		// ignore
	}
}
