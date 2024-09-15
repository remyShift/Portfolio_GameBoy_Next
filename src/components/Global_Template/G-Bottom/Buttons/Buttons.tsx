import Arrow_Btn from "./Arrow_Btn";
import AB_Btn from "./AB_Btn";
import Light_Btn from "./Light_Btn";
import SelectSpeakers_Btn from "./SelectSpeakers_Btn";
import Lights from "./Lights/Lights";

export default function Buttons() {
	return (
		<div className="w-full h-[95%] flex flex-row">
			<Arrow_Btn />
			<div className="w-[40%] h-full flex flex-col items-center space-between">
				<Light_Btn />
				<SelectSpeakers_Btn />
			</div>
			<AB_Btn />
			<Lights />
		</div>
	);
}