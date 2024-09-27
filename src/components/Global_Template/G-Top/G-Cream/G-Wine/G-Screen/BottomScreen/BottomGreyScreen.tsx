"use client";

import { usePathname } from "next/navigation";
import ScrollCTA from "./BottomScreen";
import AvaibleInfo from "./AvaibleInfo";

export default function BottomScreen() {
	const pathname = usePathname();

	return (pathname === '/about' || pathname.includes('/projects')) ? <ScrollCTA /> : (pathname === '/contact') ? null : <AvaibleInfo />;
}