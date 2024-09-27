"use client";

import { usePathname } from "next/navigation";
import Image from 'next/image';
import { images } from "@/utils/Global/bottomImages";
import ImageComponent from "./BottomImages";

export default function ScrollCTA() {
	const pathname = usePathname();
	const currentImages = images[pathname as keyof typeof images] || [];

	return (
		<div className="flex justify-center">
			{currentImages[0] && (
				<ImageComponent src={currentImages[0].src} alt={currentImages[0].alt} className={currentImages[0].className} />
			)}
			<div className="flex flex-col items-center justify-center w-1/3">
				<h1 className="font-pressStart2P text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">SCROLL</h1>
				<Image src="/assets/icons/Pointer_Down.webp" alt="Arrow" className="w-3 h-2 sm:w-4 sm:h-3 lg:w-6 lg:h-5 mb-2" width={24} height={16} />
			</div>
			{currentImages[1] && (
				<ImageComponent src={currentImages[1].src} alt={currentImages[1].alt} className={currentImages[1].className} />
			)}
		</div>
	);
}