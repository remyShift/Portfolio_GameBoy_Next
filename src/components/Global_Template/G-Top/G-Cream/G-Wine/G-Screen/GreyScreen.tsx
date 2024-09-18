import TopScreen from "./TopScreen";
import BottomScreen from "./BottomScreen";
import "./GreyScreen.css";

export default function GreyScreen({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-greyScreen relative h-[89%] w-[94%] sm:h-[87%] md:h-[91%] lg:h-[88%] sm:w-[95%] flex flex-col rounded-xl md:rounded-2x shadow-[inset_0_0_0.5rem_0.18rem_#363636]">
			<span className="noise-animation"></span>
			<TopScreen />
			{children}
			<BottomScreen />
		</div>
	);
}