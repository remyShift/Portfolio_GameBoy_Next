import type { Metadata } from "next";
import GameBoy from "@/components/gameboy/GameBoy";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		metadataBase: new URL("https://remy-shift.dev"),
		title: {
			default: "Portfolio remyShift",
			template: "%s | Portfolio remyShift",
		},
		description: t("home.description"),
		icons: {
			icon: "/assets/icons/gameboy.ico",
		},
		openGraph: {
			title: "Portfolio remyShift",
			description: t("ogDescription"),
			url: "https://remy-shift.dev",
			siteName: "remyshift",
			images: [
				{
					url: "/assets/img/thumbnail-og.png",
					width: 1200,
					height: 630,
					alt: "portfolio thumbnail",
				},
			],
			locale: locale === "fr" ? "fr-FR" : "en-US",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: "Portfolio remyShift",
			description: t("ogDescription"),
			images: ["/assets/img/thumbnail-og.png"],
		},
		keywords: ["portfolio", "dev", "developer", "développeur", "remyshift"],
		alternates: { canonical: "/" },
	};
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Params;
}>) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations({ locale, namespace: undefined });

	return (
		<>
			<a
				href="#main"
				className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
			>
				{t("skipLink")}
			</a>
			<GameBoy>
				{children}
			</GameBoy>
		</>
	);
}
