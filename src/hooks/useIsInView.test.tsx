import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { useIsInView } from "./useIsInView";

let intersectionCallback: IntersectionObserverCallback;
const observeMock = vi.fn();
const disconnectMock = vi.fn();

beforeEach(() => {
  observeMock.mockClear();
  disconnectMock.mockClear();

  vi.spyOn(Element.prototype, "getBoundingClientRect").mockReturnValue({
    top: 9999,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  });

  global.IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      intersectionCallback = callback;
    }
    observe = observeMock;
    disconnect = disconnectMock;
    unobserve = vi.fn();
    takeRecords = vi.fn().mockReturnValue([]);
    root = null;
    rootMargin = "";
    thresholds = [];
  } as unknown as typeof IntersectionObserver;
});

function TestComponent({ once = true }: { once?: boolean }) {
  const { ref, isInView } = useIsInView<HTMLDivElement>({ once });
  return <div ref={ref} data-testid="box">{isInView ? "visible" : "hidden"}</div>;
}

describe("useIsInView", () => {
  it("starts hidden before any intersection", () => {
    render(<TestComponent />);
    expect(screen.getByTestId("box")).toHaveTextContent("hidden");
  });

  it("becomes visible when the element intersects", async () => {
    render(<TestComponent />);
    await act(async () => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(screen.getByTestId("box")).toHaveTextContent("visible");
  });

  it("disconnects after first intersection when once=true", async () => {
    render(<TestComponent once={true} />);
    await act(async () => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(disconnectMock).toHaveBeenCalledOnce();
  });

  it("toggles back to hidden when element leaves view and once=false", async () => {
    render(<TestComponent once={false} />);
    await act(async () => {
      intersectionCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(screen.getByTestId("box")).toHaveTextContent("visible");

    await act(async () => {
      intersectionCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    expect(screen.getByTestId("box")).toHaveTextContent("hidden");
  });
});
