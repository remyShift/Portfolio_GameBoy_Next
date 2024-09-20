import { create } from "zustand";

export const useValidPaths = create<{ validPaths: string[] }>((set) => ({
	validPaths: ["/", "/about", "/contact", "/projects", "/projects/summary", "/projects/fun-stats"],
}));
