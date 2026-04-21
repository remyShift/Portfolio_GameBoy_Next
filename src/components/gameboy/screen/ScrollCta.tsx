import { LuChevronDown } from "react-icons/lu";
import "./ScrollCta.css";

export default function ScrollCTA() {
	return (
		<div className="flex flex-col items-center justify-center w-1/3">
			<span className="font-pressStart2P text-[0.5rem] sm:text-[0.6rem] md:text-xs lg:text-sm">SCROLL</span>
			<LuChevronDown aria-hidden="true" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 mb-2 bounce" />
		</div>
	);
}
