"use client"

import { usePathname } from "next/navigation";
import Image from "next/image";

export default function LightButton() {
	const pathname = usePathname();
	const isInnerPage = pathname.includes("/projects") || pathname.includes("/about");
	const className = isInnerPage ? "w-[10%] max-w-[110px] mb-4" : "w-[25%] max-w-[110px]";

	return (
		<div className="w-full h-1/8 flex flex-col items-center justify-center">
			<Image src="/assets/SVG/LightBtn.svg" alt="Light" className={className} width={110} height={110} />
		</div>
	);
}
