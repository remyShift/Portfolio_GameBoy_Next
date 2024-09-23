export default function Card({ project, index }: { project: any, index: number }) {
	let classStacks: string;
	console.log(project.stacks)
	project.stacks[0] === "lua" ? classStacks = "w-[15%] md:w-[30%] max-w-[50px] md:max-w-none object-contain" : classStacks = "w-[12%] max-w-[50px] md:max-w-none object-contain"

	const isEven = index % 2 === 0;

	return (
		<a href={project.link} className="flex flex-col justify-between items-center bg-wine border-[#C6AF87] hover:bg-wine/80 border-solid border-4 rounded-xl shadow md:flex-row md:w-[90%] md:h-[7%]">
			{isEven ? (
				<img className="object-contain w-full rounded-t-lg md:h-full md:w-[40%] md:rounded-none md:rounded-l-lg" src={project.image} alt={project.name} />
			) : null}
			<div className={`flex flex-col h-full justify-between p-4 leading-normal ${isEven ? 'md:items-end' : 'md:items-start'}`}>
				<h5 className="mb-2 text-xl font-cabinBold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
				<p className="mb-3 font-cabin text-gray-400">{project.description}</p>
				<div className={`flex flex-wrap ${isEven ? 'md:justify-end' : 'md:justify-start'} gap-2 my-2`}>
					{project.stacks.map((stack: string) => (
						<img key={stack} className={classStacks} src={`/assets/img/stacks/${stack}.png`} alt={stack} />
					))}
				</div>
			</div>
			{
				!isEven ? (
					<img className="object-cover w-full rounded-t-lg md:h-full md:w-[40%] md:rounded-none md:rounded-r-lg" src={project.image} alt={project.name} />
				) : null
			}
		</a >
	);
}