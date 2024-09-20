"use client"

import { usePathname } from "next/navigation";
import { useValidPaths } from "@/context/store";

export default function Lights() {

	const { validPaths } = useValidPaths();
	const pathname = usePathname();
	let lights: string = "";

	validPaths.includes(pathname) ? lights = "GreenLights" : lights = "RedLights";

	return (
		<div className="w-[5%] h-full flex justify-end overflow-x-hidden">
			<img src={`/assets/SVG/${lights}.svg`} alt="Lights" className="relative right-[-20%] w-full h-[20%]" />
		</div>
	);
}