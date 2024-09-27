import ProjectStacks from './Stacks/ProjectStacks';

export default function ProjectDescription({ name, description, stacks, isEven, classStacks }: { name: string, description: string, stacks: string[], isEven: boolean, classStacks: string }) {
	return (
		<div className={`flex flex-col w-full h-full justify-between p-4 leading-normal ${isEven ? 'md:items-end' : 'md:items-start'}`}>
			<h5 className="mb-2 text-xl font-gillSans font-bold text-white">{name}</h5>
			<p className="font-gillSans text-sm lg:text-base text-white">{description}</p>
			<ProjectStacks stacks={stacks} classStacks={classStacks} isEven={isEven} />
		</div>
	);
}