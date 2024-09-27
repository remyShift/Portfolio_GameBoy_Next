"use client"

import TopScreen from "./TopScreen/TopScreen";
import BottomScreen from "./BottomScreen/BottomGreyScreen";
import "./GreyScreen.css";
import { useValidPaths } from "@/context/store";
import { usePathname } from "next/navigation";

export default function GreyScreen({ children }: { children: React.ReactNode }) {
	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const isPathValid = validPaths.includes(pathname);

	return (
		<main className={`${isPathValid ? "bg-greyScreen" : "bg-zinc-900"} relative h-[88%] w-[94%] sm:h-[87%] md:h-[91%] lg:h-[88%] sm:w-[95%] md:w-[92%] flex flex-col rounded-xl md:rounded-2x shadow-[inset_0_0_0.5rem_0.18rem_#363636]`}>
			<span className="noise-animation"></span>
			<TopScreen />
			{children}
			<BottomScreen />
		</main>
	);
}