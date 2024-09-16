import TopScreen from "./TopScreen";
import BackgroundSign from "./BackgroundSign";
import BottomScreen from "./BottomScreen";

export default function GreyScreenInfo({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col h-full">
			<TopScreen />
			{children}
			<BottomScreen />
		</div>
	);
}