import Link from "next/link";
import Image from 'next/image';
import { LuChartColumnBig } from "react-icons/lu";
import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageParts/Top/PageTitle";

export default function ProjectsPage() {
	const t = useTranslations("projects");
	return (
		<div className="flex flex-col w-full h-full">
			<PageTitle className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 text-xs sm:text-base md:text-2xl lg:text-3xl">{t("title")}</PageTitle>

			<div className="flex flex-row flex-1 min-h-0 justify-between w-full">
				<nav className="flex flex-col justify-center items-center w-1/3">
					<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
						<li>
							<Link href="/projects/fun-stats" className="flex items-center gap-3 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
								<LuChartColumnBig aria-hidden="true" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
								Fun Stats
							</Link>
						</li>
					</ul>
				</nav>

				<div className="flex flex-col justify-center items-center w-1/3 gap-1">
					<Image src="/assets/gif/boyWorking.gif" alt="" aria-hidden="true" width={200} height={200} unoptimized className="w-auto h-auto mt-12 mr-6" />
				</div>
			</div>
		</div>
	);
}
