import Light_Btn from "../../../Global_Template/G-Bottom/Buttons/Light_Btn";
import SelectSpeakers_Btn from "../../../Global_Template/G-Bottom/Buttons/SelectSpeakers_Btn";
import Lights from "../../../Global_Template/G-Bottom/Buttons/Lights";
import Card from "./Card";
import StacksList from "./Stacks/StacksList";

export default function ProjectsList() {
	return (
		<div className="w-full h-[95%] flex flex-row">
			<div className="w-full h-full flex flex-col justify-center items-center">
				<Light_Btn />
				<StacksList />
				{/* <Card /> */}
				<SelectSpeakers_Btn />
			</div>
			<Lights />
		</div>
	);
}