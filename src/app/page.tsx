import WelcomePage from "@/components/PageParts/Top/Welcome";
import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "Portfolio de Rémy Cassagne, développeur fullstack JavaScript/TypeScript. Design rétro inspiré de la GameBoy. Découvrez mes projets, mon parcours et contactez-moi.",
	alternates: { canonical: "/" },
};

export default function Home() {
	return (
		<>
			<WelcomePage />
		</>
	);
}
