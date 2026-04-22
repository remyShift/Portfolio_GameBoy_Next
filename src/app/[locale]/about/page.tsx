import AboutPage from "@/components/PageParts/Top/About/AboutPage";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: t("about.title"),
		description: t("about.description"),
		alternates: { canonical: "/about" },
	};
}

export default async function About({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <AboutPage />;
}
