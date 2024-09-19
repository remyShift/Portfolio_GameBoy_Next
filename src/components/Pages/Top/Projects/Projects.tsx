import Link from "next/link";
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function ProjectsPage() {
	return (
		<div className="flex flex-row w-full h-full">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="/projects/summary" className="flex items-center gap-3 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/Summary.png" alt="Summary icon" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Sommaire
						</Link>
					</li>
					<li>
						<Link href="/projects/fun-stats" className="flex items-center gap-3 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/StatGraph.png" alt="Fun Stats icon" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Fun Stats
						</Link>
					</li>
				</ul>
			</nav>

			<BackgroundSign />

			<div className="flex flex-col justify-center items-center w-1/3 h-full gap-1">
				<img src="/assets/gif/boyWorking.gif" alt="Boy working gif" className="w-auto h-auto mt-12 mr-6" />
			</div>
		</div>
	);
}