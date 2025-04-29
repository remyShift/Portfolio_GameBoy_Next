import TimelineItems from './TimelineItems';
import Spacer from "../Spacer";
import Light_Btn from "../../../Global_Template/G-Bottom/Buttons/Light_Btn";
import Lights from "../../../Global_Template/G-Bottom/Buttons/Lights";
import SelectSpeakers_Btn from "../../../Global_Template/G-Bottom/Buttons/SelectSpeakers_Btn";
import Divider from "../Projects/Divider";
import timelineData from '../../../../utils/aboutTimeline.json';

export default function AboutTimeline() {
	return (
		<div className="w-full h-full flex flex-row  pt-4">
			<Spacer />
			<div className="w-full flex flex-col justify-center items-center">
				<Light_Btn />
				<ol className="h-[85%] w-[85%] md:w-auto pt-40 border-l-2 border-wine mx-auto mb-10">
					{timelineData.timeline.map((item, index) => (
						<TimelineItems key={index} {...item} />
					))}
				</ol>
				<Divider onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					⬆︎
				</Divider>
				<SelectSpeakers_Btn />
			</div>
			<Lights />
		</div>
	);
}