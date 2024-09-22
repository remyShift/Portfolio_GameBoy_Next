"use client"

import { usePathname } from "next/navigation";

export default function Light_Btn() {

	const pathname = usePathname();

	const createClassName = (): string => {
		return pathname.includes("/projects") ? "w-[10%] max-w-[110px]" : "w-[25%] max-w-[110px]";
	}

	return (
		<div className="w-full h-1/2 flex flex-col items-center justify-start">
			<img src="/assets/SVG/LightBtn.svg" alt="Light" className={createClassName()} />
		</div>
	);
}