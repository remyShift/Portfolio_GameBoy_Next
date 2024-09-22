export default function TextBorderWine() {
	return (
		<div className="min-w-fit h-fit flex justify-center z-20 my-[0.2rem] md:my-[0.4rem]">
			<p className="relative font-cabinBoldItalic text-wine z-10 text-base sm:text-xl md:text-2xl lg:text-3xl text-center">
				Développeur Fullstack
				<span
					className="absolute inset-0 z-[-1] text-stroke">
					Développeur Fullstack
				</span>
			</p>
		</div>
	);
}
