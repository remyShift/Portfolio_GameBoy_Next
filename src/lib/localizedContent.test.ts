import { describe, it, expect, vi } from "vitest";
import {
	localizeProjects,
	localizeTimeline,
} from "./localizedContent";
import type { ProjectEntry } from "@/types/project";
import type { TimelineEntry } from "@/types/timeline";

const projectsFixture: ProjectEntry[] = [
	{
		id: "alpha",
		image: "/img/alpha.png",
		stacks: ["react"],
		link: "https://alpha.test",
		i18n: {
			fr: { name: "Alpha FR", description: "Description FR alpha" },
			en: { name: "Alpha EN", description: "Description EN alpha" },
		},
	},
];

const timelineFixture: TimelineEntry[] = [
	{
		id: "step-1",
		date: "01 / 2024",
		i18n: {
			fr: { title: "Étape 1", description: "Première étape" },
			en: { title: "Step 1", description: "First step" },
		},
	},
];

describe("localizeProjects", () => {
	it("flattens FR strings into the project shape", () => {
		const projects = localizeProjects(projectsFixture, "fr");
		expect(projects).toEqual([
			{
				id: "alpha",
				image: "/img/alpha.png",
				stacks: ["react"],
				link: "https://alpha.test",
				name: "Alpha FR",
				description: "Description FR alpha",
			},
		]);
	});

	it("flattens EN strings into the project shape", () => {
		const projects = localizeProjects(projectsFixture, "en");
		expect(projects[0].name).toBe("Alpha EN");
		expect(projects[0].description).toBe("Description EN alpha");
	});

	it("falls back to fr when an entry is missing the requested locale", () => {
		const partial = [
			{
				...projectsFixture[0],
				i18n: { fr: projectsFixture[0].i18n.fr },
			},
		] as ProjectEntry[];
		const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		const projects = localizeProjects(partial, "en");
		expect(projects[0].name).toBe("Alpha FR");
		consoleSpy.mockRestore();
	});

	it("preserves the input order", () => {
		const entries: ProjectEntry[] = [
			{ ...projectsFixture[0], id: "z" },
			{ ...projectsFixture[0], id: "a" },
		];
		expect(localizeProjects(entries, "fr").map((p) => p.id)).toEqual(["z", "a"]);
	});
});

describe("localizeTimeline", () => {
	it("flattens FR strings into the timeline item shape", () => {
		const items = localizeTimeline(timelineFixture, "fr");
		expect(items).toEqual([
			{
				id: "step-1",
				date: "01 / 2024",
				title: "Étape 1",
				description: "Première étape",
			},
		]);
	});

	it("flattens EN strings into the timeline item shape", () => {
		const items = localizeTimeline(timelineFixture, "en");
		expect(items[0].title).toBe("Step 1");
		expect(items[0].description).toBe("First step");
	});

	it("falls back to fr when an entry is missing the requested locale", () => {
		const partial = [
			{
				...timelineFixture[0],
				i18n: { fr: timelineFixture[0].i18n.fr },
			},
		] as TimelineEntry[];
		const consoleSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
		const items = localizeTimeline(partial, "en");
		expect(items[0].title).toBe("Étape 1");
		consoleSpy.mockRestore();
	});
});
