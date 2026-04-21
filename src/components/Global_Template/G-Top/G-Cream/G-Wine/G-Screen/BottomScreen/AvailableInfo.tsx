"use client"

import { useIsValidPath } from "@/hooks/useIsValidPath";

export default function AvailableInfo() {
	const isAvailable = useIsValidPath();

	return (
		<div className="flex justify-center mb-1">
			<h1 className={`text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl ${isAvailable ? "" : "line-through"}`}>► DISPONIBLE</h1>
		</div>
	);
}
