import AboutPage from "@/components/PageParts/Top/About/AboutPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "À propos",
	description: "Parcours, stack technique et expérience de Rémy Cassagne, développeur fullstack JavaScript/TypeScript (React, Next.js, Node.js). Découvrez mes compétences et mes projets.",
	alternates: { canonical: "/about" },
};

export default function About() {
	return (
		<>
			<AboutPage />
		</>
	);
}