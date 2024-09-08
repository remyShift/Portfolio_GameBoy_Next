import GreyScreen from "./G-Screen/GreyScreen";
import TextBorderWine from "./TextBorderWine";

export default function WineBorder({ children }: { children: React.ReactNode }) {
	return (
		<div className="z-2 bg-wine w-[95%] h-[89%] flex flex-col justify-end items-center rounded-t-[1.7rem] rounded-b-xl">
			<GreyScreen>
				{children}
			</GreyScreen>
			<TextBorderWine />
		</div>
	);
}