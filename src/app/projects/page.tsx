import ProjectsPage from "@/components/PageParts/Top/Projects/ProjectsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projets",
	description: "Sélection de projets web réalisés par Rémy Cassagne : Kicksfolio, DrumNLearn, et plus. Stack React, Next.js, Node.js, TypeScript.",
	alternates: { canonical: "/projects" },
};

export default function Projects() {
	return (
		<>
			<ProjectsPage />
		</>
	);
}