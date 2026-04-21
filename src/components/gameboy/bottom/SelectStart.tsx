"use client"

import Footer from "./Footer";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function SelectStart() {
	const pathname = usePathname();
	const isInnerPage = pathname.includes("/projects") || pathname.includes("/about");

	const speakersClass = isInnerPage
		? "w-[10%] max-w-[120px]"
		: "w-[25%] max-w-[120px]";

	const ssBtnClass = isInnerPage
		? "w-[25%] max-w-[250px] mt-4"
		: "w-[50%] max-w-[250px] sm:w-[60%] mt-4";

	return (
		<div className="w-full h-full flex flex-col items-center justify-end">
			<Image src="/assets/SVG/Speakers.svg" alt="Speakers" className={speakersClass} width={120} height={120} />
			<Image src="/assets/SVG/SSBtn.svg" alt="Select" className={ssBtnClass} width={250} height={250} />
			<Footer />
		</div>
	);
}
