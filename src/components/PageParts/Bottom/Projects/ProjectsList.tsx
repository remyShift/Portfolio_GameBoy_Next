import Card from "./Card";
import projectsData from "../../../../utils/projects.json";

export default function ProjectsList() {
	const projects = projectsData.projects;
	return (
		<div className="flex flex-wrap justify-center gap-4 mb-28">
			{projects.map((project, index) => (
				<Card key={index} project={project} index={index} />
			))}
		</div>
	);
}