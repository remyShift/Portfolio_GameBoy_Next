import FunStats from "@/components/PageParts/Top/Projects/FunStats";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "funStats.metadata" });

	return {
		title: t("title"),
		description: t("description"),
		alternates: { canonical: "/projects/fun-stats" },
	};
}

export default async function FunStatsPage({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <FunStats />;
}
