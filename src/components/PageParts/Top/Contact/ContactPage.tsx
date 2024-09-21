import Link from "next/link";
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";

export default function ContactPage() {
	return (
		<div className="flex flex-row w-full h-full">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="https://github.com/remyShift" target="_blank" className="flex items-center gap-2 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/GithubIcon.png" alt="Person" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Github
						</Link>
					</li>
					<li>
						<Link href="https://www.linkedin.com/in/r%C3%A9my-c-bb8b11296/" target="_blank" className="flex items-center gap-2 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/LinkedinIcon.png" alt="Projects" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Linkedin
						</Link>
					</li>
					<li>
						<Link href="mailto:remy.engassac@icloud.com" target="_blank" className="flex items-center gap-2 font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<img src="/assets/icons/Mail.png" alt="Mail" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Mail
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center absolute w-[85%] top-10 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-base md:text-2xl lg:text-3xl">Interréssé ? Curieux ? N'attendez plus, Contactez moi !</h1>
				<BackgroundSign />
			</div>

			<div className="flex flex-col justify-center items-center w-1/3 h-full gap-1">
				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-1">
						<label htmlFor="lastName" className="font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg">Nom :</label>
						<input type="text" id="lastName" name="lastName" />
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="firstName" className="font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg">Prénom :</label>
						<input type="text" id="firstName" name="firstName" className="bg-gray-300 border-1" />
					</div>


					<div className="flex flex-col gap-1">
						<label htmlFor="email" className="font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg">Mail :</label>
						<input type="email" id="email" name="email" />
					</div>

					<div className="flex flex-col gap-1">
						<label htmlFor="message" className="font-pressStart2P text-[0.7rem] sm:text-sm md:text-base lg:text-lg">Message :</label>
						<textarea id="message" name="message" />
					</div>
				</form>
			</div>
		</div>
	);
}