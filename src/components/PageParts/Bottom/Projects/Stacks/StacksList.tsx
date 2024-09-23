import Stack from "./Stack";
import { stacks } from "../../../../../projects.json";

export default function StacksList() {
	return (
		<div className="w-full h-[10%] sm:h-[15%] md:h-[25%] lg:h-[35%] flex justify-center items-center gap-5 md:gap-7 my-4">
			{stacks.map((stack) => (
				<Stack key={stack} stack={stack} />
			))}
		</div>
	);
}