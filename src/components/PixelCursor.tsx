"use client";

import { useState, useEffect } from "react";

const CLICKABLE_SELECTOR = "a, button, input, select, textarea, label, [role='button'], [tabindex]";

function isClickable(target: EventTarget | null): boolean {
	if (!target || !(target instanceof Element)) return false;
	return !!target.closest(CLICKABLE_SELECTOR);
}

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


export default function PixelCursor() {
	const [pos, setPos] = useState({ x: -100, y: -100 });
	const [visible, setVisible] = useState(false);
	const [hasPointer, setHasPointer] = useState(false);
	const [isPointer, setIsPointer] = useState(false);

	useEffect(() => {
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

	if (!hasPointer || !visible || isPointer) return null;

	return (
		<div
			aria-hidden="true"
			className="fixed top-0 left-0 z-[9999] pointer-events-none"
			style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
		>
			<ArrowCursor />
		</div>
	);
}
