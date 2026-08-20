import { VALID_PATHS } from "./validPaths";

type ValidPath = (typeof VALID_PATHS)[number];

export const PAGE_TRACKS: Readonly<Record<ValidPath, string>> = {
	"/": "/music/home.mp3",
	"/about": "/music/about.mp3",
	"/contact": "/music/contact.mp3",
	"/projects": "/music/projects.mp3",
	"/projects/fun-stats": "/music/fun-stats.mp3",
	"/settings": "/music/settings.mp3",
};

function normalizePathname(pathname: string): string {
	if (pathname.length > 1 && pathname.endsWith("/")) {
		return pathname.slice(0, -1);
	}
	return pathname;
}

export function getTrackForPathname(pathname: string): string | null {
	const normalized = normalizePathname(pathname);
	const match = VALID_PATHS.find((path) => path === normalized);
	return match ? PAGE_TRACKS[match] : null;
}
