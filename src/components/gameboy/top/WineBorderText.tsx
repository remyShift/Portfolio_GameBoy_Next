"use client";

import { useTranslations } from "next-intl";

export default function WineBorderText() {
	const t = useTranslations();
	const role = t("role");

	return (
		<div className="min-w-fit h-fit flex justify-center items-center z-20">
			<p className="relative font-gillSans font-bold italic text-wine z-10 text-base sm:text-xl md:text-2xl lg:text-3xl text-center">
				{role}
				<span className="absolute inset-0 z-[-1] text-stroke">
					{role}
				</span>
			</p>
		</div>
	);
}
