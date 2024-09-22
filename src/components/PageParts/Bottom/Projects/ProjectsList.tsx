import Card from "./Card";
import projectsData from "../../../../projects.json";

export default function ProjectsList() {
	const projects = projectsData.projects;
	return (
		<div className="flex flex-wrap justify-center gap-4">
			{projects.map((project, index) => (
				<Card key={index} project={project} />
			))}
		</div>
	);
}