"use client";

import { usePathname } from "@/i18n/navigation";
import ScrollAndImages from "./ScrollAndImages";
import AvailableInfo from "./AvailableInfo";

export default function ScreenFooter() {
	const pathname = usePathname();

	return (pathname === '/about' || pathname.includes('/projects')) ? <ScrollAndImages /> : <AvailableInfo />;
}