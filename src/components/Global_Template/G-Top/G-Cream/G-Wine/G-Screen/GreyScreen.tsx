import TopScreen from "./TopScreen";
import BottomScreen from "./BottomScreen";

export default function GreyScreen({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-greyScreen h-[89%] w-[94%] sm:h-[91%] lg:h-[88%] sm:w-[95%] flex flex-col rounded-xl md:rounded-2x shadow-[inset_0_0_0.5rem_0.18rem_#363636]">
			<TopScreen />
			{children}
			<BottomScreen />
		</div>
	);
}