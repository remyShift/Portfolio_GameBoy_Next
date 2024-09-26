import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

const aboutText = "Passionné d’informatique et curieux, je recherche constamment de nouveaux défis. Ma créativité, mon adaptabilité et mes différentes expériences enrichissent les projets auxquels je contribue.";
const aboutTitle = "Apprenez à me connaître ...";

export default function AboutPage() {
	return (
		<div className="flex flex-row w-full h-full">
			<div className="flex justify-center items-center w-1/3 h-full">
				<p className="font-pressStart2P text-pretty text-[0.45rem] sm:text-xs md:text-base lg:text-lg ml-4 xl:ml-8 absolute w-[55%] xl:w-1/2 left-2">{aboutText}</p>
			</div>

			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center absolute w-[85%] top-10 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-base md:text-2xl lg:text-3xl">{aboutTitle}</h1>
				<BackgroundSign />
			</div>

			<div className="flex flex-col justify-center items-center w-1/3 h-full sm:mt-6 md:mt-0">
				<p className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-base lg:text-lg">Rémy</p>
				<img src="/assets/icons/Arrow.webp" alt="Arrow" className="w-3 h-2 sm:w-4 sm:h-3 lg:w-6 lg:h-5 mb-1" />
				<img src="/assets/img/pictureOfMe.webp" alt="Picture of me" className="object-contain w-[85%] sm:w-[90%] xl:w-[75%] border-2 border-wine" />
			</div>
		</div>
	);
}