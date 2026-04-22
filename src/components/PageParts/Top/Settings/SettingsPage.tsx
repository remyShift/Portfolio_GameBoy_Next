import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "@/components/gameboy/screen/LocaleSwitcher";
import BackgroundSign from "@/components/gameboy/screen/BackgroundSign";

export default async function SettingsPage() {
	const t = await getTranslations("settings");

	return (
		<div className="flex flex-row w-full h-full">
			<h1 className="sr-only">{t("title")}</h1>

			{/* Left column: settings options */}
			<div className="flex flex-col justify-center items-start w-1/3 h-full pl-4 gap-6 relative z-1">
				<p className="font-pressStart2P text-stroke text-[0.6rem] sm:text-sm md:text-base lg:text-lg">
					{t("title")}
				</p>

				<div className="flex flex-col gap-3">
					<p className="font-pressStart2P text-[0.4rem] sm:text-[0.5rem] md:text-xs text-greyTextInfo uppercase tracking-widest">
						{t("language")}
					</p>
					<LocaleSwitcher />
				</div>
			</div>

			{/* Center: decorative background sign */}
			<BackgroundSign />

			{/* Right column: reserved for future settings */}
			<div className="w-1/3 h-full" />
		</div>
	);
}
