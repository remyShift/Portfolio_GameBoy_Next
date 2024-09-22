"use client";

import GTop from "./G-Top/G-Top";
import Pivot from "./G-Pivot/Pivot";
import GBot from "./G-Bottom/G-Bot";
import { usePathname } from "next/navigation";

export default function GlobalTemplate({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();

	const overflowY = (pathname.includes("/projects") || pathname.includes("/about")) ? "overflow-y-visible" : "overflow-y-hidden md:overflow-y-visible";

	return (
		<div className={`w-full h-full ${overflowY}`}>
			<GTop>
				{children}
			</GTop>
			<Pivot />
			<GBot />
		</div>
	);
}