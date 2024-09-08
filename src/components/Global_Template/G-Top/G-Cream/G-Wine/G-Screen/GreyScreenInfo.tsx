export default function GreyScreenInfo() {
	return (
		<div className="flex flex-col h-full">
			{/* Top greyScreen */}
			<div className="flex justify-between pt-2">
				<h1 className="text-greyTextInfo font-gillSansBold text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] pl-2">@MENU</h1>
				<h1 className="text-greyTextInfo font-gillSansBold text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] pr-2.5">BATTERIE PLEINE</h1>
			</div>

			{/* Background greyScreen */}
			<div className="flex-grow flex justify-center items-center">
				<h1 className="font-gillSansBold text-[10dvh] bg-clip-text text-transparent bg-black/25"
					style={{ textShadow: "0 0.1rem 0.4rem #CFCCCC" }}>
					&lt;/&gt;
				</h1>
			</div>

			{/* Bottom greyScreen */}
			<div className="flex justify-center">
				<h1 className="text-greyTextInfo font-gillSansBold text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] pb-1">► DISPONIBLE</h1>
			</div>
		</div>
	);
}