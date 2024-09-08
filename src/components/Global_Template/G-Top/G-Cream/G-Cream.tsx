import WineBorder from "./G-Wine/WineBorder";

export default function G_Cream({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-cream z-2 w-full h-full relative top-[3%] rounded-xl flex justify-center items-center shadow-[0_1rem_1rem_-0.5rem_rgba(0,0,0,0.5)]">
			<WineBorder>
				{children}
			</WineBorder>
		</div>
	);
}