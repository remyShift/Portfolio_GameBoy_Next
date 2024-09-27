"use client";

import { usePathname } from "next/navigation";
import { images } from "@/utils/Global/bottomImages";
import ImageComponent from "./BottomImages";
import ScrollCTA from "./ScrollCta";

export default function ScrollAndImages() {
	const pathname = usePathname();
	const currentImages = images[pathname as keyof typeof images] || [];

	return (
		<div className="flex justify-center">
			{currentImages[0] && (
				<ImageComponent src={currentImages[0].src} alt={currentImages[0].alt} className={currentImages[0].className} />
			)}
			<ScrollCTA />
			{currentImages[1] && (
				<ImageComponent src={currentImages[1].src} alt={currentImages[1].alt} className={currentImages[1].className} />
			)}
		</div>
	);
}