import WelcomePage from "@/components/PageParts/Top/Welcome";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		description: t("home.description"),
		alternates: { canonical: "/" },
	};
}

export default async function Home({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <WelcomePage />;
}
