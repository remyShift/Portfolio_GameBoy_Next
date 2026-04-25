import Link from "next/link";
import Image from 'next/image';
import { LuChartColumnBig } from "react-icons/lu";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
	const t = useTranslations("projects");
	return (
		<div className="relative flex flex-row justify-between w-full h-full">
			<h1 className="font-pressStart2P text-pretty text-center absolute left-1/2 -translate-x-1/2 w-[90%] top-10 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-base md:text-2xl lg:text-3xl z-1">{t("title")}</h1>

			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="/projects/fun-stats" className="flex items-center gap-3 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<LuChartColumnBig aria-hidden="true" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Fun Stats
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex flex-col justify-center items-center w-1/3 h-full gap-1 relative z-1">
				<Image src="/assets/gif/boyWorking.gif" alt="" aria-hidden="true" width={200} height={200} unoptimized className="w-auto h-auto mt-12 mr-6" />
			</div>
		</div>
	);
}
