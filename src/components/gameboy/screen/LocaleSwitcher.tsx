"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
	const locale = useLocale();
	const pathname = usePathname();
	const router = useRouter();

	const switchTo = (next: string) => {
		router.replace(pathname, { locale: next });
	};

	return (
		<div className="flex items-center gap-1 font-pressStart2P text-[0.35rem] sm:text-[0.45rem] md:text-[0.5rem]">
			<button
				onClick={() => switchTo("fr")}
				aria-label="Français"
				className={`transition-colors ${locale === "fr" ? "text-wine" : "text-greyTextInfo hover:text-wine"}`}
			>
				FR
			</button>
			<span className="text-greyTextInfo/60">|</span>
			<button
				onClick={() => switchTo("en")}
				aria-label="English"
				className={`transition-colors ${locale === "en" ? "text-wine" : "text-greyTextInfo hover:text-wine"}`}
			>
				EN
			</button>
		</div>
	);
}
