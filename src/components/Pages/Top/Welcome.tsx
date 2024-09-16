import Link from "next/link";
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function WelcomePage() {
	return (
		<div className="flex flex-row w-full h-full">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full">
				<ul className="flex flex-col gap-4">
					<li>
						<Link href="/about" className="flex flex-row items-center gap-2 font-pressStart2P text-[0.6rem] hover:underline">
							<img src="/assets/icons/Person.png" alt="Person" className="w-4 h-4" />
							About
						</Link>
					</li>
					<li className="flex flex-row gap-2">
						<Link href="/projects" className="flex flex-row items-center gap-2 font-pressStart2P text-[0.6rem] hover:underline">
							<img src="/assets/icons/Document.png" alt="Projects" className="w-4 h-4" />
							Projects
						</Link>
					</li>
					<li className="flex flex-row gap-2">
						<Link href="/contact" className="flex flex-row items-center gap-2 font-pressStart2P text-[0.6rem] hover:underline">
							<img src="/assets/icons/Call.png" alt="Contact" className="w-4 h-4" />
							Contact
						</Link>
					</li>
				</ul>
			</nav>

			<BackgroundSign />

			<div className="flex flex-col justify-end items-center w-1/3 h-full">
				<p className="font-pressStart2P text-[0.6rem]">Rémy</p>
				<img src="/assets/icons/Arrow.png" alt="Arrow" className="w-2 h-2" />
				<img src="/assets/img/MeAvatar.png" alt="Me as avatar" className="w-[45%] h-[35%] object-contain" />
			</div>
		</div>
	);
}