import Link from "next/link";
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function WelcomePage() {
	return (
		<div className="flex flex-row w-full h-full justify-between">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="/about" className="flex flex-row items-center gap-2 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/Person.png" alt="Person" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							About
						</Link>
					</li>
					<li className="flex flex-row gap-2">
						<Link href="/projects" className="flex flex-row items-center gap-2 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/Document.png" alt="Projects" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Projects
						</Link>
					</li>
					<li className="flex flex-row gap-2">
						<Link href="/contact" className="flex flex-row items-center gap-2 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/Call.png" alt="Contact" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Contact
						</Link>
					</li>
				</ul>
			</nav>

			<BackgroundSign />

			<div className="flex flex-col justify-end items-center w-1/3 h-full gap-1">
				<p className="font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg">Rémy</p>
				<img src="/assets/icons/Arrow.png" alt="Arrow" className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
				<img src="/assets/img/MeAvatar.png" alt="Me as avatar" className="w-[45%] h-[35%] md:h-[30%] lg:h-[35%] object-contain" />
			</div>
		</div>
	);
}