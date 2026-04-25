"use client"

import { usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { isScrollableSection } from "@/lib/navigation";

export default function LightButton() {
	const pathname = usePathname();
	const isInnerPage = isScrollableSection(pathname);
	const className = isInnerPage ? "w-[10%] max-w-[110px] mb-4" : "w-[25%] max-w-[110px]";

	return (
		<div className="w-full h-1/8 flex flex-col items-center justify-center">
			<Image src="/assets/SVG/LightBtn.svg" alt="" aria-hidden="true" className={className} width={110} height={110} style={{ height: "auto" }} unoptimized />
		</div>
	);
}
