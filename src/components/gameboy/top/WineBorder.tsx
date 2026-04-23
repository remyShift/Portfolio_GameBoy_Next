import Screen from "../screen/Screen";
import WineBorderText from "./WineBorderText";

export default function WineBorder({ children }: { children: React.ReactNode }) {
	return (
		<div className="z-2 bg-wine w-[95%] h-[95%] sm:h-[90%] md:w-[90%] flex flex-col justify-end items-center rounded-t-2xl rounded-b-xl sm:rounded-t-3xl md:rounded-t-4xl lg:rounded-t-[3rem] md:rounded-b-2xl lg:rounded-b-3xl shadow-[inset_0_6px_10px_-2px_rgba(0,0,0,0.45),inset_0_-3px_6px_-1px_rgba(255,255,255,0.06)]">
			<Screen>
				{children}
			</Screen>
			<WineBorderText />
		</div>
	);
}
