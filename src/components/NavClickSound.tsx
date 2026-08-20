"use client";

import { useEffect } from "react";
import {
	BOOT_OVERLAY_SELECTOR,
	isTargetNavigableForClickSound,
	playNavClickBlip,
	unlockAudioContext,
} from "@/lib/retroAudio";

export default function NavClickSound() {
	useEffect(() => {
		if (typeof window === "undefined") return;

		const onPointerDown = (e: PointerEvent) => {
			if (e.button !== 0) return;
			const t = e.target;
			if (t instanceof Element && t.closest(BOOT_OVERLAY_SELECTOR)) return;
			if (!isTargetNavigableForClickSound(t)) return;
			playNavClickBlip(unlockAudioContext());
		};

		document.addEventListener("pointerdown", onPointerDown, true);
		return () => document.removeEventListener("pointerdown", onPointerDown, true);
	}, []);

	return null;
}
