import Screen from "../screen/Screen";
import WineBorderText from "./WineBorderText";

export default function WineBorder({ children }: { children: React.ReactNode }) {
	return (
		<div className="z-2 bg-wine w-[95%] h-[95%] sm:h-[90%] md:w-[90%] flex flex-col justify-end items-center rounded-t-2xl rounded-b-xl sm:rounded-t-3xl md:rounded-t-[2rem] lg:rounded-t-[3rem] md:rounded-b-2xl lg:rounded-b-3xl">
			<Screen>
				{children}
			</Screen>
			<WineBorderText />
		</div>
	);
}