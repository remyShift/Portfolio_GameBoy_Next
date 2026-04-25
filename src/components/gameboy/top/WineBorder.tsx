"use client";

import Screen from "../screen/Screen";
import WineBorderText from "./WineBorderText";
import { useParallax } from "@/hooks/ParallaxProvider";
import { clampParallax } from "@/hooks/usePointerParallax";

const BORDER_SHADOW_PARALLAX_PX = 3;

export default function WineBorder({ children }: { children: React.ReactNode }) {
	const { x, y } = useParallax();
	const sx = -clampParallax(x) * BORDER_SHADOW_PARALLAX_PX;
	const sy = -clampParallax(y) * BORDER_SHADOW_PARALLAX_PX;

	const boxShadow = `inset ${sx}px ${6 + sy}px 10px -2px rgba(0,0,0,0.45), inset ${-sx}px ${-3 - sy}px 6px -1px rgba(255,255,255,0.06)`;

	return (
		<div
			style={{ boxShadow }}
			className="z-2 bg-wine w-[95%] h-[95%] sm:h-[90%] md:w-[90%] flex flex-col justify-end items-center rounded-t-2xl rounded-b-xl sm:rounded-t-3xl md:rounded-t-4xl lg:rounded-t-[3rem] md:rounded-b-2xl lg:rounded-b-3xl"
		>
			<Screen>
				{children}
			</Screen>
			<WineBorderText />
		</div>
	);
}
