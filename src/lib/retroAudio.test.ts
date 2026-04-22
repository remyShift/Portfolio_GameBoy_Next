import { describe, it, expect } from "vitest";
import { isTargetNavigableForClickSound } from "./retroAudio";

describe("isTargetNavigableForClickSound", () => {
	it("returns true for a link", () => {
		const a = document.createElement("a");
		a.setAttribute("href", "/x");
		expect(isTargetNavigableForClickSound(a)).toBe(true);
	});

	it("returns false when target is not an element", () => {
		expect(isTargetNavigableForClickSound(null)).toBe(false);
	});

	it("returns false for hidden input", () => {
		const input = document.createElement("input");
		input.type = "hidden";
		expect(isTargetNavigableForClickSound(input)).toBe(false);
	});

	it("returns false when ancestor has data-no-sound", () => {
		const wrap = document.createElement("div");
		wrap.setAttribute("data-no-sound", "");
		const button = document.createElement("button");
		wrap.appendChild(button);
		expect(isTargetNavigableForClickSound(button)).toBe(false);
	});
});
