const NAVIGABLE_FOR_SOUND =
	"a, button, input, select, textarea, label, [role='button'], [tabindex]";

export const BOOT_OVERLAY_SELECTOR = '[data-boot-overlay]';

type WindowWithAudio = Window & { __retroAudioContext?: AudioContext };

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

export async function ensureAudioContextRunning(
	ctx: AudioContext,
): Promise<void> {
	if (ctx.state === 'suspended') {
		try {
			await ctx.resume();
		} catch {
			// Why: autoplay policy — resume may fail without user gesture
		}
	}
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

function scheduleWelcomeChime(ctx: AudioContext, t0: number): void {
	for (const { freq, start, dur } of WELCOME_CHIME_NOTES) {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.type = 'triangle';
		osc.frequency.value = freq;
		gain.gain.setValueAtTime(0.034, t0 + start);
		gain.gain.exponentialRampToValueAtTime(0.0006, t0 + start + dur);
		osc.start(t0 + start);
		osc.stop(t0 + start + dur + 0.03);
	}
}

export function playWelcomeChime(
	ctx: AudioContext,
	time: number = ctx.currentTime,
): void {
	try {
		scheduleWelcomeChime(ctx, time + 0.02);
	} catch {
		// ignore
	}
}

export function playNavClickSoftTick(
	ctx: AudioContext,
	time: number = ctx.currentTime,
): void {
	try {
		const osc = ctx.createOscillator();
		const gain = ctx.createGain();
		osc.connect(gain);
		gain.connect(ctx.destination);
		osc.type = 'triangle';
		osc.frequency.setValueAtTime(520, time);
		osc.frequency.exponentialRampToValueAtTime(380, time + 0.022);
		gain.gain.setValueAtTime(0.0055, time);
		gain.gain.exponentialRampToValueAtTime(0.0004, time + 0.03);
		osc.start(time);
		osc.stop(time + 0.035);
	} catch {
		// ignore
	}
}
