"use client";

import { useState, useEffect } from "react";

const CLICKABLE_SELECTOR = "a, button, input, select, textarea, label, [role='button'], [tabindex]";

function isClickable(target: EventTarget | null): boolean {
	if (!target || !(target instanceof Element)) return false;
	return !!target.closest(CLICKABLE_SELECTOR);
}

// Arrow cursor — hot spot at top-left (0, 0), no offset needed
function ArrowCursor() {
	return (
		<svg
			width="18"
			height="28"
			viewBox="0 0 9 14"
			xmlns="http://www.w3.org/2000/svg"
			style={{ imageRendering: "pixelated" }}
		>
			<polygon points="0,0 0,12.5 3.5,9 5.5,14 7.5,13 5.5,8.5 9,8.5" fill="#111111" />
			<polygon points="1,1.5 1,11 3.5,8 5.5,13 6.5,12.5 4.5,8 8,8" fill="#F8E9D9" />
		</svg>
	);
}

// Hand / pointer cursor — hot spot at fingertip center (x=5, y=0) in viewBox (0 0 8 14)
// Rendered width=16 → scale=2 → offset x = -(5 * 2) = -10
function HandCursor() {
	return (
		<svg
			width="16"
			height="28"
			viewBox="0 0 8 14"
			xmlns="http://www.w3.org/2000/svg"
			style={{ imageRendering: "pixelated" }}
		>
			{/* Index finger */}
			<rect x="4" y="0" width="2" height="8" fill="#111111" />
			<rect x="4.5" y="0.5" width="1" height="7" fill="#F8E9D9" />

			{/* Palm */}
			<rect x="0" y="7" width="8" height="4" fill="#111111" />
			<rect x="0.5" y="7.5" width="7" height="3" fill="#F8E9D9" />

			{/* Lower palm */}
			<rect x="1" y="11" width="6" height="2" fill="#111111" />
			<rect x="1.5" y="11.5" width="5" height="1" fill="#F8E9D9" />

			{/* Wrist */}
			<rect x="2" y="13" width="4" height="1" fill="#111111" />
		</svg>
	);
}

export default function PixelCursor() {
	const [pos, setPos] = useState({ x: -100, y: -100 });
	const [visible, setVisible] = useState(false);
	const [hasPointer, setHasPointer] = useState(false);
	const [isPointer, setIsPointer] = useState(false);

	useEffect(() => {
		// Why: window.matchMedia is browser-only — cannot be read during SSR, must be checked on mount
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setHasPointer(window.matchMedia("(pointer: fine)").matches);
	}, []);

	useEffect(() => {
		if (!hasPointer) return;

		const onMove = (e: MouseEvent) => {
			setPos({ x: e.clientX, y: e.clientY });
			setVisible(true);
			setIsPointer(isClickable(e.target));
		};
		const onLeave = () => setVisible(false);
		const onEnter = () => setVisible(true);

		window.addEventListener("mousemove", onMove);
		document.addEventListener("mouseleave", onLeave);
		document.addEventListener("mouseenter", onEnter);

		return () => {
			window.removeEventListener("mousemove", onMove);
			document.removeEventListener("mouseleave", onLeave);
			document.removeEventListener("mouseenter", onEnter);
		};
	}, [hasPointer]);

	if (!hasPointer || !visible) return null;

	// Why: the hand hot spot is at the fingertip (x=5 in viewBox, rendered at 10px) — offset corrects alignment
	const offsetX = isPointer ? -10 : 0;

	return (
		<div
			aria-hidden="true"
			className="fixed top-0 left-0 z-[9999] pointer-events-none"
			style={{ transform: `translate(${pos.x + offsetX}px, ${pos.y}px)` }}
		>
			{isPointer ? <HandCursor /> : <ArrowCursor />}
		</div>
	);
}
