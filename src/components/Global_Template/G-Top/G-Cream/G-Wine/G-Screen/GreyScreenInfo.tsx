import TopScreen from "./TopScreen";
import BackgroundSign from "./BackgroundSign";
import BottomScreen from "./BottomScreen";

export default function GreyScreenInfo() {
	return (
		<div className="flex flex-col h-full">
			<TopScreen />
			<BackgroundSign />
			<BottomScreen />
		</div>
	);
}