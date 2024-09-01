import GreyScreen from "./G-Screen/GreyScreen";
import TextBorderWine from "./TextBorderWine";

export default function WineBorder() {
	return (
		<div className="z-2 bg-wine w-[90%] h-[89%] flex flex-col justify-end items-center rounded-t-[1.7rem] rounded-b-xl">
			<GreyScreen />
			<TextBorderWine />
		</div>
	);
}