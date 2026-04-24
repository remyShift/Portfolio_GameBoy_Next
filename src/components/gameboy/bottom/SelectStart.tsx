"use client"

import Footer from "./Footer";
import Image from "next/image";
import { usePathname } from "@/i18n/navigation";
import { isScrollableSection } from "@/lib/navigation";

export default function SelectStart() {
	const pathname = usePathname();
	const isInnerPage = isScrollableSection(pathname);

	const speakersClass = isInnerPage
		? "w-[10%] max-w-[120px]"
		: "w-[25%] max-w-[120px]";

	const ssBtnClass = isInnerPage
		? "w-[25%] max-w-[250px] mt-4"
		: "w-[50%] max-w-[250px] sm:w-[60%] mt-4";

	return (
		<div className="w-full h-full flex flex-col items-center justify-end">
			<Image src="/assets/SVG/Speakers.svg" alt="" aria-hidden="true" className={speakersClass} width={120} height={120} />
			<Image src="/assets/SVG/SSBtn.svg" alt="" aria-hidden="true" className={ssBtnClass} width={250} height={250} />
			<Footer />
		</div>
	);
}
