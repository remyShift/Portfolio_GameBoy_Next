"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function LocaleError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("error");

	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 text-center">
			<h1 className="font-pressStart2P text-base sm:text-lg md:text-2xl">{t("title")}</h1>
			<p className="font-gillSans text-sm md:text-base">{t("description")}</p>
			<button
				type="button"
				onClick={reset}
				className="bg-wine hover:bg-wine/80 text-cream font-pressStart2P text-xs md:text-sm rounded px-4 py-2"
			>
				{t("retry")}
			</button>
		</div>
	);
}
