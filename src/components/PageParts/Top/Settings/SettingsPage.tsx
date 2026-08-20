import { getTranslations } from "next-intl/server";
import LanguageSetting from "./LanguageSetting";
import VolumeSetting from "./VolumeSetting";

export default async function SettingsPage() {
	const t = await getTranslations("settings");

	return (
		<div className="relative flex w-full h-full items-center justify-center">
			<h1 className="absolute top-10 md:top-16 lg:top-18 xl:top-18 font-pressStart2P text-pretty text-center w-[85%] text-xs sm:text-base md:text-2xl lg:text-3xl z-10">
				{t("tagline")}
			</h1>

			<div className="grid grid-cols-[auto_auto] items-start gap-x-8 sm:gap-x-16 md:gap-x-72 gap-y-5 sm:gap-y-7 z-10">
				<span className="font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest pt-1">
					{t("language")}
				</span>
				<LanguageSetting />

				<span className="font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest pt-1">
					{t("music")}
				</span>
				<VolumeSetting kind="music" />

				<span className="font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm uppercase tracking-widest pt-1">
					{t("soundEffects")}
				</span>
				<VolumeSetting kind="ui" />
			</div>
		</div>
	);
}
