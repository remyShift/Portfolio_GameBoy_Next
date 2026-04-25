"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ScreenHeader from "./ScreenHeader";
import ScreenFooter from "./ScreenFooter";
import BootAnimation from "./BootAnimation";
import "./Screen.css";
import { useIsValidPath } from "@/hooks/useIsValidPath";
import { useParallax } from "@/hooks/ParallaxProvider";
import { clampParallax } from "@/hooks/usePointerParallax";

const CONTENT_PARALLAX_PX = 10;
const SHADOW_PARALLAX_PX = 4;
const BOOT_SEEN_KEY = "boot-seen";
const BOOT_SEEN_VALUE = "1";

function shouldShowBootOnMount(): boolean {
	if (typeof window === "undefined") return true;
	return sessionStorage.getItem(BOOT_SEEN_KEY) !== BOOT_SEEN_VALUE;
}

export default function Screen({ children }: { children: React.ReactNode }) {
	const isPathValid = useIsValidPath();
	const [showBoot, setShowBoot] = useState(shouldShowBootOnMount);
	const { x, y } = useParallax();

	const px = clampParallax(x);
	const py = clampParallax(y);

	const contentStyle = {
		transform: `translate3d(${-px * CONTENT_PARALLAX_PX}px, ${-py * CONTENT_PARALLAX_PX}px, 0)`,
		willChange: "transform",
	};

	const sx = -px * SHADOW_PARALLAX_PX;
	const sy = -py * SHADOW_PARALLAX_PX;
	const screenShadow = `inset ${sx}px ${10 + sy}px 14px -4px rgba(0,0,0,0.6), inset ${-sx}px ${-3 - sy}px 4px -1px rgba(255,255,255,0.1), inset 0 0 0.6rem 0.22rem #2a2a2a`;

	const handleBootComplete = useCallback(() => {
		sessionStorage.setItem(BOOT_SEEN_KEY, BOOT_SEEN_VALUE);
		setShowBoot(false);
	}, []);

	return (
		<main id="main" style={{ boxShadow: screenShadow }} className={`${isPathValid ? "bg-greyScreen" : "bg-zinc-900"} relative h-[88%] w-[94%] sm:h-[87%] md:h-[91%] lg:h-[88%] sm:w-[95%] md:w-[92%] flex flex-col overflow-hidden rounded-xl md:rounded-2x pt-2 sm:pt-1 px-2 sm:px-2`}>
			<span className="noise-animation"></span>
			<ScreenHeader />
			<div style={contentStyle} className="flex flex-col flex-1 w-full">
				{children}
			</div>
			<ScreenFooter />
			<AnimatePresence>
				{showBoot && (
					<BootAnimation key="boot" onComplete={handleBootComplete} />
				)}
			</AnimatePresence>
		</main>
	);
}
