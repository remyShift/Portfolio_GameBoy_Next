export default function Card({ project, index }: { project: any, index: number }) {
	let classStacks: string;
	console.log(project.stacks)
	project.stacks[0] === "lua" ? classStacks = "w-[8%] md:w-[30%] max-w-[50px] lg:min-w-[40px] md:max-w-none object-contain" : classStacks = "w-[7%] max-w-[50px] lg:min-w-[40px] md:max-w-none object-contain"

	const isEven = index % 2 === 0;

	return (
		<a href={project.link} target="_blank" className="flex flex-col justify-between items-center bg-wine border-[#C6AF87] hover:bg-wine/80 border-solid border-4 rounded-xl shadow md:flex-row w-[80%] md:w-[75%] md:h-[7%]">
			{isEven && (
				<img className="object-cover w-full rounded-t-lg md:h-full md:w-[40%] md:rounded-none md:rounded-l-lg" src={project.image} alt={project.name} />
			)}
			<div className={`flex flex-col h-full justify-between p-4 leading-normal ${isEven ? 'md:items-end' : 'md:items-start'}`}>
				<h5 className="mb-2 text-xl md:text-2xl font-gillSansBold text-white">{project.name}</h5>
				<p className="font-gillSans text-sm lg:text-base text-white">{project.description}</p>
				<div className={`flex flex-wrap ${isEven ? 'md:justify-end' : 'md:justify-start'} gap-2 my-2`}>
					{project.stacks.map((stack: string) => (
						<img key={stack} className={classStacks} src={`/assets/img/stacks/${stack}.webp`} alt={stack} />
					))}
				</div>
			</div>
			{
				!isEven && (
					<img className="object-cover w-full rounded-b-lg md:h-full md:w-[40%] md:rounded-none md:rounded-r-lg" src={project.image} alt={project.name} />
				)
			}
		</a >
	);
}