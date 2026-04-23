import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
	usePointerParallax,
	computeParallax,
} from "./usePointerParallax";

describe("computeParallax", () => {
	it("returns {0,0} when cursor is at viewport center", () => {
		expect(computeParallax(500, 400, 1000, 800)).toEqual({ x: 0, y: 0 });
	});

	it("returns {-1,-1} at the top-left corner", () => {
		expect(computeParallax(0, 0, 1000, 800)).toEqual({ x: -1, y: -1 });
	});

	it("returns {1,1} at the bottom-right corner", () => {
		expect(computeParallax(1000, 800, 1000, 800)).toEqual({ x: 1, y: 1 });
	});

	it("returns {-1,0} at left-center", () => {
		expect(computeParallax(0, 400, 1000, 800)).toEqual({ x: -1, y: 0 });
	});
});


describe("usePointerParallax (mouse)", () => {
	const originalMatchMedia = window.matchMedia;
	let rafCallbacks: FrameRequestCallback[] = [];

	beforeEach(() => {
		rafCallbacks = [];
		vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
			rafCallbacks.push(cb);
			return rafCallbacks.length;
		});
		vi.stubGlobal("cancelAnimationFrame", () => {});
		Object.defineProperty(window, "innerWidth", { value: 1000, writable: true, configurable: true });
		Object.defineProperty(window, "innerHeight", { value: 800, writable: true, configurable: true });
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		window.matchMedia = originalMatchMedia;
	});

	function mockMediaQueries({
		reducedMotion = false,
		hover = true,
	}: { reducedMotion?: boolean; hover?: boolean }) {
		window.matchMedia = vi.fn().mockImplementation((query: string) => {
			if (query.includes("prefers-reduced-motion")) {
				return matchMediaResult(reducedMotion, query);
			}
			if (query.includes("hover")) {
				return matchMediaResult(hover, query);
			}
			return matchMediaResult(false, query);
		}) as unknown as typeof window.matchMedia;
	}

	function matchMediaResult(matches: boolean, media: string) {
		return {
			matches,
			media,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
			onchange: null,
		};
	}

	function flushRaf() {
		const cbs = rafCallbacks;
		rafCallbacks = [];
		cbs.forEach((cb) => cb(0));
	}

	it("starts at {0,0}", () => {
		mockMediaQueries({ hover: true });
		const { result } = renderHook(() => usePointerParallax());
		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("updates on mousemove after rAF flush", () => {
		mockMediaQueries({ hover: true });
		const { result } = renderHook(() => usePointerParallax());

		act(() => {
			window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1000, clientY: 800 }));
			flushRaf();
		});

		expect(result.current).toEqual({ x: 1, y: 1 });
	});

	it("does not update when prefers-reduced-motion is reduce", () => {
		mockMediaQueries({ hover: true, reducedMotion: true });
		const { result } = renderHook(() => usePointerParallax());

		act(() => {
			window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1000, clientY: 800 }));
			flushRaf();
		});

		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("removes listener on unmount", () => {
		mockMediaQueries({ hover: true });
		const removeSpy = vi.spyOn(window, "removeEventListener");
		const { unmount } = renderHook(() => usePointerParallax());
		unmount();
		expect(removeSpy).toHaveBeenCalledWith("mousemove", expect.any(Function));
	});
});

describe("usePointerParallax (touch device)", () => {
	const originalMatchMedia = window.matchMedia;

	afterEach(() => {
		vi.unstubAllGlobals();
		window.matchMedia = originalMatchMedia;
	});

	function mockTouchDevice() {
		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
			onchange: null,
		})) as unknown as typeof window.matchMedia;
	}

	it("stays at {0,0} and never attaches any listener", () => {
		mockTouchDevice();
		const addSpy = vi.spyOn(window, "addEventListener");
		const { result } = renderHook(() => usePointerParallax());
		expect(result.current).toEqual({ x: 0, y: 0 });
		expect(addSpy).not.toHaveBeenCalledWith("mousemove", expect.any(Function), expect.anything());
		expect(addSpy).not.toHaveBeenCalledWith("deviceorientation", expect.any(Function), expect.anything());
	});
});
