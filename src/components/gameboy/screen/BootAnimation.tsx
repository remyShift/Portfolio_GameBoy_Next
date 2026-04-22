"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Phase = "crt" | "content" | "fadeout";

interface BootAnimationProps {
	onComplete: () => void;
}

const LOGO = "remyShift";

function playBootChime() {
	try {
		const ctx = new AudioContext();
		const notes = [
			{ freq: 294, start: 0, dur: 0.12 },
			{ freq: 392, start: 0.16, dur: 0.15 },
			{ freq: 523, start: 0.35, dur: 0.7 },
		];
		notes.forEach(({ freq, start, dur }) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.type = "square";
			osc.frequency.value = freq;
			gain.gain.setValueAtTime(0.04, ctx.currentTime + start);
			gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
			osc.start(ctx.currentTime + start);
			osc.stop(ctx.currentTime + start + dur + 0.05);
		});
	} catch {
		// AudioContext blocked or unavailable — silently ignored
	}
}

export default function BootAnimation({ onComplete }: BootAnimationProps) {
	const [phase, setPhase] = useState<Phase>("crt");

	useEffect(() => {
		playBootChime();
		const t1 = setTimeout(() => setPhase("content"), 600);
		const t2 = setTimeout(() => setPhase("fadeout"), 3700);
		const t3 = setTimeout(() => onComplete(), 4100);
		return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
	}, [onComplete]);

	return (
		<motion.div
			className="absolute inset-0 z-50 flex items-center justify-center rounded-xl md:rounded-2xl overflow-hidden bg-zinc-950"
			animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
			transition={{ duration: 0.4 }}
		>
			{/* Scanlines */}
			<div
				aria-hidden="true"
				className="absolute inset-0 pointer-events-none z-10 opacity-20"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.8) 3px, rgba(0,0,0,0.8) 4px)",
				}}
			/>

			{/* CRT power-on: horizontal band expands from center */}
			{phase === "crt" && (
				<motion.div
					className="absolute inset-0 bg-zinc-900"
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					style={{ transformOrigin: "center" }}
				/>
			)}

			{/* Content */}
			<AnimatePresence>
				{(phase === "content" || phase === "fadeout") && (
					<motion.div
						key="content"
						className="relative z-20 flex flex-col items-center gap-3 sm:gap-4 px-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
						{/* Logo — letter by letter */}
						<div className="flex">
							{LOGO.split("").map((char, i) => (
								<motion.span
									key={i}
									className="font-pressStart2P text-cream text-sm sm:text-base md:text-xl lg:text-2xl"
									initial={{ opacity: 0, y: 8 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: i * 0.08, duration: 0.15, ease: "easeOut" }}
								>
									{char}
								</motion.span>
							))}
						</div>

						{/* Underline draws left-to-right */}
						<motion.div
							className="h-px bg-cream/30 self-stretch"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.82, duration: 0.5, ease: "easeOut" }}
							style={{ transformOrigin: "left" }}
						/>

						{/* Subtitle */}
						<motion.p
							className="font-pressStart2P text-greyTextInfo text-[0.35rem] sm:text-[0.45rem] tracking-widest"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.2, duration: 0.4 }}
						>
							PORTFOLIO v2025
						</motion.p>

						{/* PRESS START — blinking after all else appears */}
						<motion.p
							className="font-pressStart2P text-cream/80 text-[0.4rem] sm:text-[0.5rem] tracking-widest mt-3 sm:mt-5"
							initial={{ opacity: 0 }}
							animate={{ opacity: [0, 1, 1, 0, 0, 1, 1] }}
							transition={{
								delay: 1.9,
								duration: 1.0,
								times: [0, 0.01, 0.45, 0.46, 0.75, 0.76, 1],
								repeat: Infinity,
								ease: "linear",
							}}
						>
							PRESS START
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
