"use client";

import { useState, useEffect } from "react";

export default function PixelCursor() {
	const [pos, setPos] = useState({ x: -100, y: -100 });
	const [visible, setVisible] = useState(false);
	const [hasPointer, setHasPointer] = useState(false);

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

	return (
		<div
			aria-hidden="true"
			className="fixed top-0 left-0 z-[9999] pointer-events-none"
			style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
		>
			<svg
				width="18"
				height="28"
				viewBox="0 0 9 14"
				xmlns="http://www.w3.org/2000/svg"
				style={{ imageRendering: "pixelated" }}
			>
				{/* Black outer shape */}
				<polygon
					points="0,0 0,12.5 3.5,9 5.5,14 7.5,13 5.5,8.5 9,8.5"
					fill="#111111"
				/>
				{/* Cream fill */}
				<polygon
					points="1,1.5 1,11 3.5,8 5.5,13 6.5,12.5 4.5,8 8,8"
					fill="#F8E9D9"
				/>
			</svg>
		</div>
	);
}
