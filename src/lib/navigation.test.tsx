import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { buildBreadcrumb } from "./navigation";

function renderBreadcrumb(path: string) {
	return render(<>{buildBreadcrumb(path)}</>);
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

	it("marks unknown routes as 404", () => {
		renderBreadcrumb("/doesnotexist");
		const links = screen.getAllByRole("link");
		expect(links[1]).toHaveTextContent("404");
	});
});
