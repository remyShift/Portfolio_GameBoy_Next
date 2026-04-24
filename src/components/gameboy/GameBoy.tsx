"use client";

import Top from "./top/Top";
import Pivot from "./pivot/Pivot";
import Bottom from "./bottom/Bottom";
import { usePathname } from "@/i18n/navigation";
import { isScrollableSection } from "@/lib/navigation";

function getOverflowClass(pathname: string): string {
	return isScrollableSection(pathname)
		? "overflow-y-visible"
		: "overflow-y-hidden md:overflow-y-visible";
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
