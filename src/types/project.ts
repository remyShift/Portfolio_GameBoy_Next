import type { Locale } from "./locale";

export type ProjectI18n = {
	name: string;
	description: string;
};

export type ProjectEntry = {
	id: string;
	image: string;
	stacks: string[];
	link: string;
	i18n: Record<Locale, ProjectI18n>;
};

export type Project = {
	id: string;
	name: string;
	description: string;
	image: string;
	stacks: string[];
	link: string;
};
