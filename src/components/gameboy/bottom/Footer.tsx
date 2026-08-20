"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="w-full mb-1 md:mb-0 px-2 flex flex-row flex-wrap items-center justify-center gap-x-2 text-center text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem]">
			<p>{t("copyright")}</p>
			<p>{t("made")}</p>
		</footer>
	);
}
