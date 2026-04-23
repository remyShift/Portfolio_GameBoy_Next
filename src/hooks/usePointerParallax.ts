'use client';

import { useEffect, useState } from 'react';

export type ParallaxOffset = { x: number; y: number };
export type OrientationOrigin = { beta: number; gamma: number } | null;

const TILT_RANGE_DEG = 15;

export function computeParallax(
	clientX: number,
	clientY: number,
	viewportW: number,
	viewportH: number,
): ParallaxOffset {
	return {
		x: (clientX / viewportW) * 2 - 1,
		y: (clientY / viewportH) * 2 - 1,
	};
}

export function computeOrientationParallax(
	beta: number,
	gamma: number,
	origin: OrientationOrigin,
	rangeDeg: number,
): ParallaxOffset {
	if (!origin) return { x: 0, y: 0 };
	const clamp = (v: number) => Math.max(-1, Math.min(1, v));
	return {
		x: clamp((gamma - origin.gamma) / rangeDeg),
		y: clamp((beta - origin.beta) / rangeDeg),
	};
}

type IOSDeviceOrientationCtor = {
	requestPermission?: () => Promise<'granted' | 'denied' | 'default'>;
};

function needsIOSPermission(): boolean {
	const ctor = (
		globalThis as unknown as {
			DeviceOrientationEvent?: IOSDeviceOrientationCtor;
		}
	).DeviceOrientationEvent;
	return typeof ctor?.requestPermission === 'function';
}

async function requestIOSPermission(): Promise<boolean> {
	const ctor = (
		globalThis as unknown as {
			DeviceOrientationEvent?: IOSDeviceOrientationCtor;
		}
	).DeviceOrientationEvent;
	try {
		const result = await ctor?.requestPermission?.();
		return result === 'granted';
	} catch {
		return false;
	}
}

function attachMouseParallax(
	setOffset: (o: ParallaxOffset) => void,
): () => void {
	let rafId = 0;
	let pendingX = 0;
	let pendingY = 0;

	const onMove = (e: MouseEvent) => {
		pendingX = e.clientX;
		pendingY = e.clientY;
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			setOffset(
				computeParallax(
					pendingX,
					pendingY,
					window.innerWidth,
					window.innerHeight,
				),
			);
			rafId = 0;
		});
	};

	window.addEventListener('mousemove', onMove, { passive: true });
	return () => {
		window.removeEventListener('mousemove', onMove);
		if (rafId) cancelAnimationFrame(rafId);
	};
}

function attachOrientationParallax(
	setOffset: (o: ParallaxOffset) => void,
): () => void {
	let rafId = 0;
	let origin: OrientationOrigin = null;
	let pendingBeta = 0;
	let pendingGamma = 0;

	const onOrient = (e: Event) => {
		const event = e as Event & {
			beta: number | null;
			gamma: number | null;
		};
		if (event.beta === null || event.gamma === null) return;
		pendingBeta = event.beta;
		pendingGamma = event.gamma;
		if (rafId) return;
		rafId = requestAnimationFrame(() => {
			if (!origin) origin = { beta: pendingBeta, gamma: pendingGamma };
			setOffset(
				computeOrientationParallax(
					pendingBeta,
					pendingGamma,
					origin,
					TILT_RANGE_DEG,
				),
			);
			rafId = 0;
		});
	};

	window.addEventListener('deviceorientation', onOrient, { passive: true });
	return () => {
		window.removeEventListener('deviceorientation', onOrient);
		if (rafId) cancelAnimationFrame(rafId);
	};
}

export function usePointerParallax(): ParallaxOffset {
	const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		if (reduceMotion) return;

		const hasHover = window.matchMedia('(hover: hover)').matches;

		if (hasHover) {
			return attachMouseParallax(setOffset);
		}

		if (!needsIOSPermission()) {
			return attachOrientationParallax(setOffset);
		}

		let cleanup: (() => void) | null = null;

		const onFirstGesture = async () => {
			window.removeEventListener('pointerdown', onFirstGesture);
			window.removeEventListener('touchstart', onFirstGesture);
			const granted = await requestIOSPermission();
			if (granted) {
				cleanup = attachOrientationParallax(setOffset);
			}
		};

		window.addEventListener('pointerdown', onFirstGesture, {
			passive: true,
		});
		window.addEventListener('touchstart', onFirstGesture, {
			passive: true,
		});

		return () => {
			window.removeEventListener('pointerdown', onFirstGesture);
			window.removeEventListener('touchstart', onFirstGesture);
			cleanup?.();
		};
	}, []);

	return offset;
}
