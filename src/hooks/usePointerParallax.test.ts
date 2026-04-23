import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
	usePointerParallax,
	computeParallax,
	computeOrientationParallax,
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

describe("computeOrientationParallax", () => {
	const origin = { beta: 45, gamma: 10 };
	const rangeDeg = 20;

	it("returns {0,0} when reading equals origin", () => {
		expect(computeOrientationParallax(45, 10, origin, rangeDeg)).toEqual({ x: 0, y: 0 });
	});

	it("returns {1,0} when gamma is at the positive edge of range", () => {
		const { x, y } = computeOrientationParallax(45, 30, origin, rangeDeg);
		expect(x).toBeCloseTo(1, 5);
		expect(y).toBeCloseTo(0, 5);
	});

	it("returns {-1,0} when gamma is at the negative edge of range", () => {
		const { x, y } = computeOrientationParallax(45, -10, origin, rangeDeg);
		expect(x).toBeCloseTo(-1, 5);
		expect(y).toBeCloseTo(0, 5);
	});

	it("returns {0,1} when beta is at the positive edge of range", () => {
		const { x, y } = computeOrientationParallax(65, 10, origin, rangeDeg);
		expect(x).toBeCloseTo(0, 5);
		expect(y).toBeCloseTo(1, 5);
	});

	it("clamps to 1 when gamma exceeds positive range", () => {
		const { x } = computeOrientationParallax(45, 90, origin, rangeDeg);
		expect(x).toBe(1);
	});

	it("clamps to -1 when beta falls below negative range", () => {
		const { y } = computeOrientationParallax(-90, 10, origin, rangeDeg);
		expect(y).toBe(-1);
	});

	it("returns {0,0} when origin is null", () => {
		expect(computeOrientationParallax(50, 30, null, rangeDeg)).toEqual({ x: 0, y: 0 });
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

describe("usePointerParallax (orientation)", () => {
	const originalMatchMedia = window.matchMedia;
	const originalDOE = (globalThis as unknown as { DeviceOrientationEvent?: unknown }).DeviceOrientationEvent;
	let rafCallbacks: FrameRequestCallback[] = [];

	beforeEach(() => {
		rafCallbacks = [];
		vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
			rafCallbacks.push(cb);
			return rafCallbacks.length;
		});
		vi.stubGlobal("cancelAnimationFrame", () => {});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
		window.matchMedia = originalMatchMedia;
		(globalThis as unknown as { DeviceOrientationEvent?: unknown }).DeviceOrientationEvent = originalDOE;
	});

	function mockTouchDevice(reducedMotion = false) {
		window.matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: query.includes("hover") ? false : reducedMotion,
			media: query,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			addListener: vi.fn(),
			removeListener: vi.fn(),
			dispatchEvent: vi.fn(),
			onchange: null,
		})) as unknown as typeof window.matchMedia;
	}

	function setDeviceOrientationEvent(withPermission: boolean, permissionResult: "granted" | "denied" = "granted") {
		const doe = function DeviceOrientationEvent() {} as unknown as {
			requestPermission?: () => Promise<string>;
		};
		if (withPermission) {
			doe.requestPermission = vi.fn().mockResolvedValue(permissionResult);
		}
		(globalThis as unknown as { DeviceOrientationEvent: unknown }).DeviceOrientationEvent = doe;
	}

	function flushRaf() {
		const cbs = rafCallbacks;
		rafCallbacks = [];
		cbs.forEach((cb) => cb(0));
	}

	function dispatchOrientation(beta: number, gamma: number) {
		const ev = new Event("deviceorientation") as Event & { beta: number; gamma: number };
		ev.beta = beta;
		ev.gamma = gamma;
		window.dispatchEvent(ev);
	}

	it("starts at {0,0} on touch device", () => {
		mockTouchDevice();
		setDeviceOrientationEvent(false);
		const { result } = renderHook(() => usePointerParallax());
		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("calibrates first orientation reading as origin and returns {0,0}", () => {
		mockTouchDevice();
		setDeviceOrientationEvent(false);
		const { result } = renderHook(() => usePointerParallax());

		act(() => {
			dispatchOrientation(45, 10);
			flushRaf();
		});

		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("moves offset based on tilt delta from origin", () => {
		mockTouchDevice();
		setDeviceOrientationEvent(false);
		const { result } = renderHook(() => usePointerParallax());

		act(() => {
			dispatchOrientation(45, 10);
			flushRaf();
		});
		act(() => {
			dispatchOrientation(45, 30);
			flushRaf();
		});

		expect(result.current.x).toBeCloseTo(1, 5);
		expect(result.current.y).toBeCloseTo(0, 5);
	});

	it("does not update when prefers-reduced-motion is reduce", () => {
		mockTouchDevice(true);
		setDeviceOrientationEvent(false);
		const { result } = renderHook(() => usePointerParallax());

		act(() => {
			dispatchOrientation(45, 10);
			dispatchOrientation(45, 30);
			flushRaf();
		});

		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("removes deviceorientation listener on unmount", () => {
		mockTouchDevice();
		setDeviceOrientationEvent(false);
		const removeSpy = vi.spyOn(window, "removeEventListener");
		const { unmount } = renderHook(() => usePointerParallax());
		unmount();
		expect(removeSpy).toHaveBeenCalledWith("deviceorientation", expect.any(Function));
	});

	it("waits for user gesture before requesting iOS permission", async () => {
		mockTouchDevice();
		setDeviceOrientationEvent(true, "granted");
		const requestSpy = (globalThis as unknown as {
			DeviceOrientationEvent: { requestPermission: ReturnType<typeof vi.fn> };
		}).DeviceOrientationEvent.requestPermission;

		renderHook(() => usePointerParallax());

		expect(requestSpy).not.toHaveBeenCalled();

		await act(async () => {
			window.dispatchEvent(new Event("pointerdown"));
			await Promise.resolve();
		});

		expect(requestSpy).toHaveBeenCalledTimes(1);
	});

	it("stays at {0,0} when iOS permission is denied", async () => {
		mockTouchDevice();
		setDeviceOrientationEvent(true, "denied");
		const { result } = renderHook(() => usePointerParallax());

		await act(async () => {
			window.dispatchEvent(new Event("pointerdown"));
			await Promise.resolve();
		});

		act(() => {
			dispatchOrientation(45, 10);
			dispatchOrientation(45, 30);
			flushRaf();
		});

		expect(result.current).toEqual({ x: 0, y: 0 });
	});
});
