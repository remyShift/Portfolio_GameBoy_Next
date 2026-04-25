"use client";

import { createContext, use, useEffect, useState } from "react";
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
		<ParallaxContext value={offset}>
			{children}
		</ParallaxContext>
	);
}

export function useParallax(): ParallaxOffset {
	return use(ParallaxContext);
}
