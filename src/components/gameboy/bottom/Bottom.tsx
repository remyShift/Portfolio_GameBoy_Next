"use client";

import Buttons from "./Buttons";
import Footer from "./Footer";
import { usePathname } from "next/navigation";
import ProjectsBot from "../../PageParts/Bottom/Projects/ProjectsBot";
import AboutTimeline from "../../PageParts/Bottom/About/AboutTimeline";

const BOTTOM_BY_SECTION: Record<string, React.ComponentType> = {
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
		<div className={`bg-cream w-full ${height} relative top-1 z-10 flex flex-col overflow-x-hidden`}>
			<div className="w-full flex-1 min-h-0 flex items-end">
				{SectionBottom ? <SectionBottom /> : <Buttons />}
			</div>
			<Footer />
		</div>
	);
}
