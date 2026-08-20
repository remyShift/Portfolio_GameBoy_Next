import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import projectsData from "./projects.json";
import timelineData from "./aboutTimeline.json";
import { routing } from "@/i18n/routing";

const REQUIRED_LOCALES = routing.locales;

// Why: ProjectStacks builds its icon path by interpolation, so a stack declared
// here without a matching asset only fails as a silent 404 in the browser.
const STACK_ICONS_DIRECTORY = join(process.cwd(), "public/assets/img/stacks");

describe("projects.json structure", () => {
	it.each(projectsData.projects)("project '$id' provides all required locales", (project) => {
		REQUIRED_LOCALES.forEach((locale) => {
			expect(project.i18n).toHaveProperty(locale);
			expect(project.i18n[locale as keyof typeof project.i18n].name).toBeTruthy();
			expect(project.i18n[locale as keyof typeof project.i18n].description).toBeTruthy();
		});
	});

	it("each project has a unique id", () => {
		const ids = projectsData.projects.map((p) => p.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	const referencedStacks = [...new Set(projectsData.projects.flatMap((project) => project.stacks))];

	it.each(referencedStacks)("stack '%s' has a matching icon asset", (stack) => {
		expect(existsSync(join(STACK_ICONS_DIRECTORY, `${stack}.webp`))).toBe(true);
	});
});

describe("aboutTimeline.json structure", () => {
	it.each(timelineData.timeline)("timeline entry '$id' provides all required locales", (entry) => {
		REQUIRED_LOCALES.forEach((locale) => {
			expect(entry.i18n).toHaveProperty(locale);
			expect(entry.i18n[locale as keyof typeof entry.i18n].title).toBeTruthy();
			expect(entry.i18n[locale as keyof typeof entry.i18n].description).toBeTruthy();
		});
	});

	it("each timeline entry has a unique id", () => {
		const ids = timelineData.timeline.map((t) => t.id);
		expect(new Set(ids).size).toBe(ids.length);
	});
});
