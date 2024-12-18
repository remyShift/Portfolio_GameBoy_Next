import Image from 'next/image';
import ProjectDescription from './ProjectDescription';
import { useEffect, useState, useRef } from 'react';

export default function Card({ project, index }: { project: any, index: number }) {
	const [isVisible, setIsVisible] = useState(false);
	const [prevY, setPrevY] = useState<number | null>(null);
	const cardRef = useRef(null);

	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				const currentY = entry.boundingClientRect.top;
				if (entry.isIntersecting && (prevY === null || currentY < prevY)) {
					setIsVisible(true);
				}
				setPrevY(currentY)
			});
		};

		const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
		if (cardRef.current) {
			observer.observe(cardRef.current);
			if (cardRef.current && (cardRef.current as HTMLElement).getBoundingClientRect().top < window.innerHeight) {
				setIsVisible(true);
			}
		}

		return () => {
			if (cardRef.current) {
				observer.unobserve(cardRef.current);
			}
		};
	}, [prevY]);

	let classStacks: string;
	console.log(project.stacks)
	project.stacks[0] === "lua" ? classStacks = "w-[8%] md:w-[30%] max-w-[50px] md:min-w-[30px] lg:min-w-[40px] md:max-w-none object-contain" : classStacks = "w-[7%] max-w-[50px] md:min-w-[30px] lg:min-w-[40px] md:max-w-none object-contain"

	const isEven = index % 2 === 0;

	return (
		<a href={project.link} ref={cardRef} target="_blank" className={`flex flex-col justify-between items-center hover:cursor-pointer hover:scale-105 bg-wine border-[#C6AF87] hover:bg-wine/80 border-solid border-4 rounded-xl drop-shadow-lg md:flex-row w-[80%] md:w-[75%] md:h-auto lg:h-[7%] transform transition-transform duration-500 ${isVisible ? (isEven ? 'opacity-100 translate-x-0' : 'opacity-100 translate-x-0') : (isEven ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full')}`}>
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