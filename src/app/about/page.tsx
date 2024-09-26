import AboutPage from "@/components/PageParts/Top/About/AboutPage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "À propos",
	description: "Portfolio page À propos",
};

export default function About() {
	return (
		<>
			<AboutPage />
		</>
	);
}