import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useIsValidPath } from "./useIsValidPath";

vi.mock("@/i18n/navigation", () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from "@/i18n/navigation";

describe("useIsValidPath", () => {
  it("returns true for a known path", () => {
    vi.mocked(usePathname).mockReturnValue("/about");
    const { result } = renderHook(() => useIsValidPath());
    expect(result.current).toBe(true);
  });

  it("returns true for the root path", () => {
    vi.mocked(usePathname).mockReturnValue("/");
    const { result } = renderHook(() => useIsValidPath());
    expect(result.current).toBe(true);
  });

  it("returns true for a known nested path", () => {
    vi.mocked(usePathname).mockReturnValue("/projects/fun-stats");
    const { result } = renderHook(() => useIsValidPath());
    expect(result.current).toBe(true);
  });

  it("returns false for an unknown path", () => {
    vi.mocked(usePathname).mockReturnValue("/doesnotexist");
    const { result } = renderHook(() => useIsValidPath());
    expect(result.current).toBe(false);
  });

  it("returns false for a partial known path prefix", () => {
    vi.mocked(usePathname).mockReturnValue("/projects/unknown-page");
    const { result } = renderHook(() => useIsValidPath());
    expect(result.current).toBe(false);
  });
});
