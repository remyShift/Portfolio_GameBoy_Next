import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PageTitle from "./PageTitle";

describe("PageTitle", () => {
	it("rend un <h1> sémantique", () => {
		const { container } = render(<PageTitle className="">Titre</PageTitle>);
		expect(container.querySelector("h1")).not.toBeNull();
	});

	it("rend les children passés", () => {
		const { getByRole } = render(<PageTitle className="">Mon titre</PageTitle>);
		expect(getByRole("heading", { level: 1 })).toHaveTextContent("Mon titre");
	});

	it("applique toujours les classes de base invariantes", () => {
		const { getByRole } = render(<PageTitle className="">Titre</PageTitle>);
		const h1 = getByRole("heading", { level: 1 });
		expect(h1.className).toContain("font-pressStart2P");
		expect(h1.className).toContain("text-pretty");
		expect(h1.className).toContain("text-center");
		expect(h1.className).toContain("shrink-0");
	});

	it("ajoute les classes passées via className", () => {
		const { getByRole } = render(
			<PageTitle className="pt-6 text-xs sm:text-base md:text-2xl">Titre</PageTitle>
		);
		const h1 = getByRole("heading", { level: 1 });
		expect(h1.className).toContain("pt-6");
		expect(h1.className).toContain("text-xs");
		expect(h1.className).toContain("sm:text-base");
		expect(h1.className).toContain("md:text-2xl");
	});

	it("conserve les classes de base quand className est fourni", () => {
		const { getByRole } = render(
			<PageTitle className="pt-4 text-xs">Titre</PageTitle>
		);
		const h1 = getByRole("heading", { level: 1 });
		expect(h1.className).toContain("font-pressStart2P");
		expect(h1.className).toContain("shrink-0");
		expect(h1.className).toContain("pt-4");
	});
});
