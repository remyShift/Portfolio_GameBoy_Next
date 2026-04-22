"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = ["fr", "en"] as const;
type Locale = typeof LOCALES[number];

export default function LocaleSwitcher() {
	const locale = useLocale() as Locale;
	const pathname = usePathname();
	const router = useRouter();

	const switchTo = (next: Locale) => {
		router.replace(pathname, { locale: next });
	};

	return (
		<div
			className="flex font-pressStart2P text-[0.4rem] sm:text-[0.5rem] border border-greyTextInfo/30 rounded overflow-hidden"
			role="group"
			aria-label="Language"
		>
			{LOCALES.map((lang) => (
				<button
					key={lang}
					onClick={() => switchTo(lang)}
					aria-label={lang === "fr" ? "Français" : "English"}
					aria-pressed={locale === lang}
					className={`cursor-pointer px-2 py-1.5 min-h-[28px] uppercase leading-none transition-colors ${
						locale === lang
							? "bg-wine text-cream"
							: "text-greyTextInfo hover:bg-wine/20 hover:text-wine"
					}`}
				>
					{lang}
				</button>
			))}
		</div>
	);
}
