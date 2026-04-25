import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import Screen from "./Screen";

vi.mock("@/i18n/navigation", () => ({
	usePathname: () => "/",
}));

vi.mock("@/hooks/ParallaxProvider", () => ({
	useParallax: () => ({ x: 0, y: 0 }),
}));

const bootRenderSpy = vi.fn();
vi.mock("./BootAnimation", () => ({
	default: () => {
		bootRenderSpy();
		return <div data-testid="boot-animation" />;
	},
}));

vi.mock("./ScreenHeader", () => ({ default: () => <div /> }));
vi.mock("./ScreenFooter", () => ({ default: () => <div /> }));

describe("Screen boot-seen flash", () => {
	beforeEach(() => {
		sessionStorage.clear();
		bootRenderSpy.mockClear();
	});

	afterEach(() => {
		sessionStorage.clear();
	});

	it("never mounts BootAnimation when boot-seen is set (no flash)", () => {
		sessionStorage.setItem("boot-seen", "1");
		const { queryByTestId } = render(<Screen>content</Screen>);
		expect(queryByTestId("boot-animation")).toBeNull();
		expect(bootRenderSpy).not.toHaveBeenCalled();
	});

	it("renders BootAnimation when boot-seen is not set", () => {
		const { queryByTestId } = render(<Screen>content</Screen>);
		expect(queryByTestId("boot-animation")).not.toBeNull();
	});
});
