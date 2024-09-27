"use client"

import Footer from "../Footer";
import Image from "next/image";
import { createClassNameSSBtn } from "@/utils/createClassNameSSBtn";
import { usePathname } from "next/navigation";

export default function Select_Btn() {
	const pathname = usePathname();

	return (
		<div className="w-full h-full flex flex-col items-center justify-end">
			<Image src="/assets/SVG/Speakers.svg" alt="Speakers" className={createClassNameSSBtn(pathname).img1} width={120} height={120} />
			<Image src="/assets/SVG/SSBtn.svg" alt="Select" className={createClassNameSSBtn(pathname).img2} width={250} height={250} />
			<Footer />
		</div>
	);
}