import Card from "./Card";
import projectsData from "@/content/projects.json";

export default function ProjectsList() {
	const projects = projectsData.projects;
	return (
		<div className="flex flex-wrap justify-center gap-4 mb-28">
			{projects.map((project, index) => (
				<Card key={project.link} project={project} index={index} />
			))}
		</div>
	);
}