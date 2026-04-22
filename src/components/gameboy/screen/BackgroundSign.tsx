export default function BackgroundSign() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<span aria-hidden="true" className="font-gillSans font-bold text-7xl sm:text-8xl lg:text-[20dvh] xl:text-[25dvh] bg-clip-text text-transparent bg-black/25"
				style={{ textShadow: "0 0.2rem 0.4rem #CFCCCC" }}>
				&lt;/&gt;
			</span>
		</div>
	);
}