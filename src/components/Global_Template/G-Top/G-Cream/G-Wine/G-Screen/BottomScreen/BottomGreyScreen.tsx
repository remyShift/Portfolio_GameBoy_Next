"use client";

import { usePathname } from "next/navigation";
import ScrollAndImages from "./ScrollAndImages";
import AvailableInfo from "./AvailableInfo";

export default function BottomScreen() {
	const pathname = usePathname();

	return (pathname === '/about' || pathname.includes('/projects')) ? <ScrollAndImages /> : <AvailableInfo />;
}