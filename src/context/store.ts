import { create } from "zustand";

export const useValidPaths = create<{ validPaths: string[] }>(() => ({
	validPaths: ["/", "/about", "/contact", "/projects", "/summary", "/fun-stats", "/projects/fun-stats", "/projects/summary"],
}));