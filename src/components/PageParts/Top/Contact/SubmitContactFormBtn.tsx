import { useContactForm } from "@/context/store";

export default function SubmitContactFormBtn() {
	const { firstName, lastName, email, message, isValid, textSendBtn, setFirstName, setLastName, setEmail, setMessage, setTextSendBtn } = useContactForm();

	return (
		<div className="flex justify-center items-center w-full mb-2">
			<button type="submit" className={`w-[70%] h-auto p-1 outline-none focus:outline-black rounded text-cream text-center text-wrap text-[0.5rem] sm:text-[0.7rem] md:text-xs lg:text-base font-pressStart2P ${isValid ? "bg-wine hover:bg-wine/80" : "bg-greyTextInfo/50"}`}>{textSendBtn}</button>
		</div>
	);
}