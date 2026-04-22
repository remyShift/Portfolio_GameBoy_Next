"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import ScrollCTA from "./ScrollCta";

const images = {
	"/projects/fun-stats": [
		{ src: "/assets/img/chihiro.webp", alt: "Chihiro", width: 96, height: 72, className: "w-10 h-7 sm:w-12 sm:h-9 md:w-20 md:h-16 lg:w-24 lg:h-18" },
		{ src: "/assets/img/susuwatari.webp", alt: "Susuwatari", width: 32, height: 32, className: "w-5 h-5 md:w-8 md:h-8 lg:w-8 lg:h-8" },
	],
	"/about": [
		{ src: "/assets/img/sneakers.webp", alt: "Sneakers", width: 96, height: 48, className: "w-10 h-6 sm:w-12 sm:h-8 md:w-20 md:h-12 lg:w-24 lg:h-12" },
		{ src: "/assets/img/cat.webp", alt: "Cat", width: 56, height: 56, className: "w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" },
	],
};

export default function ScrollAndImages() {
	const pathname = usePathname();
	const currentImages = images[pathname as keyof typeof images] || [];

	return (
		<div className="flex justify-center">
			{currentImages[0] && (
				<div className="flex w-1/3 items-end justify-center">
					<Image src={currentImages[0].src} alt={currentImages[0].alt} width={currentImages[0].width} height={currentImages[0].height} className={currentImages[0].className} />
				</div>
			)}
			<ScrollCTA />
			{currentImages[1] && (
				<div className="flex w-1/3 items-end justify-center">
					<Image src={currentImages[1].src} alt={currentImages[1].alt} width={currentImages[1].width} height={currentImages[1].height} className={currentImages[1].className} />
				</div>
			)}
		</div>
	);
}