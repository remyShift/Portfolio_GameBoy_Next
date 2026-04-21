"use client"

import Image from "next/image";
import { useIsValidPath } from "@/hooks/useIsValidPath";

export default function Lights() {
	const lights = useIsValidPath() ? "GreenLights" : "RedLights";

	return (
		<div className="w-[5%] h-full flex justify-end overflow-x-hidden">
			<Image src={`/assets/SVG/${lights}.svg`} alt="" aria-hidden="true" className="relative right-[-21%] sm:right-[-30%] md:right-[-21%] w-full h-[15%]" width={100} height={100} />
		</div>
	);
}