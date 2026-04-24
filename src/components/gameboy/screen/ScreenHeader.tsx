"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { buildBreadcrumb } from "@/lib/navigation";
import { useIsValidPath } from "@/hooks/useIsValidPath";

export default function ScreenHeader() {
	const pathname = usePathname();
	const t = useTranslations("breadcrumb");
	const tBattery = useTranslations("battery");
	const breadcrumbLinks = buildBreadcrumb(pathname, t("home"));
	const batteryStatus = useIsValidPath() ? tBattery("full") : tBattery("empty");


	return (
		<header className="flex justify-between relative z-1">
			<div className="flex">
				{breadcrumbLinks.map((link, index) => (
					<div key={index} className="flex items-center gap-0.5 md:gap-2">
						{link}
						{(index < breadcrumbLinks.length - 1) && (
							<span className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] mr-1 sm:text-xs md:text-base lg:text-xl"> &gt; </span>
						)}
					</div>
				))}
			</div>

			<p className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl">
				{batteryStatus}
			</p>
		</header>
	);
}
