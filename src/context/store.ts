import { create } from "zustand";

export const useValidPaths = create<{ validPaths: string[] }>((set) => ({
	validPaths: ["/", "/about", "/contact", "/projects", "/summary", "/fun-stats", "/projects/fun-stats", "/projects/summary"],
}));

export const useContactForm = create<{ firstName: string, lastName: string, email: string, message: string, isValid: boolean, textSendBtn: string, setFirstName: (firstName: string) => void, setLastName: (lastName: string) => void, setEmail: (email: string) => void, setMessage: (message: string) => void, setIsValid: (isValid: boolean) => void, setTextSendBtn: (textSendBtn: string) => void }>((set) => ({
	firstName: "",
	lastName: "",
	email: "",
	message: "",
	isValid: false,
	textSendBtn: "Envoyer",
	setFirstName: (firstName: string) => set({ firstName }),
	setLastName: (lastName: string) => set({ lastName }),
	setEmail: (email: string) => set({ email }),
	setMessage: (message: string) => set({ message }),
	setIsValid: (isValid: boolean) => set({ isValid }),
	setTextSendBtn: (textSendBtn: string) => set({ textSendBtn }),
}));