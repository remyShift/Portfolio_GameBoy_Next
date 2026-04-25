import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, act, fireEvent } from "@testing-library/react";
import BootAnimation from "./BootAnimation";

vi.mock("next-intl", () => ({
	useTranslations: () => (key: string) => key,
}));

const playWelcomeChime = vi.fn();
const fakeCtx = { state: "running" as const, addEventListener: vi.fn(), removeEventListener: vi.fn(), resume: vi.fn() };

vi.mock("@/lib/retroAudio", () => ({
	getSharedAudioContext: () => fakeCtx,
	playWelcomeChime: (...args: unknown[]) => playWelcomeChime(...args),
}));

describe("BootAnimation", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		playWelcomeChime.mockClear();
	});

	afterEach(() => {
		act(() => {
			vi.runOnlyPendingTimers();
		});
		vi.useRealTimers();
	});

	it("transitions from crt to content phase after 600ms", () => {
		const onComplete = vi.fn();
		const { queryByText } = render(<BootAnimation onComplete={onComplete} />);

		expect(queryByText("continueHint")).toBeNull();

		act(() => {
			vi.advanceTimersByTime(600);
		});

		expect(queryByText("continueHint")).not.toBeNull();
	});

	it("dismisses on keydown then calls onComplete after FADE_MS (420ms)", () => {
		const onComplete = vi.fn();
		render(<BootAnimation onComplete={onComplete} />);

		act(() => {
			vi.advanceTimersByTime(600);
		});

		act(() => {
			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
		});

		expect(onComplete).not.toHaveBeenCalled();
		expect(playWelcomeChime).toHaveBeenCalledTimes(1);

		act(() => {
			vi.advanceTimersByTime(420);
		});

		expect(onComplete).toHaveBeenCalledTimes(1);
	});

	it("ignores repeated keydown events", () => {
		const onComplete = vi.fn();
		render(<BootAnimation onComplete={onComplete} />);

		act(() => {
			vi.advanceTimersByTime(600);
		});

		act(() => {
			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", repeat: true }));
		});

		act(() => {
			vi.advanceTimersByTime(420);
		});

		expect(onComplete).not.toHaveBeenCalled();
		expect(playWelcomeChime).not.toHaveBeenCalled();
	});

	it("dismisses on pointerdown on the overlay", () => {
		const onComplete = vi.fn();
		const { container } = render(<BootAnimation onComplete={onComplete} />);

		act(() => {
			vi.advanceTimersByTime(600);
		});

		const overlay = container.querySelector("[data-boot-overlay]");
		expect(overlay).not.toBeNull();

		act(() => {
			fireEvent.pointerDown(overlay as Element);
		});

		act(() => {
			vi.advanceTimersByTime(420);
		});

		expect(onComplete).toHaveBeenCalledTimes(1);
	});

	it("only calls onComplete once even on multiple keydowns", () => {
		const onComplete = vi.fn();
		render(<BootAnimation onComplete={onComplete} />);

		act(() => {
			vi.advanceTimersByTime(600);
		});

		act(() => {
			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
			window.dispatchEvent(new KeyboardEvent("keydown", { key: "Space" }));
		});

		act(() => {
			vi.advanceTimersByTime(420);
		});

		expect(onComplete).toHaveBeenCalledTimes(1);
	});
});
