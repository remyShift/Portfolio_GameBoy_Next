import { getTranslations } from "next-intl/server";
import PageTitle from "@/components/PageParts/Top/PageTitle";
import LanguageSetting from "./LanguageSetting";
import VolumeSetting from "./VolumeSetting";

export default async function SettingsPage() {
	const t = await getTranslations("settings");

	return (
		<div className="flex flex-col w-full h-full">
			<PageTitle className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 text-xs sm:text-base md:text-2xl lg:text-3xl">{t("tagline")}</PageTitle>

			<div className="flex flex-1 min-h-0 items-center justify-center w-full">
				<div className="grid grid-cols-[auto_auto] items-center gap-x-4 sm:gap-x-16 md:gap-x-72 gap-y-4 sm:gap-y-7 z-10">
					<span className="font-pressStart2P leading-pixel text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest">
						{t("language")}
					</span>
					<LanguageSetting />

					<span className="font-pressStart2P leading-pixel text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest">
						{t("music")}
					</span>
					<VolumeSetting kind="music" />

					<span className="font-pressStart2P leading-pixel text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest">
						{t("soundEffects")}
					</span>
					<VolumeSetting kind="ui" />
				</div>
			</div>
		</div>
	);
}
