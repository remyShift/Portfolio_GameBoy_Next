"use client";

import Buttons from "./Buttons/Buttons";
import { usePathname } from "next/navigation";
import ProjectsBot from "../../PageParts/Bottom/Projects/ProjectsBot";

export default function GBot() {
	const pathname = usePathname();

	const height = (pathname.includes("/projects") || pathname === "/about") ? "h-fit" : "h-[41%] md:h-[95%]";

	return (
		<div className={`bg-cream w-full ${height} relative top-1 z-[-1] flex items-end`}>
			{pathname.includes("/projects") ? <ProjectsBot /> : <Buttons />}
		</div>
	);
}