"use client";

import Top from "./top/Top";
import Pivot from "./pivot/Pivot";
import Bottom from "./bottom/Bottom";
import { usePathname } from "next/navigation";

const SCROLLABLE_SECTIONS = ["/projects", "/about"] as const;

function getOverflowClass(pathname: string): string {
	const isScrollable = SCROLLABLE_SECTIONS.some((section) => pathname.includes(section));
	return isScrollable ? "overflow-y-visible" : "overflow-y-hidden md:overflow-y-visible";
}

export default function GameBoy({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	return (
		<div className={`w-full h-full ${getOverflowClass(pathname)}`}>
			<Top>
				{children}
			</Top>
			<Pivot />
			<Bottom />
		</div>
	);
}
