import { describe, it, expect } from "vitest";
import projectsData from "./projects.json";
import timelineData from "./aboutTimeline.json";
import { routing } from "@/i18n/routing";

const REQUIRED_LOCALES = routing.locales;

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
