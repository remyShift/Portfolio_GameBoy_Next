import WineBorder from "./WineBorder";

export default function CreamFrame({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-cream z-30 w-full h-full relative top-[3%] rounded-xl sm:rounded-3xl md:rounded-[2.5rem] flex justify-center items-center shadow-shadowTop">
			<WineBorder>
				{children}
			</WineBorder>
		</div>
	);
}