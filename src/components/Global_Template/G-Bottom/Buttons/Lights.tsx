"use client"

import { usePathname } from "next/navigation";
import { useValidPaths } from "@/context/store";
import Image from "next/image";
export default function Lights() {

	const { validPaths } = useValidPaths();
	const pathname = usePathname();
	const lights: string = validPaths.includes(pathname) ? "GreenLights" : "RedLights";

	return (
		<div className="w-[5%] h-full flex justify-end overflow-x-hidden">
			<Image src={`/assets/SVG/${lights}.svg`} alt="Lights" className="relative right-[-21%] sm:right-[-30%] md:right-[-21%] w-full h-[15%]" width={100} height={100} />
		</div>
	);
}