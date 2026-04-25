"use client";

import { useParallax } from "@/hooks/ParallaxProvider";
import { clampParallax } from "@/hooks/usePointerParallax";

const SIGN_PARALLAX_PX = 10;
const SHADOW_ORBIT_REM = 0.5;
const SHADOW_BLUR_REM = 0.4;

export default function BackgroundSign() {
	const { x, y } = useParallax();
	const px = clampParallax(x);
	const py = clampParallax(y);

	const transform = `translate3d(${-px * SIGN_PARALLAX_PX}px, ${-py * SIGN_PARALLAX_PX}px, 0)`;
	const shadowX = (-px * SHADOW_ORBIT_REM).toFixed(3);
	const shadowY = (-py * SHADOW_ORBIT_REM).toFixed(3);
	const textShadow = `${shadowX}rem ${shadowY}rem ${SHADOW_BLUR_REM}rem #CFCCCC`;

	return (
		<div
			aria-hidden="true"
			style={{ transform, willChange: "transform" }}
			className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
		>
			<span
				className="font-gillSans font-bold bg-clip-text text-transparent bg-black/25 text-[clamp(4rem,18dvh,16rem)]"
				style={{ textShadow }}
			>
				&lt;/&gt;
			</span>
		</div>
	);
}
