"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { getSharedAudioContext, playWelcomeChime } from "@/lib/retroAudio";

type Phase = "crt" | "content" | "fadeout";

interface BootAnimationProps {
	onComplete: () => void;
}

const LOGO = "remyShift";
const FADE_MS = 420;

export default function BootAnimation({ onComplete }: BootAnimationProps) {
	const t = useTranslations("boot");
	const [phase, setPhase] = useState<Phase>("crt");
	const dismissingRef = useRef(false);
	const contentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	/* Audio unlock strategy for mobile Safari (WebKit):
	 * - resume() must be called synchronously inside the user-gesture handler.
	 * - The Promise returned by resume() sometimes never resolves on WebKit (known bug).
	 * - statechange fires reliably when the context actually transitions to "running".
	 * - We use both as belt-and-suspenders: whichever fires first plays the chime. */
	const runDismiss = useCallback(() => {
		if (dismissingRef.current) return;
		if (contentTimerRef.current) {
			clearTimeout(contentTimerRef.current);
			contentTimerRef.current = null;
		}
		dismissingRef.current = true;
		setPhase("fadeout");

		const ctx = getSharedAudioContext();
		if (ctx.state === "running") {
			playWelcomeChime(ctx);
		} else {
			let played = false;
			const onRunning = () => {
				if (!played && ctx.state === "running") {
					played = true;
					ctx.removeEventListener("statechange", onRunning);
					playWelcomeChime(ctx);
				}
			};
			ctx.addEventListener("statechange", onRunning);
			void ctx.resume().then(onRunning);
		}

		window.setTimeout(() => {
			onComplete();
		}, FADE_MS);
	}, [onComplete]);

	const onUserActivate = useCallback(() => {
		runDismiss();
	}, [runDismiss]);

	useEffect(() => {
		contentTimerRef.current = setTimeout(() => {
			if (!dismissingRef.current) {
				setPhase("content");
			}
		}, 600);

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.repeat) return;
			runDismiss();
		};

		window.addEventListener("keydown", onKeyDown, true);

		return () => {
			if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
			window.removeEventListener("keydown", onKeyDown, true);
		};
	}, [runDismiss]);

	return (
		<motion.div
			data-boot-overlay
			className="absolute inset-0 z-50 flex touch-manipulation select-none items-center justify-center overflow-hidden rounded-xl bg-zinc-950 md:rounded-2xl [-webkit-tap-highlight-color:transparent]"
			animate={{ opacity: phase === "fadeout" ? 0 : 1 }}
			transition={{ duration: 0.4 }}
			onPointerDown={onUserActivate}
		>
			<div
				aria-hidden="true"
				className="absolute inset-0 z-10 opacity-20 pointer-events-none"
				style={{
					backgroundImage:
						"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.8) 3px, rgba(0,0,0,0.8) 4px)",
				}}
			/>

			{phase === "crt" && (
				<motion.div
					className="pointer-events-none absolute inset-0 z-5 bg-zinc-900"
					initial={{ scaleY: 0 }}
					animate={{ scaleY: 1 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					style={{ transformOrigin: "center" }}
				/>
			)}

			<AnimatePresence>
				{(phase === "content" || phase === "fadeout") && (
					<motion.div
						key="content"
						className="pointer-events-none relative z-20 flex flex-col items-center gap-3 sm:gap-4 px-6"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.2 }}
					>
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

						<motion.div
							className="h-px w-full self-stretch bg-cream/30"
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 0.82, duration: 0.5, ease: "easeOut" }}
							style={{ transformOrigin: "left" }}
						/>

						<motion.p
							className="font-pressStart2P text-[0.35rem] tracking-widest text-greyTextInfo sm:text-[0.45rem]"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.2, duration: 0.4 }}
						>
							PORTFOLIO v2.0.26
						</motion.p>

						<motion.p
							className="mt-3 font-pressStart2P text-[0.4rem] tracking-widest text-cream/80 sm:mt-5 sm:text-xs"
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
							{t("continueHint")}
						</motion.p>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
