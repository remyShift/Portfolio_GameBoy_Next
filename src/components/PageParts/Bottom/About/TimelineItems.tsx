import TimelineIcon from './TimelineIcon';
import TimelineCard from './TimelineCard';

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
				<TimelineCard title={title} date={date} description={description} />
			</ul>
		</li>
	);
}