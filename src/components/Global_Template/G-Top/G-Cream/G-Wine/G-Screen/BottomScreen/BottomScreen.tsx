"use client";

import { usePathname } from "next/navigation";
import ScrollCTA from "./ScrollCTA";
import AvaibleInfo from "./AvaibleInfo";

export default function BottomScreen() {
	const pathname = usePathname();

	console.log(pathname);

	if (pathname === '/about' || pathname === '/projects') {
		return (
			<ScrollCTA />
		)
	}

	return (
		<AvaibleInfo />
	);
}