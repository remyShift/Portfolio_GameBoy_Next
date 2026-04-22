import SettingsPage from "@/components/PageParts/Top/Settings/SettingsPage";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: t("settings.title"),
		description: t("settings.description"),
		alternates: { canonical: "/settings" },
	};
}

export default async function Settings({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <SettingsPage />;
}
