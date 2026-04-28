import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { getTranslations } from "next-intl/server";

export default async function AboutPage() {
	const t = await getTranslations("about");

	return (
		<div className="flex flex-col w-full h-full">
			<h1 className="font-pressStart2P text-pretty text-center shrink-0 pt-6 sm:pt-8 md:pt-10 lg:pt-12 text-xs sm:text-base md:text-2xl lg:text-3xl">{t("title")}</h1>

			<div className="flex flex-row flex-1 min-h-0 w-full">
				<div className="flex justify-center items-center w-1/3 h-full">
					<p className="font-pressStart2P text-pretty text-[0.45rem] sm:text-xs md:text-base lg:text-lg mx-4 xl:mx-8">{t("text")}</p>
				</div>

				<div className="w-1/3 h-full" aria-hidden="true" />

				<div className="flex flex-col justify-center items-center w-1/3 h-full sm:mt-6 md:mt-0">
					<p className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-base lg:text-lg">Rémy</p>
					<p className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-base lg:text-lg">{`26 ${t("age")}`}</p>
					<LuArrowRight aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 mb-1 rotate-90" />
					<Image src="/assets/img/pictureOfMe.webp" alt="Photo de Rémy" width={300} height={300} className="object-contain w-[85%] sm:w-[90%] xl:w-[75%] border-2 border-wine" />
				</div>
			</div>
		</div>
	);
}
