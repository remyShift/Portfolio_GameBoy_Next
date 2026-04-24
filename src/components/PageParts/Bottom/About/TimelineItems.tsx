import TimelineIcon from './TimelineIcon';
import TimelineContent from './TimelineContent';

interface TimelineItemProps {
	title: string;
	date: string;
	description: string;
}

export default function TimelineItems({ title, date, description }: TimelineItemProps) {
	return (
		<li>
			<ul className="mb-44">
				<TimelineIcon />
				<TimelineContent title={title} date={date} description={description} />
			</ul>
		</li>
	);
}