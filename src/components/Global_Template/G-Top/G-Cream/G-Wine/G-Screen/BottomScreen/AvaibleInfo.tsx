"use client"

import { useValidPaths } from "@/context/store";
import { usePathname } from "next/navigation";
export default function AvaibleInfo() {

	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const generateAvaibleInfo = () => {
		if (validPaths.includes(pathname)) {
			return (
				<h1 className="text-greyTextInfo font-gillSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl">► DISPONIBLE</h1>
			)
		} else {
			return (
				<h1 className="text-greyTextInfo font-gillSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl line-through">► DISPONIBLE</h1>
			)
		}
	}
	return (
		<div className="flex justify-center mb-1">
			{generateAvaibleInfo()}
		</div>
	);
}