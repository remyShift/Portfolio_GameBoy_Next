"use client";

import { useIsValidPath } from "@/hooks/useIsValidPath";
import { useTranslations } from "next-intl";

export default function AvailableInfo() {
	const isAvailable = useIsValidPath();
	const t = useTranslations();

	return (
		<div className="flex justify-center mb-1">
			<p className={`text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl ${isAvailable ? "" : "line-through"}`}>
				{t("available")}
			</p>
		</div>
	);
}
