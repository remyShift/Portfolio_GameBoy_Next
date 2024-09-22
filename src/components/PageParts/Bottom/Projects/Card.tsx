export default function Card({ project }: { project: any }) {
	let classStacks: string;
	console.log(project.stacks)
	project.stacks[0] === "lua" ? classStacks = "w-[40%] object-contain" : classStacks = "w-[15%] object-contain"

	return (
		<a href="#" className="flex flex-col items-center bg-wine border-[#C6AF87] hover:bg-wine/80 border-solid border-4 rounded-lg shadow md:flex-row md:max-w-xl ">
			<img className="object-cover w-full rounded-t-lg md:h-auto md:w-[40%] md:rounded-none md:rounded-s-lg" src={project.image} alt={project.name} />
			<div className="flex flex-col h-full justify-between p-4 leading-normal">
				<h5 className="mb-2 text-xl font-cabinBold tracking-tight text-gray-900 dark:text-white">{project.name}</h5>
				<p className="mb-3 font-cabin text-gray-400">{project.description}</p>
				<div className="flex flex-wrap items-end gap-2 my-2">
					{project.stacks.map((stack: string) => (
						<img key={stack} className="w-[10%] sm:w-[7%] md:w-[10%] object-contain" src={`/assets/img/stacks/${stack}.png`} alt={stack} />
					))}
				</div>
			</div>
		</a>
	);
}