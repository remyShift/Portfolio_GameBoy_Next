"use client";

import { useTranslations } from "next-intl";

export default function Footer() {
	const t = useTranslations("footer");

	return (
		<footer className="w-full mb-1 md:mb-0 flex flex-col items-center justify-end text-[0.5rem] sm:text-[0.55rem] md:text-[0.6rem] lg:text-[0.65rem]">
			<p>{t("copyright")}</p>
			<p>{t("made")}</p>
		</footer>
	);
}
