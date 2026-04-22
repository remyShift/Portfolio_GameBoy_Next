import ProjectsPage from "@/components/PageParts/Top/Projects/ProjectsPage";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "metadata" });

	return {
		title: t("projects.title"),
		description: t("projects.description"),
		alternates: { canonical: "/projects" },
	};
}

export default async function Projects({ params }: { params: Params }) {
	const { locale } = await params;
	setRequestLocale(locale);

	return <ProjectsPage />;
}
