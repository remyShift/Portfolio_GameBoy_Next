import { useTranslations } from "next-intl";

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
		<div className="relative flex flex-row w-full h-full">
			<h1 className="font-pressStart2P text-pretty text-center absolute left-1/2 -translate-x-1/2 w-[90%] top-10 md:top-16 lg:top-18 xl:top-18 text-xs sm:text-base md:text-2xl lg:text-3xl z-1">{t("title")}</h1>

			<ul className="flex flex-col justify-center w-1/3 h-full gap-3 sm:gap-6 md:gap-10 lg:gap-14 mt-4">
				{LEFT_ENTRIES.map(({ key, count, hideOnMobile }) => (
					<li
						key={key}
						className={`${ITEM_BASE_CLASS} ml-2 md:ml-4 lg:ml-6 ${hideOnMobile ? "hidden md:block" : ""}`}
					>
						{t(`entries.${key}`, { count })}
					</li>
				))}
			</ul>

			<div className="w-1/3 h-full" aria-hidden="true" />

			<ul className="flex flex-col justify-center items-end w-1/3 h-full gap-4 sm:gap-6 md:gap-10 lg:gap-14 mt-4">
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
	);
}
