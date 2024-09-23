"use client"

import { useValidPaths } from "@/context/store";
import { usePathname } from "next/navigation";
export default function AvaibleInfo() {

	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const generateAvaibleInfo = () => {
		return validPaths.includes(pathname) ? (
			<h1 className="text-greyTextInfo font-cabinBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl">► DISPONIBLE</h1>
		) : (
			<h1 className="text-greyTextInfo font-cabinBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl line-through">► DISPONIBLE</h1>
		);
	}
	return (
		<div className="flex justify-center sm:mb-1">
			{generateAvaibleInfo()}
		</div>
	);
}