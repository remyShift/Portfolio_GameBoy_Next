import FunStats from "@/components/PageParts/Top/Projects/FunStats";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
	title: "Projets > Fun Stats",
	description: "Portfolio page Fun Stats",
};

export default async function FunStatsPage({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <FunStats />;
}
