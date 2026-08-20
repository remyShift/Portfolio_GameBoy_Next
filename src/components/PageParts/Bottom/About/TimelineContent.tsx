import { useTranslations } from "next-intl";
import { FaYoutube } from "react-icons/fa";

interface TimelineContentProps {
	title: string;
	date: string;
	description: string;
	videoUrl?: string;
}

export default function TimelineContent({ title, date, description, videoUrl }: TimelineContentProps) {
	const t = useTranslations("about");

	return (
		<div className="ml-6 flex flex-col w-full md:max-w-lg border-[#C6AF87] border-2 rounded-xl bg-wine p-4 md:p-6 shadow-lg shadow-black/30">
			<div className="mb-4 flex justify-between gap-4">
				<p
					className="text-sm md:text-lg lg:text-xl font-gillSans font-bold text-white"
				>
					{title}
				</p>
				<p
					className="text-xs md:text-base lg:text-lg font-gillSans italic text-white"
				>
					{date}
				</p>
			</div>
			<p className="mb-6 text-white font-gillSans text-xs lg:text-base">
				{description}
			</p>
			{videoUrl && (
				<a
					href={videoUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="flex items-center gap-2 self-start py-1.5 font-gillSans text-xs lg:text-base text-[#C6AF87] hover:underline"
				>
					<FaYoutube aria-hidden="true" className="shrink-0 text-base lg:text-xl" />
					{t("watchTalk")}
				</a>
			)}
		</div>
	);
}
