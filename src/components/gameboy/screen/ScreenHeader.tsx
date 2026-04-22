"use client";

import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { buildBreadcrumb } from "@/lib/navigation";
import BatteryStatus from "./BatteryStatus";
import LocaleSwitcher from "./LocaleSwitcher";

export default function ScreenHeader() {
	const pathname = usePathname();
	const t = useTranslations("breadcrumb");
	const breadcrumbLinks = buildBreadcrumb(pathname, t("home"));

	return (
		<header className="flex justify-between mt-1 sm:mt-2 relative z-1">
			<div className="flex pl-2">
				{breadcrumbLinks.map((link, index) => (
					<div key={index} className="flex items-center gap-0.5 md:gap-2">
						{link}
						{(index < breadcrumbLinks.length - 1) && (
							<span className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] mr-1 sm:text-xs md:text-base lg:text-xl"> &gt; </span>
						)}
					</div>
				))}
			</div>
			<div className="flex items-center gap-2 pr-1">
				<LocaleSwitcher />
				<BatteryStatus />
			</div>
		</header>
	);
}
