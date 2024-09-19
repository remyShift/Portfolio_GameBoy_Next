import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function AboutPage() {
	return (
		<div className="flex flex-row w-full h-full justify-between">
			<div className="flex justify-center items-center w-1/3 h-full">
				<div className="flex justify-center items-center w-full ml-4">
					<p className="font-pressStart2P text-pretty text-[0.45rem] sm:text-sm md:text-base lg:text-lg">Passionné d’informatique et curieux, je recherche constamment de nouveaux défis. Ma créativité, mon adaptabilité et mes différentes expériences enrichissent les  projets auxquels je contribuent.</p>
				</div>
			</div>
			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center text-[0.7rem] sm:text-sm md:text-base lg:text-lg">Apprenez à me connaître ...</h1>
				<BackgroundSign />
			</div>
			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<p className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg">Rémy</p>
				<img src="/assets/icons/Arrow.png" alt="Arrow" className="w-3 h-2 sm:w-5 sm:h-4 lg:w-6 lg:h-5 mb-1" />
				<img src="/assets/img/pictureOfMe.png" alt="Picture of me" className="object-contain w-[90%] border-2 border-wine" />
			</div>
		</div>
	);
}