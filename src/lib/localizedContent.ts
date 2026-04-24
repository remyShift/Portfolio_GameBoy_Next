import projectsData from "@/content/projects.json";
import timelineData from "@/content/aboutTimeline.json";
import type { Project, ProjectEntry, ProjectI18n } from "@/types/project";
import type { TimelineEntry, TimelineI18n, TimelineItem } from "@/types/timeline";
import { FALLBACK_LOCALE, type Locale } from "@/types/locale";

function pickLocaleStrings<T>(
	i18n: Partial<Record<Locale, T>>,
	locale: Locale,
	context: string,
): T {
	const localized = i18n[locale];
	if (localized) return localized;

	const fallback = i18n[FALLBACK_LOCALE];
	if (fallback) {
		console.warn(`Missing "${locale}" translation for ${context}, falling back to "${FALLBACK_LOCALE}".`);
		return fallback;
	}

	throw new Error(`No translations available for ${context}.`);
}

export function localizeProjects(entries: ProjectEntry[], locale: Locale): Project[] {
	return entries.map((entry) => {
		const { name, description } = pickLocaleStrings<ProjectI18n>(
			entry.i18n,
			locale,
			`project "${entry.id}"`,
		);
		return {
			id: entry.id,
			image: entry.image,
			stacks: entry.stacks,
			link: entry.link,
			name,
			description,
		};
	});
}

export function localizeTimeline(entries: TimelineEntry[], locale: Locale): TimelineItem[] {
	return entries.map((entry) => {
		const { title, description } = pickLocaleStrings<TimelineI18n>(
			entry.i18n,
			locale,
			`timeline entry "${entry.id}"`,
		);
		return {
			id: entry.id,
			date: entry.date,
			title,
			description,
		};
	});
}

export function getLocalizedProjects(locale: Locale): Project[] {
	return localizeProjects(projectsData.projects as ProjectEntry[], locale);
}

export function getLocalizedTimeline(locale: Locale): TimelineItem[] {
	return localizeTimeline(timelineData.timeline as TimelineEntry[], locale);
}
