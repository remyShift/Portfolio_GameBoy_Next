import FunStats from "@/components/PageParts/Top/Projects/FunStats";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Projets > Fun Stats",
	description: "Portfolio page Fun Stats",
};

export default function FunStatsPage() {
	return (
		<FunStats />
	);
}