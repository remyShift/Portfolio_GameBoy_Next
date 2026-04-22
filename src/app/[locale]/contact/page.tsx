import ContactPage from "@/components/PageParts/Top/Contact/ContactPage";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: t("contact.title"),
		description: t("contact.description"),
		alternates: { canonical: "/contact" },
	};
}

export default async function Contact({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <ContactPage />;
}
