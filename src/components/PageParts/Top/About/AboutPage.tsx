import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { getTranslations } from "next-intl/server";
import PageTitle from "@/components/PageParts/Top/PageTitle";

const PARAGRAPH_CLASS = "font-pressStart2P text-pretty leading-pixel text-[0.55rem] sm:text-xs md:text-base lg:text-lg";

export default async function AboutPage() {
	const t = await getTranslations("about");

	return (
		<div className="flex flex-col w-full h-full">
			<PageTitle className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 text-xs sm:text-base md:text-2xl lg:text-3xl">{t("title")}</PageTitle>

			<div className="flex flex-row flex-1 min-h-0 w-full">
				<div className="flex flex-col w-3/5 md:w-1/2 h-full ml-4 md:ml-8">
					{/* Why: my-auto centers while there is room and collapses to zero when there
					    is not, unlike justify-center which spills content above the container
					    top and puts it out of reach of the scroll. */}
					<div className="flex flex-col items-start gap-4 my-auto">
						<p className={PARAGRAPH_CLASS}>{t("text")}</p>
						<p className={PARAGRAPH_CLASS}>{t("text2")}</p>
					</div>
				</div>

				<div className="hidden md:block md:w-1/3 h-full" aria-hidden="true" />

				<div className="flex flex-col w-2/5 md:w-1/3 h-full sm:mt-6 md:mt-0">
					<div className="flex flex-col items-center gap-1 my-auto">
						<p className="font-pressStart2P text-pixel-nav">Rémy</p>
						<p className="font-pressStart2P text-center text-pixel-nav">{`26 ${t("age")}`}</p>
						<LuArrowRight aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 mb-1 rotate-90" />
						<Image src="/assets/img/pictureOfMe.webp" alt="Photo de Rémy" width={300} height={300} className="object-contain w-[85%] sm:w-[90%] xl:w-[75%] border-2 border-wine" />
					</div>
				</div>
			</div>
		</div>
	);
}
