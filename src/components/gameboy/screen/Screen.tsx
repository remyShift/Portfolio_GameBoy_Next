"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ScreenHeader from "./ScreenHeader";
import ScreenFooter from "./ScreenFooter";
import BootAnimation from "./BootAnimation";
import "./Screen.css";
import { useIsValidPath } from "@/hooks/useIsValidPath";
import { usePointerParallax } from "@/hooks/usePointerParallax";

const CONTENT_PARALLAX_PX = 10;
const SENSITIVITY = 1.5;
const BOOT_SEEN_KEY = "boot-seen";
const BOOT_SEEN_VALUE = "1";

const boost = (v: number) => Math.max(-1, Math.min(1, v * SENSITIVITY));

function shouldShowBootOnMount(): boolean {
	if (typeof window === "undefined") return true;
	return sessionStorage.getItem(BOOT_SEEN_KEY) !== BOOT_SEEN_VALUE;
}

export default function Screen({ children }: { children: React.ReactNode }) {
	const isPathValid = useIsValidPath();
	const [showBoot, setShowBoot] = useState(shouldShowBootOnMount);
	const { x, y } = usePointerParallax();

	const contentStyle = {
		transform: `translate3d(${-boost(x) * CONTENT_PARALLAX_PX}px, ${-boost(y) * CONTENT_PARALLAX_PX}px, 0)`,
		willChange: "transform",
	};

	const handleBootComplete = useCallback(() => {
		sessionStorage.setItem(BOOT_SEEN_KEY, BOOT_SEEN_VALUE);
		setShowBoot(false);
	}, []);

	return (
		<main id="main" className={`${isPathValid ? "bg-greyScreen" : "bg-zinc-900"} relative h-[88%] w-[94%] sm:h-[87%] md:h-[91%] lg:h-[88%] sm:w-[95%] md:w-[92%] flex flex-col overflow-hidden rounded-xl md:rounded-2x shadow-[inset_0_10px_14px_-4px_rgba(0,0,0,0.6),inset_0_-3px_4px_-1px_rgba(255,255,255,0.1),inset_0_0_0.6rem_0.22rem_#2a2a2a] pt-2 sm:pt-1 px-2 sm:px-2`}>
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
