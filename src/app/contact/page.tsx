import ContactPage from "@/components/PageParts/Top/Contact/ContactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Contact",
	description: "Portfolio page Contact",
};

export default function Contact() {
	return (
		<>
			<ContactPage />
		</>
	);
}