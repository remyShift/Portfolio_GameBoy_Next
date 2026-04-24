import Card from "./Card";
import { useLocale } from "next-intl";
import { getLocalizedProjects } from "@/lib/localizedContent";
import type { Locale } from "@/types/locale";

export default function ProjectsList() {
	const locale = useLocale() as Locale;
	const projects = getLocalizedProjects(locale);

	return (
		<div className="flex flex-wrap justify-center gap-4 mb-28">
			{projects.map((project, index) => (
				<Card key={project.id} project={project} index={index} />
			))}
		</div>
	);
}
