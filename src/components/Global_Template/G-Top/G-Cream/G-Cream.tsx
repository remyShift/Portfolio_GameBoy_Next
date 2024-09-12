import WineBorder from "./G-Wine/WineBorder";

export default function G_Cream({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-cream z-30 w-full h-full relative top-[3%] rounded-xl sm:rounded-3xl flex justify-center items-center shadow-[0_0.4rem_0.2rem_-0.2rem_rgba(0,0,0,0.5)]">
			<WineBorder>
				{children}
			</WineBorder>
		</div>
	);
}