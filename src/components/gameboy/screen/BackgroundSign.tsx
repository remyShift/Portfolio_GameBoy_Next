"use client";

import { useParallax } from "@/hooks/ParallaxProvider";
import { clampParallax } from "@/hooks/usePointerParallax";

const SIGN_PARALLAX_PX = 4;

export default function BackgroundSign() {
	const { x, y } = useParallax();
	const px = clampParallax(x);
	const py = clampParallax(y);

	const transform = `translate3d(${-px * SIGN_PARALLAX_PX}px, ${-py * SIGN_PARALLAX_PX}px, 0)`;
	const shadowX = (px * 0.05).toFixed(3);
	const shadowY = (0.2 + py * 0.05).toFixed(3);
	const shadowBlur = Math.max(0.1, 0.4 - py * 0.03).toFixed(3);
	const textShadow = `${shadowX}rem ${shadowY}rem ${shadowBlur}rem #CFCCCC`;

	return (
		<div
			style={{ transform, willChange: "transform" }}
			className="flex-1 h-full flex items-center justify-center w-full"
		>
			<span
				aria-hidden="true"
				className="font-gillSans font-bold text-[7dvh] sm:text-8xl lg:text-[20dvh] xl:text-[25dvh] bg-clip-text text-transparent bg-black/25 w-full"
				style={{ textShadow }}
			>
				&lt;/&gt;
			</span>
		</div>
	);
}
