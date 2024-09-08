export default function TextBorderWine() {
	return (
		<div className="min-w-fit h-fit flex justify-center z-20 mb-1 mt-1.5">
			<p className="relative font-gillSansBoldItalic text-wine z-10 text-xs sm:text-lg md:text-xl xl:text-2xl text-center">
				Développeur Fullstack
				<span
					className="absolute inset-0 z-[-1] stroke-borderWine text-borderWine"
					style={{
						WebkitTextStroke: `0.25rem #C6AF87`,
						color: "#C6AF87",
						width: "100%",
						height: "100%",
					}}
				>
					Développeur Fullstack
				</span>
			</p>
		</div>
	);
}
