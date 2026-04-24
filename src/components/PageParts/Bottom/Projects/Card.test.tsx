import { describe, it, expect } from "vitest";
import { stacksClass } from "./Card";

describe("stacksClass", () => {
	it("returns the wider lua variant when first stack is lua", () => {
		expect(stacksClass(["lua"])).toContain("w-[8%]");
		expect(stacksClass(["lua"])).toContain("md:w-[30%]");
	});

	it("returns the default variant for a non-lua stack", () => {
		expect(stacksClass(["react"])).toContain("w-[7%]");
		expect(stacksClass(["react"])).not.toContain("md:w-[30%]");
	});

	it("falls back to default for an unknown stack", () => {
		expect(stacksClass(["rust"])).toContain("w-[7%]");
	});

	it("falls back to default for an empty stacks array", () => {
		expect(stacksClass([])).toContain("w-[7%]");
	});

	it("only considers the first stack", () => {
		expect(stacksClass(["react", "lua"])).toContain("w-[7%]");
	});

	it("always includes the shared object-contain suffix", () => {
		expect(stacksClass(["lua"])).toContain("object-contain");
		expect(stacksClass(["react"])).toContain("object-contain");
		expect(stacksClass([])).toContain("object-contain");
	});
});
