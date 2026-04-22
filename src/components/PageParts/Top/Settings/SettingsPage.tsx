import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "@/components/gameboy/screen/LocaleSwitcher";

export default async function SettingsPage() {
	const t = await getTranslations("settings");

	return (
		<div className="flex flex-col justify-center items-start w-full h-full px-6 gap-8">
			<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg text-stroke">
				{t("title")}
			</h1>

			<div className="flex flex-col gap-3">
				<p className="font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm text-greyTextInfo">
					{t("language")}
				</p>
				<LocaleSwitcher />
			</div>
		</div>
	);
}
