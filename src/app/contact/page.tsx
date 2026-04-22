import ContactPage from "@/components/PageParts/Top/Contact/ContactPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description: "Contactez Rémy Cassagne pour discuter d'un projet, d'une mission freelance ou d'une opportunité. Formulaire direct, Github, LinkedIn et email.",
	alternates: { canonical: "/contact" },
};

export default function Contact() {
	return (
		<>
			<ContactPage />
		</>
	);
}