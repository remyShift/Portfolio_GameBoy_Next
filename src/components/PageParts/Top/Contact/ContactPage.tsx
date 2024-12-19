"use client"

import Link from "next/link";
import Image from 'next/image';
import BackgroundSign from "@/components/Global_Template/G-Top/G-Cream/G-Wine/G-Screen/BackgroundSign";
import { useContactForm } from "@/context/store";
import SubmitContactFormBtn from "./SubmitContactFormBtn";
import { useEffect } from "react";

export default function ContactPage() {
	const { firstName, lastName, email, message, setFirstName, setLastName, setEmail, setMessage, setTextSendBtn, setIsValid } = useContactForm();

	useEffect(() => {
		(firstName && lastName && email && message) ? setIsValid(true) : setIsValid(false);
	}, [firstName, lastName, email, message, setIsValid]);

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setMessage("");
	};

	const onSubmitHandler = async () => {
		setTextSendBtn("En cours...");
		await fetch('/contact/api/send', {
			method: 'POST',
			body: JSON.stringify({ firstName, lastName, email, message }),
		});
		setTextSendBtn("Envoyer");
		clearForm();
		alert("Merci pour votre message !");
	};

	return (
		<div className="flex flex-row w-full h-full">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="https://github.com/remyShift" target="_blank" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/GithubIcon.webp" alt="Person" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Github
						</Link>
					</li>
					<li>
						<Link href="https://www.linkedin.com/in/remy-cassagne?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/LinkedinIcon.webp" alt="Projects" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Linkedin
						</Link>
					</li>
					<li>
						<Link href="mailto:contact@remyshift.dev" target="_blank" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/Mail.webp" alt="Mail" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Mail
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center absolute w-[85%] top-7 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-sm md:text-2xl">Interréssé ? Curieux ? N'attendez plus, Contactez moi !</h1>
				<BackgroundSign />
			</div>

			<div className="flex flex-col justify-center w-1/3 h-full relative z-1">
				<form onSubmit={onSubmitHandler} className="w-[95%] sm:w-[90%] h-full flex flex-col justify-end gap-1 md:gap-4">
					<div className="w-full flex flex-col justify-center">
						<label htmlFor="lastName" className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-sm lg:text-base">Nom :</label>
						<input type="text" required id="lastName" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} className="rounded w-full h-1/2 text-xs sm:text-sm md:text-base lg:text-lg sm:h-auto bg-gray-300 border-[0.09rem] px-1 md:py-1 font-gillSans border-gray-400 focus:border-gray-800 focus:outline-none" />
					</div>

					<div className="w-full flex flex-col justify-center">
						<label htmlFor="firstName" className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-sm lg:text-base">Prénom :</label>
						<input type="text" required id="firstName" value={firstName} placeholder="John" onChange={(e) => setFirstName(e.target.value)} className="rounded w-full h-1/2 text-xs sm:text-sm md:text-base lg:text-lg sm:h-auto bg-gray-300 border-[0.09rem] px-1 md:py-1 font-gillSans border-gray-400 focus:border-gray-800 focus:outline-none" />
					</div>

					<div className="w-full flex flex-col justify-center">
						<label htmlFor="email" className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-sm lg:text-base">Mail :</label>
						<input type="email" required id="email" placeholder="john.doe@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded w-full h-1/2 text-xs sm:text-sm md:text-base lg:text-lg sm:h-auto bg-gray-300 border-[0.09rem] px-1 md:py-1 font-gillSans border-gray-400 focus:border-gray-800 focus:outline-none" />
					</div>
					<div className="w-full flex flex-col justify-center">
						<label htmlFor="message" className="font-pressStart2P text-[0.6rem] sm:text-xs md:text-sm lg:text-base">Message :</label>
						<textarea id="message" required placeholder="Hello, I'm interested in your work..." value={message} onChange={(e) => setMessage(e.target.value)} className="rounded w-full h-1/2 text-xs sm:text-sm md:text-base lg:text-lg  sm:h-auto md:h-40 bg-gray-300 border-[0.09rem] px-1 md:py-1 font-gillSans border-gray-400 focus:border-gray-800 focus:outline-none resize-none" />
					</div>
					<SubmitContactFormBtn />
				</form>
			</div>
		</div>
	);
}