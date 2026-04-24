import type { Locale } from "./locale";

export type TimelineI18n = {
	title: string;
	description: string;
};

export type TimelineEntry = {
	id: string;
	date: string;
	i18n: Record<Locale, TimelineI18n>;
};

export type TimelineItem = {
	id: string;
	title: string;
	date: string;
	description: string;
};
