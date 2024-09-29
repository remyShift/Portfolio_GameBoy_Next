import { useEffect, useRef } from 'react';

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

function loaderWelcome(target: HTMLElement, count: number, string: string) {
	let iterations = 0;
	let interval = setInterval(() => {
		target.innerText = target.innerText.split("")
			.map((letter, index) => {
				if (index < iterations) {
					return string[index];
				}
				return alphabet[Math.floor(Math.random() * alphabet.length)];
			})
			.join("");
		if (iterations >= count) {
			clearInterval(interval);
		}
		iterations += 1 / 2;
	}, 50);
}

interface DividerProps {
	children: React.ReactNode;
	onClick?: () => void;
}

export default function Divider({ children, onClick }: DividerProps) {
	const textRef = useRef(null);

	useEffect(() => {
		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && textRef.current && children && !onClick) {
					loaderWelcome(textRef.current, children.toString().length, children.toString());
				}
			});
		};

		const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
		if (textRef.current) {
			observer.observe(textRef.current);
		}

		return () => {
			if (textRef.current) {
				observer.unobserve(textRef.current);
			}
		};
	}, [children]);

	const handleMouseEnter = () => {
		if (textRef.current && children && !onClick) {
			loaderWelcome(textRef.current, children.toString().length, children.toString());
		}
	};

	return (
		<div className="flex w-[80%] items-center rounded-full my-4 md:my-6 lg:my-10">
			<div className="flex-1 border-b border-wine"></div>
			<h1
				ref={textRef}
				className={`text-black cursor-default text-xl md:text-2xl lg:text-3xl font-gillSans font-bold ${onClick ? 'rounded-full w-[10%] py-2 text-center flex justify-center items-center hover:bg-wine hover:text-white cursor-pointer border-2 border-wine' : ''}`}
				onClick={onClick}
				onMouseEnter={handleMouseEnter}
			>
				{children}
			</h1>
			<div className="flex-1 border-b border-wine"></div>
		</div>
	);
}