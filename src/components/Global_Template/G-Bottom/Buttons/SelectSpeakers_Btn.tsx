"use client"

import Footer from "../Footer";
import { usePathname } from "next/navigation";

export default function Select_Btn() {

	const pathname = usePathname();

	const createClassName = (): { img1: string, img2: string } => {
		return pathname.includes("/projects") || pathname.includes("/about") ? {
			img1: "w-[10%] max-w-[120px]",
			img2: "w-[25%] max-w-[250px] mt-4",
		} : {
			img1: "w-[25%] max-w-[120px]",
			img2: "w-[50%] max-w-[250px] sm:w-[60%] mt-4",
		};
	}

	return (
		<div className="w-full h-full flex flex-col items-center justify-end">
			<img src="/assets/SVG/Speakers.svg" alt="Speakers" className={createClassName().img1} />
			<img src="/assets/SVG/SSBtn.svg" alt="Select" className={createClassName().img2} />
			<Footer />
		</div>
	);
}