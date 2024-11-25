import Stack from "./Stack";

export default function StacksList() {
	const stacks = [
		"html",
		"css",
		"js",
		"tailwindcss",
		"c",
		"lua",
		"next",
		"react",
		"ruby",
		"rails",
		"sql"
	]

	return (
		<div className="w-full flex flex-wrap justify-center items-center gap-5 md:gap-7 my-4">
			{stacks.map((stack) => (
				<Stack key={stack} stack={stack} />
			))}
		</div>
	);
}