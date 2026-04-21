import { describe, it, expect, beforeEach, vi } from "vitest";

async function freshCheck() {
	vi.resetModules();
	const mod = await import("./rateLimit");
	return mod.checkRateLimit;
}

describe("checkRateLimit", () => {
	beforeEach(() => {
		vi.useRealTimers();
	});

	it("allows requests under the limit", async () => {
		const check = await freshCheck();
		expect(check("ip1", 3, 60_000).ok).toBe(true);
		expect(check("ip1", 3, 60_000).ok).toBe(true);
		expect(check("ip1", 3, 60_000).ok).toBe(true);
	});

	it("blocks the request that exceeds the limit and reports retry-after", async () => {
		const check = await freshCheck();
		check("ip2", 2, 60_000);
		check("ip2", 2, 60_000);
		const blocked = check("ip2", 2, 60_000);
		expect(blocked.ok).toBe(false);
		expect(blocked.retryAfterSec).toBeGreaterThan(0);
	});

	it("resets after the window elapses", async () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
		const check = await freshCheck();
		check("ip3", 1, 1_000);
		expect(check("ip3", 1, 1_000).ok).toBe(false);
		vi.advanceTimersByTime(1_500);
		expect(check("ip3", 1, 1_000).ok).toBe(true);
	});

	it("tracks separate keys independently", async () => {
		const check = await freshCheck();
		check("ipA", 1, 60_000);
		expect(check("ipA", 1, 60_000).ok).toBe(false);
		expect(check("ipB", 1, 60_000).ok).toBe(true);
	});
});
