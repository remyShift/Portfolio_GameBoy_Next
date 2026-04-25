"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
	subscribeToPointerParallax,
	type ParallaxOffset,
} from "./usePointerParallax";

const ZERO_OFFSET: ParallaxOffset = { x: 0, y: 0 };

const ParallaxContext = createContext<ParallaxOffset>(ZERO_OFFSET);

export function ParallaxProvider({ children }: { children: React.ReactNode }) {
	const [offset, setOffset] = useState<ParallaxOffset>(ZERO_OFFSET);

	useEffect(() => subscribeToPointerParallax(setOffset), []);

	return (
		<ParallaxContext.Provider value={offset}>
			{children}
		</ParallaxContext.Provider>
	);
}

export function useParallax(): ParallaxOffset {
	return useContext(ParallaxContext);
}
