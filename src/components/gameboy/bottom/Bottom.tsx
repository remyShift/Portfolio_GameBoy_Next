"use client";

import Buttons from "./Buttons";
import { usePathname } from "next/navigation";
import ProjectsBot from "../../PageParts/Bottom/Projects/ProjectsBot";
import AboutTimeline from "../../PageParts/Bottom/About/AboutTimeline";

const BOTTOM_BY_SECTION: Record<string, () => JSX.Element> = {
	"/projects": ProjectsBot,
	"/about": AboutTimeline,
};

function getSectionKey(pathname: string): string | null {
	return Object.keys(BOTTOM_BY_SECTION).find((key) => pathname.includes(key)) ?? null;
}

export default function Bottom() {
	const pathname = usePathname();
	const sectionKey = getSectionKey(pathname);
	const SectionBottom = sectionKey ? BOTTOM_BY_SECTION[sectionKey] : null;
	const height = sectionKey ? "h-auto" : "h-[41%] md:h-[95%]";

	return (
		<div className={`bg-cream w-full ${height} relative top-1 z-10 flex items-end overflow-x-hidden`}>
			{SectionBottom ? <SectionBottom /> : <Buttons />}
		</div>
	);
}
