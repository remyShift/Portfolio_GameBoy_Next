import Link from "next/link";
import Image from "next/image";
import BackgroundSign from "@/components/gameboy/screen/BackgroundSign";

export default function WelcomePage() {
	return (
		<div className="flex flex-row w-full h-full">
			<h1 className="sr-only">Rémy Cassagne — développeur fullstack JavaScript/TypeScript</h1>
			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="/about" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/pixel/person.svg" alt="" aria-hidden="true" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							À propos
						</Link>
					</li>
					<li>
						<Link href="/projects" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/pixel/document.svg" alt="" aria-hidden="true" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Projets
						</Link>
					</li>
					<li>
						<Link href="/contact" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/pixel/call.svg" alt="" aria-hidden="true" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Contact
						</Link>
					</li>
				</ul>
			</nav>

			<BackgroundSign />

			<div className="flex flex-col justify-end items-center w-1/3 h-full gap-1">
				<p className="font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg">Rémy</p>
				<Image src="/assets/icons/pixel/arrow.svg" alt="" aria-hidden="true" width={20} height={20} className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
				<Image src="/assets/img/MeAvatar.webp" alt="Avatar de Rémy" width={180} height={140} priority className="w-[45%] h-[35%] md:h-[30%] lg:h-[35%] object-contain" />
			</div>
		</div>
	);
}