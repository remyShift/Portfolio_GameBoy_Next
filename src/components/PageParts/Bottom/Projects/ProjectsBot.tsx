import Light_Btn from "../../../Global_Template/G-Bottom/Buttons/Light_Btn";
import SelectSpeakers_Btn from "../../../Global_Template/G-Bottom/Buttons/SelectSpeakers_Btn";
import Lights from "../../../Global_Template/G-Bottom/Buttons/Lights";
import StacksList from "./Stacks/StacksList";
import Divider from "./Divider";
import Spacer from "../Spacer";
import ProjectsList from "./ProjectsList";

export default function ProjectsBot() {
	return (
		<div className="w-full h-full flex flex-row pt-2">
			<Spacer />
			<div className="w-full flex flex-col justify-start items-center">
				<Light_Btn />

				<Divider>
					Stacks
				</Divider>

				<StacksList />

				<Divider>
					Projects
				</Divider>

				<ProjectsList />

				<Divider onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					<p className="bounce">⬆︎</p>
				</Divider>

				<SelectSpeakers_Btn />
			</div>
			<Lights />
		</div>
	);
}