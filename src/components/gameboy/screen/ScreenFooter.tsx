"use client";

import { usePathname } from "@/i18n/navigation";
import ScrollAndImages from "./ScrollAndImages";
import AvailableInfo from "./AvailableInfo";
import { isScrollableSection } from "@/lib/navigation";

export default function ScreenFooter() {
	const pathname = usePathname();

	return isScrollableSection(pathname) ? <ScrollAndImages /> : <AvailableInfo />;
}