import Image from 'next/image';
import ProjectDescription from './ProjectDescription';

export default function Card({ project, index }: { project: any, index: number }) {
	let classStacks: string;
	console.log(project.stacks)
	project.stacks[0] === "lua" ? classStacks = "w-[8%] md:w-[30%] max-w-[50px] md:min-w-[30px] lg:min-w-[40px] md:max-w-none object-contain" : classStacks = "w-[7%] max-w-[50px] md:min-w-[30px] lg:min-w-[40px] md:max-w-none object-contain"

	const isEven = index % 2 === 0;

	return (
		<a href={project.link} target="_blank" className="flex flex-col justify-between items-center bg-wine border-[#C6AF87] hover:bg-wine/80 border-solid border-4 rounded-xl drop-shadow-lg md:flex-row w-[80%] md:w-[75%] md:h-auto lg:h-[7%]">
			{isEven && (
				<Image className="object-cover w-full rounded-t-lg md:h-full md:w-[40%] md:rounded-none md:rounded-l-lg" src={project.image} alt={project.name} width={500} height={500} />
			)}
			<ProjectDescription {...project} classStacks={classStacks} isEven={isEven} />
			{!isEven && (
				<Image className="object-cover rounded-b-lg md:h-full md:w-[40%] md:rounded-none md:rounded-r-lg" src={project.image} alt={project.name} width={500} height={500} />
			)}
		</a >
	);
}