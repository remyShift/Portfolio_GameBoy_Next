import { describe, it, expect } from "vitest";
import fr from "../../messages/fr.json";
import en from "../../messages/en.json";

function collectKeys(value: unknown, prefix = ""): string[] {
	if (value === null || typeof value !== "object" || Array.isArray(value)) {
		return [prefix];
	}
	return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
		collectKeys(child, prefix ? `${prefix}.${key}` : key),
	);
}

describe("messages parity", () => {
	it("fr and en share the exact same key set", () => {
		const frKeys = collectKeys(fr).sort();
		const enKeys = collectKeys(en).sort();
		expect(enKeys).toEqual(frKeys);
	});
});
