"use client";

import { usePathname } from "next/navigation";

const images = {
	"/projects/fun-stats": [
		{ src: "/assets/img/chihiro.png", alt: "Chihiro", className: "w-10 h-7 sm:w-12 sm:h-9 md:w-20 md:h-16 lg:w-24 lg:h-18" },
		{ src: "/assets/img/susuwatari.png", alt: "Susuwatari", className: "w-5 h-5 md:w-8 md:h-8 lg:w-10 lg:h-10" }
	],
	"/projects/summary": [
		{ src: "/assets/img/sneakers.png", alt: "Sneakers", className: "w-10 h-8 sm:w-12 sm:h-10 md:w-20 md:h-16 lg:w-24 lg:h-20" },
		{ src: "/assets/img/cat.png", alt: "Cat", className: "w-5 h-5 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12" }
	]
};

export default function ScrollCTA() {
	const pathname = usePathname();
	const currentImages = images[pathname as keyof typeof images] || [];

	return (
		<div className="flex justify-center">
			{currentImages[0] && (
				<div className="flex w-1/3 items-end justify-center">
					<img src={currentImages[0].src} alt={currentImages[0].alt} className={currentImages[0].className} />
				</div>
			)}
			<div className="flex flex-col items-center justify-center w-1/3">
				<h1 className="font-pressStart2P text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">SCROLL</h1>
				<img src="/assets/icons/Pointer_Down.png" alt="Arrow" className="w-3 h-2 sm:w-4 sm:h-3 lg:w-6 lg:h-5 mb-2" />
			</div>
			{currentImages[1] && (
				<div className="flex w-1/3 items-end justify-center">
					<img src={currentImages[1].src} alt={currentImages[1].alt} className={currentImages[1].className} />
				</div>
			)}
		</div>
	);
}