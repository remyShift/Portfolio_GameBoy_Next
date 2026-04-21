"use client";

import Top from "./top/Top";
import Pivot from "./pivot/Pivot";
import Bottom from "./bottom/Bottom";
import { usePathname } from "next/navigation";

export default function GameBoy({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	const overflowY = (pathname.includes("/projects") || pathname.includes("/about")) ? "overflow-y-visible" : "overflow-y-hidden md:overflow-y-visible";

	return (
		<div className={`w-full h-full ${overflowY}`}>
			<Top>
				{children}
			</Top>
			<Pivot />
			<Bottom />
		</div>
	);
}
