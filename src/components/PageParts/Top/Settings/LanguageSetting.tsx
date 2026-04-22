"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

const LOCALES = [
	{ code: "fr", label: "Français" },
	{ code: "en", label: "English" },
] as const;

type Locale = (typeof LOCALES)[number]["code"];

export default function LanguageSetting() {
	const locale = useLocale() as Locale;
	const pathname = usePathname();
	const router = useRouter();

	return (
		<ul className="flex flex-col gap-2 sm:gap-3" role="radiogroup" aria-label="Language">
			{LOCALES.map(({ code, label }) => {
				const isActive = locale === code;
				return (
					<li key={code}>
						<button
							onClick={() => router.replace(pathname, { locale: code })}
							aria-pressed={isActive}
							aria-label={label}
							className="flex items-center gap-2 sm:gap-3 font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm uppercase"
						>
							<span
								className={`text-wine text-xs transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`}
								aria-hidden="true"
							>
								►
							</span>
							<span className={`transition-colors ${isActive ? "text-cream" : "text-greyTextInfo hover:underline"}`}>
								{label}
							</span>
						</button>
					</li>
				);
			})}
		</ul>
	);
}
