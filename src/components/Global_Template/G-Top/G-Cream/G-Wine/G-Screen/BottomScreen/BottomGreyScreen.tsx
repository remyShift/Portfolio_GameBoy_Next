"use client";

import { usePathname } from "next/navigation";
import ScrollAndImages from "./ScrollAndImages";
import AvaibleInfo from "./AvaibleInfo";

export default function BottomScreen() {
	const pathname = usePathname();

	return (pathname === '/about' || pathname.includes('/projects')) ? <ScrollAndImages /> : <AvaibleInfo />;
}