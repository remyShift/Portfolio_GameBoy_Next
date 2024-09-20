"use client";

import { usePathname } from "next/navigation";
import ScrollCTA from "./ScrollCTA";
import AvaibleInfo from "./AvaibleInfo";

export default function BottomScreen() {
	const pathname = usePathname();

	if (pathname === '/about' || pathname.includes('/projects')) {
		return (
			<ScrollCTA />
		)
	}

	return (
		<AvaibleInfo />
	);
}