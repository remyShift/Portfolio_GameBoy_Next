import { getTranslations } from "next-intl/server";
import BackgroundSign from "@/components/gameboy/screen/BackgroundSign";
import LanguageSetting from "./LanguageSetting";

export default async function SettingsPage() {
	const t = await getTranslations("settings");

	return (
		<div className="relative flex w-full h-full items-center justify-center">
			<div className="w-full flex items-center justify-center pointer-events-none bg-red-500" aria-hidden="true">
				<BackgroundSign />
			</div>

			<h1 className="absolute top-10 md:top-16 lg:top-18 xl:top-18 font-pressStart2P text-pretty text-center w-[85%] text-xs sm:text-base md:text-2xl lg:text-3xl z-10 bg-blue-500">
				{t("tagline")}
			</h1>

			<div className="flex items-start gap-8 sm:gap-16 md:gap-72 z-10">
				<ul className="flex flex-col gap-5 sm:gap-7">
					<li className="font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest pt-1">
						{t("language")}
					</li>
				</ul>

				<ul className="flex flex-col gap-5 sm:gap-7">
					<li>
						<LanguageSetting />
					</li>
				</ul>
			</div>
		</div>
	);
}
