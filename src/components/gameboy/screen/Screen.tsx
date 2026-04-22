"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ScreenHeader from "./ScreenHeader";
import ScreenFooter from "./ScreenFooter";
import BootAnimation from "./BootAnimation";
import "./Screen.css";
import { useIsValidPath } from "@/hooks/useIsValidPath";

export default function Screen({ children }: { children: React.ReactNode }) {
	const isPathValid = useIsValidPath();
	const [showBoot, setShowBoot] = useState(false);

	useEffect(() => {
		const seen = sessionStorage.getItem("boot-seen");
		if (!seen) {
			// Why: sessionStorage is browser-only — cannot be read during SSR, must be checked on mount
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setShowBoot(true);
		}
	}, []);

	const handleBootComplete = () => {
		sessionStorage.setItem("boot-seen", "1");
		setShowBoot(false);
	};

	return (
		<main id="main" className={`${isPathValid ? "bg-greyScreen" : "bg-zinc-900"} relative h-[88%] w-[94%] sm:h-[87%] md:h-[91%] lg:h-[88%] sm:w-[95%] md:w-[92%] flex flex-col rounded-xl md:rounded-2x shadow-[inset_0_0_0.5rem_0.18rem_#363636]`}>
			<span className="noise-animation"></span>
			<ScreenHeader />
			{children}
			<ScreenFooter />
			<AnimatePresence>
				{showBoot && (
					<BootAnimation key="boot" onComplete={handleBootComplete} />
				)}
			</AnimatePresence>
		</main>
	);
}
