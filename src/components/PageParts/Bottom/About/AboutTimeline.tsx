import TimelineItems from './TimelineItems';
import Spacer from "../Spacer";
import LightButton from "@/components/gameboy/bottom/LightButton";
import Lights from "@/components/gameboy/bottom/Lights";
import SelectStart from "@/components/gameboy/bottom/SelectStart";
import Divider from "../Projects/Divider";
import { useLocale } from "next-intl";
import { getLocalizedTimeline } from "@/lib/localizedContent";
import type { Locale } from "@/types/locale";

export default function AboutTimeline() {
	const locale = useLocale() as Locale;
	const timeline = getLocalizedTimeline(locale);

	return (
		<div className="w-full h-full flex flex-row  pt-4">
			<Spacer />
			<div className="w-full flex flex-col justify-center items-center">
				<LightButton />
				<ol className="h-[85%] w-[85%] md:w-auto pt-40 border-l-2 border-wine mx-auto mb-10">
					{timeline.map((item) => (
						<TimelineItems key={item.id} title={item.title} date={item.date} description={item.description} />
					))}
				</ol>
				<Divider onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
					⬆︎
				</Divider>
				<SelectStart />
			</div>
			<Lights />
		</div>
	);
}
