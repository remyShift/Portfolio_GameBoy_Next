import Light_Btn from "../../../Global_Template/G-Bottom/Buttons/Light_Btn";
import SelectSpeakers_Btn from "../../../Global_Template/G-Bottom/Buttons/SelectSpeakers_Btn";
import Lights from "../../../Global_Template/G-Bottom/Buttons/Lights";
import StacksList from "./Stacks/StacksList";
import Divider from "./Divider";

export default function ProjectsList() {
	return (
		<div className="w-full h-[95%] flex flex-row">
			<div className="w-full flex flex-col justify-center items-center">
				<Light_Btn />
				<Divider>
					Stacks
				</Divider>
				<StacksList />
				<Divider>
					Projects
				</Divider>
				{/* <Card /> */}
				<SelectSpeakers_Btn />
			</div>
			<Lights />
		</div>
	);
}