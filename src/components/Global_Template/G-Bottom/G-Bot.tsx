"use client";

import Buttons from "./Buttons/Buttons";
import { usePathname } from "next/navigation";
import ProjectsList from "../../PageParts/Bottom/Projects/ProjectsList";

export default function GBot() {
	const pathname = usePathname();

	const height = pathname.includes("/projects") || pathname.includes("/about") ? "h-full" : "h-[41%] md:h-[95%]";

	return (
		<div className={`bg-cream w-full ${height} relative top-1 z-[-1] flex items-end`}>
			{pathname.includes("/projects") ? <ProjectsList /> : <Buttons />}
		</div>
	);
}