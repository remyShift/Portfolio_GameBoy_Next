'use client';

import { useEffect, useState } from 'react';

export type ParallaxOffset = { x: number; y: number };

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

export function usePointerParallax(): ParallaxOffset {
	const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

	useEffect(() => {
		const reduceMotion = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
		if (reduceMotion) return;

		const hasHover = window.matchMedia('(hover: hover)').matches;
		if (!hasHover) return;

		return attachMouseParallax(setOffset);
	}, []);

	return offset;
}
