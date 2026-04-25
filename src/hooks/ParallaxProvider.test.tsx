import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, renderHook, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { ParallaxProvider, useParallax } from "./ParallaxProvider";

let rafCallbacks: FrameRequestCallback[] = [];

function flushRaf() {
	const cbs = rafCallbacks;
	rafCallbacks = [];
	cbs.forEach((cb) => cb(0));
}

function mockHoverEnabled() {
	window.matchMedia = vi.fn().mockImplementation((query: string) => ({
		matches: query.includes("hover: hover"),
		media: query,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
		dispatchEvent: vi.fn(),
		onchange: null,
	})) as unknown as typeof window.matchMedia;
}

const wrapper = ({ children }: { children: ReactNode }) => (
	<ParallaxProvider>{children}</ParallaxProvider>
);

describe("ParallaxProvider", () => {
	const originalMatchMedia = window.matchMedia;

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

	it("exposes {0,0} offset by default", () => {
		mockHoverEnabled();
		const { result } = renderHook(() => useParallax(), { wrapper });
		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("propagates the same offset to all consumers via a single mousemove listener", () => {
		mockHoverEnabled();
		const addSpy = vi.spyOn(window, "addEventListener");

		const { result } = renderHook(
			() => ({ a: useParallax(), b: useParallax() }),
			{ wrapper },
		);

		const mouseListenerCount = addSpy.mock.calls.filter(
			(call) => call[0] === "mousemove",
		).length;
		expect(mouseListenerCount).toBe(1);

		act(() => {
			window.dispatchEvent(new MouseEvent("mousemove", { clientX: 1000, clientY: 800 }));
			flushRaf();
		});

		expect(result.current.a).toEqual({ x: 1, y: 1 });
		expect(result.current.b).toEqual({ x: 1, y: 1 });
	});

	it("stays at {0,0} when used outside a provider", () => {
		const { result } = renderHook(() => useParallax());
		expect(result.current).toEqual({ x: 0, y: 0 });
	});

	it("renders children", () => {
		mockHoverEnabled();
		const { getByText } = render(
			<ParallaxProvider>
				<span>child-content</span>
			</ParallaxProvider>,
		);
		expect(getByText("child-content")).toBeTruthy();
	});
});
