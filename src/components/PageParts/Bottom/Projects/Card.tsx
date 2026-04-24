"use client";

import Image from "next/image";
import ProjectDescription from "./ProjectDescription";
import { useIsInView } from "@/hooks/useIsInView";
import type { Project } from "@/types/project";

const STACK_IMAGE_BASE_CLASS = "max-w-[50px] md:min-w-[30px] lg:min-w-[40px] md:max-w-none object-contain";

const STACK_IMAGE_WIDTH_CLASS: Record<string, string> = {
	lua: "w-[8%] md:w-[30%]",
};

const DEFAULT_STACK_IMAGE_WIDTH_CLASS = "w-[7%]";

export function stacksClass(stacks: string[]): string {
	const widthClass = STACK_IMAGE_WIDTH_CLASS[stacks[0]] ?? DEFAULT_STACK_IMAGE_WIDTH_CLASS;
	return `${widthClass} ${STACK_IMAGE_BASE_CLASS}`;
}

function visibilityClass(isInView: boolean, isEven: boolean): string {
	if (isInView) return "opacity-100 translate-x-0";
	return isEven ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full";
}

export default function Card({ project, index }: { project: Project; index: number }) {
	const { ref, isInView } = useIsInView<HTMLAnchorElement>();
	const isEven = index % 2 === 0;

	return (
		<a
			href={project.link}
			ref={ref}
			target="_blank"
			rel="noopener noreferrer"
			className={`flex flex-col justify-between items-center hover:cursor-pointer hover:scale-105 bg-wine border-[#C6AF87] hover:bg-wine/80 border-solid border-4 rounded-xl drop-shadow-lg md:flex-row w-[80%] md:w-[75%] md:h-auto lg:h-[7%] transform transition-transform duration-500 ${visibilityClass(isInView, isEven)}`}
		>
			{isEven && (
				<Image className="object-cover w-full rounded-t-lg md:h-full md:w-[40%] md:rounded-none md:rounded-l-lg" src={project.image} alt={project.name} width={500} height={500} />
			)}

			<ProjectDescription {...project} classStacks={stacksClass(project.stacks)} isEven={isEven} />

			{!isEven && (
				<Image className="object-cover rounded-b-lg md:h-full md:w-[40%] md:rounded-none md:rounded-r-lg" src={project.image} alt={project.name} width={500} height={500} />
			)}
		</a>
	);
}
