import ProjectsPage from "@/components/PageParts/Top/Projects/ProjectsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projets",
	description: "Portfolio page Projets",
};

export default function Projects() {
	return (
		<>
			<ProjectsPage />
		</>
	);
}