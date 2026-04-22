"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "crt" | "text" | "fadeout";

interface BootAnimationProps {
	onComplete: () => void;
}

export default function BootAnimation({ onComplete }: BootAnimationProps) {
	const [phase, setPhase] = useState<Phase>("crt");

	useEffect(() => {
		const t1 = setTimeout(() => setPhase("text"), 500);
		const t2 = setTimeout(() => setPhase("fadeout"), 1800);
		const t3 = setTimeout(() => onComplete(), 2200);

		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	}, [onComplete]);

	return (
		<motion.div
			className="absolute inset-0 z-50 bg-black flex items-center justify-center rounded-xl md:rounded-2xl overflow-hidden"
			animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
			transition={{ duration: 0.4 }}
		>
			{/* CRT power-on: horizontal band expanding from center */}
			{phase === "crt" && (
				<motion.div
					className="absolute bg-greyScreen/10 w-full"
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
					style={{ height: "100%", transformOrigin: "center" }}
				/>
			)}

			{/* Text phase */}
			<AnimatePresence>
				{phase === "text" && (
					<motion.div
						key="boot-text"
						className="flex flex-col items-center gap-3"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						<motion.p
							className="font-pressStart2P text-cream text-sm sm:text-base md:text-xl lg:text-2xl tracking-widest"
							initial={{ opacity: 0, y: 6 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.05, duration: 0.3 }}
						>
							remyShift
						</motion.p>

						<motion.div
							className="h-px bg-cream/40 w-0"
							animate={{ width: "100%" }}
							transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
						/>

						<motion.p
							className="font-pressStart2P text-cream/50 text-[0.35rem] sm:text-[0.45rem] tracking-widest"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.6, duration: 0.3 }}
						>
							LOADING...
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
