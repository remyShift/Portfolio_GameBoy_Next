import GreyScreen from "./G-Screen/GreyScreen";
import TextBorderWine from "./TextBorderWine";

export default function WineBorder({ children }: { children: React.ReactNode }) {
	return (
		<div className="z-2 bg-wine w-[95%] h-[95%] sm:h-[90%] flex flex-col justify-end items-center rounded-t-2xl sm:rounded-t-3xl rounded-b-xl md:rounded-t-[3rem] md:rounded-b-2xl">
			<GreyScreen>
				{children}
			</GreyScreen>
			<TextBorderWine />
		</div>
	);
}