import { useTranslations } from "next-intl";
import PageTitle from "@/components/PageParts/Top/PageTitle";

const LEFT_ENTRIES = [
	{ key: "demos", count: 9, hideOnMobile: false },
	{ key: "xp", count: 1603, hideOnMobile: false },
	{ key: "push", count: 129, hideOnMobile: true },
	{ key: "commits", count: 129, hideOnMobile: false },
] as const;

const RIGHT_ENTRIES = [
	{ key: "bugs", count: 209, hideOnMobile: false },
	{ key: "tests", count: 452, hideOnMobile: false },
	{ key: "days", count: 751, hideOnMobile: true },
	{ key: "projects", count: 12, hideOnMobile: false },
] as const;

const ITEM_BASE_CLASS = "font-pressStart2P text-[0.6rem] sm:text-sm md:text-base lg:text-lg";

export default function FunStats() {
	const t = useTranslations("funStats");

	return (
		<div className="flex flex-col w-full h-full">
			<PageTitle className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 text-xs sm:text-base md:text-2xl lg:text-3xl">{t("title")}</PageTitle>

			<div className="flex flex-row flex-1 min-h-0 w-full">
				<ul className="flex flex-col justify-center w-1/3 gap-3 sm:gap-6 md:gap-10 lg:gap-14">
					{LEFT_ENTRIES.map(({ key, count, hideOnMobile }) => (
						<li
							key={key}
							className={`${ITEM_BASE_CLASS} ml-2 md:ml-4 lg:ml-6 ${hideOnMobile ? "hidden md:block" : ""}`}
						>
							{t(`entries.${key}`, { count })}
						</li>
					))}
				</ul>

				<div className="w-1/3" aria-hidden="true" />

				<ul className="flex flex-col justify-center items-end w-1/3 gap-4 sm:gap-6 md:gap-10 lg:gap-14">
					{RIGHT_ENTRIES.map(({ key, count, hideOnMobile }) => (
						<li
							key={key}
							className={`${ITEM_BASE_CLASS} mr-2 md:mr-4 lg:mr-6 ${hideOnMobile ? "hidden md:block" : ""}`}
						>
							{t(`entries.${key}`, { count })}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
