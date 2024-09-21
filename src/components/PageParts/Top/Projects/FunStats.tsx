import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function FunStats() {
	return (
		<div className="flex flex-row w-full h-full">
			<div className="flex flex-col justify-center w-1/3 h-full gap-3 sm:gap-6 md:gap-10 lg:gap-14 mt-4">
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg ml-2 md:ml-4 lg:ml-6">9 démos</h1>
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg ml-2 md:ml-4 lg:ml-6">1603 xp</h1>
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg ml-2 md:ml-4 lg:ml-6 hidden md:block">129 push</h1>
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg ml-2 md:ml-4 lg:ml-6">129 commits</h1>
			</div>

			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center absolute w-[90%] top-10 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-base md:text-2xl lg:text-3xl">Quelques stats ...</h1>
				<BackgroundSign />
			</div>

			<div className="flex flex-col justify-center items-end w-1/3 h-full gap-4 sm:gap-6 md:gap-10 lg:gap-14 mt-4">
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg mr-2 md:mr-4 lg:mr-6">209 bugs</h1>
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg mr-2 md:mr-4 lg:mr-6">452 tests</h1>
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg mr-2 md:mr-4 lg:mr-6 hidden md:block">751 jours</h1>
				<h1 className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg mr-2 md:mr-4 lg:mr-6">12 projets</h1>
			</div>
		</div>
	);
}