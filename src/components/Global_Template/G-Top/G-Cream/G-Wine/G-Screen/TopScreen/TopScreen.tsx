"use client";

import { usePathname } from "next/navigation";
import { generateBreadcrumbLinks } from "@/utils/breadcrumbLinks";
import BatteryStatus from "./batteryStatus";

export default function TopScreen() {
	const pathname = usePathname();

	const breadcrumbLinks = generateBreadcrumbLinks(pathname);

	return (
		<header className="flex justify-between mt-1 sm:mt-2 relative z-1">
			<div className="flex pl-2">
				{breadcrumbLinks.map((link, index) => (
					<div key={index} className="flex items-center gap-0.5 md:gap-2">
						{link}
						{(index < breadcrumbLinks.length - 1) && (
							<span className="text-greyTextInfo font-gillSansBold text-[0.6rem] mr-1 sm:text-xs md:text-base lg:text-xl"> &gt; </span>
						)}
					</div>
				))}
			</div>
			<BatteryStatus />
		</header >
	);
}