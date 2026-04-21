"use client"

import Link from "next/link";
import Image from 'next/image';
import BackgroundSign from "@/components/gameboy/screen/BackgroundSign";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contactFormSchema, type ContactFormValues } from "@/schemas/contactForm";

const inputClasses = "rounded w-full h-1/2 text-xs sm:text-sm md:text-base lg:text-lg sm:h-auto bg-gray-300 border-[0.09rem] px-1 md:py-1 font-gillSans border-gray-400 focus:border-gray-800 focus:outline-none";
const labelClasses = "font-pressStart2P text-[0.6rem] sm:text-xs md:text-sm lg:text-base";

export default function ContactPage() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid, isSubmitting },
	} = useForm<ContactFormValues>({
		mode: "onChange",
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = async (values: ContactFormValues) => {
		try {
			const response = await fetch('/contact/api/send', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(values),
			});
			if (!response.ok) {
				toast.error("Une erreur est survenue, merci de réessayer.");
				return;
			}
			reset();
			toast.success("Merci pour votre message !");
		} catch {
			toast.error("Une erreur est survenue, merci de réessayer.");
		}
	};

	return (
		<div className="flex flex-row w-full h-full">
			<nav className="flex flex-col justify-center items-center w-1/3 h-full relative z-1">
				<ul className="flex flex-col gap-4 sm:gap-6 md:gap-10 lg:gap-14 ml-2">
					<li>
						<Link href="https://github.com/remyShift" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/GithubIcon.webp" alt="Person" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Github
						</Link>
					</li>
					<li>
						<Link href="https://www.linkedin.com/in/remy-cassagne?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/LinkedinIcon.webp" alt="Projects" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Linkedin
						</Link>
					</li>
					<li>
						<Link href="mailto:contact@remy-shift.dev" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg hover:underline">
							<Image src="/assets/icons/Mail.webp" alt="Mail" width={32} height={32} className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8" />
							Mail
						</Link>
					</li>
				</ul>
			</nav>

			<div className="flex flex-col justify-center items-center w-1/3 h-full">
				<h1 className="font-pressStart2P text-pretty text-center absolute w-[85%] top-7 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-sm md:text-2xl">Intéressé ? Curieux ? N'attendez plus, Contactez moi !</h1>
				<BackgroundSign />
			</div>

			<div className="hidden md:flex flex-col justify-center w-1/3 h-full relative z-1">
				<form onSubmit={handleSubmit(onSubmit)} className="w-[95%] sm:w-[90%] h-full flex flex-col justify-end gap-1 md:gap-4">
					<div className="w-full flex flex-col justify-center">
						<label htmlFor="lastName" className={labelClasses}>Nom :</label>
						<input
							type="text"
							id="lastName"
							placeholder="Doe"
							className={inputClasses}
							{...register("lastName")}
						/>
					</div>

					<div className="w-full flex flex-col justify-center">
						<label htmlFor="firstName" className={labelClasses}>Prénom :</label>
						<input
							type="text"
							id="firstName"
							placeholder="John"
							className={inputClasses}
							{...register("firstName")}
						/>
					</div>

					<div className="w-full flex flex-col justify-center">
						<label htmlFor="email" className={labelClasses}>Mail :</label>
						<input
							type="email"
							id="email"
							placeholder="john.doe@example.com"
							className={inputClasses}
							{...register("email")}
						/>
					</div>

					<div className="w-full flex flex-col justify-center">
						<label htmlFor="message" className={labelClasses}>Message :</label>
						<textarea
							id="message"
							placeholder="Hello, I'm interested in your work..."
							className={`${inputClasses} md:h-40 resize-none`}
							{...register("message")}
						/>
					</div>

					<div className="flex justify-center items-center w-full mb-2">
						<button
							type="submit"
							disabled={!isValid || isSubmitting}
							className={`w-[70%] h-auto p-1 outline-none focus:outline-black rounded text-cream text-center text-wrap text-[0.5rem] sm:text-[0.7rem] md:text-xs lg:text-base font-pressStart2P ${isValid && !isSubmitting ? "bg-wine hover:bg-wine/80 transition ease duration-300" : "bg-greyTextInfo/50"}`}
						>
							{isSubmitting ? "En cours..." : "Envoyer"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
