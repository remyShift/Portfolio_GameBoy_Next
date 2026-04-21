import LightButton from "@/components/gameboy/bottom/LightButton";
import SelectStart from "@/components/gameboy/bottom/SelectStart";
import Lights from "@/components/gameboy/bottom/Lights";
import StacksList from "./Stacks/StacksList";
import Divider from "./Divider";
import Spacer from "../Spacer";
import ProjectsList from "./ProjectsList";

export default function ProjectsBot() {
	return (
		<div className="w-full h-full flex flex-row pt-2">
			<Spacer />
			<div className="w-full flex flex-col justify-start items-center">
				<LightButton />

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

				<SelectStart />
			</div>
			<Lights />
		</div>
	);
}
