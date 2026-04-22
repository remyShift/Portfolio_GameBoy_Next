import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { buildBreadcrumb } from "./navigation";

vi.mock("@/i18n/navigation", () => ({
	Link: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
		<a href={href} className={className}>{children}</a>
	),
}));

const HOME_LABEL = "@ACCUEIL";

function renderBreadcrumb(path: string) {
	return render(<>{buildBreadcrumb(path, HOME_LABEL)}</>);
}

describe("buildBreadcrumb", () => {
	it("renders only home label for '/'", () => {
		renderBreadcrumb("/");
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(1);
		expect(links[0]).toHaveTextContent("@ACCUEIL");
		expect(links[0]).toHaveAttribute("href", "/");
	});

	it("renders home + uppercase segment for a known route", () => {
		renderBreadcrumb("/about");
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveTextContent("@ACCUEIL");
		expect(links[0]).toHaveAttribute("href", "/");
		expect(links[1]).toHaveTextContent("ABOUT");
		expect(links[1]).toHaveAttribute("href", "/about");
	});

	it("renders a nested known route with full path check", () => {
		renderBreadcrumb("/projects/fun-stats");
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(3);
		expect(links[1]).toHaveTextContent("PROJECTS");
		expect(links[2]).toHaveTextContent("FUN-STATS");
		expect(links[2]).toHaveAttribute("href", "/projects/fun-stats");
	});

	it("marks unknown routes as 404", () => {
		renderBreadcrumb("/doesnotexist");
		const links = screen.getAllByRole("link");
		expect(links[1]).toHaveTextContent("404");
	});
});
