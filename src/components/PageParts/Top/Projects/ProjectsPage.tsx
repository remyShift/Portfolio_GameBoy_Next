import Link from "next/link";
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function ProjectsPage() {
	const projectsTitle = "Découvrez mes projets: des idées qui prennent vie !";
	return (
		<div className="flex flex-row w-full h-full">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="/projects/fun-stats" className="flex items-center gap-3 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/StatGraph.png" alt="Fun Stats icon" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Fun Stats
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center absolute w-[90%] top-10 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-base md:text-2xl lg:text-3xl">{projectsTitle}</h1>
				<BackgroundSign />
			</div>

			<div className="flex flex-col justify-center items-center w-1/3 h-full gap-1">
				<img src="/assets/gif/boyWorking.gif" alt="Boy working gif" className="w-auto h-auto mt-12 mr-6" />
			</div>
		</div>
	);
}