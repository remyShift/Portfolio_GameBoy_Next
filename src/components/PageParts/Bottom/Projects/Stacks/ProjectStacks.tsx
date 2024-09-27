import Image from 'next/image';

export default function ProjectStacks({ stacks, classStacks, isEven }: { stacks: string[], classStacks: string, isEven: boolean }) {
	return (
		<div className={`flex flex-wrap ${isEven ? 'md:justify-end' : 'md:justify-start'} gap-2 my-2`}>
			{stacks.map((stack: string) => (
				<Image key={stack} className={classStacks} src={`/assets/img/stacks/${stack}.webp`} alt={stack} width={50} height={50} />
			))}
		</div>
	);
}