import TimelineIcon from './TimelineIcon';
import TimelineContent from './TimelineContent';

interface TimelineItemProps {
	title: string;
	date: string;
	description: string;
	videoUrl?: string;
}

export default function TimelineItems({ title, date, description, videoUrl }: TimelineItemProps) {
	return (
		<li>
			<ul className="mb-44">
				<TimelineIcon />
				<TimelineContent title={title} date={date} description={description} videoUrl={videoUrl} />
			</ul>
		</li>
	);
}
