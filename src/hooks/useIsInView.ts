import { useEffect, useRef, useState, type RefObject } from "react";

type Options = {
	threshold?: number;
	once?: boolean;
};

export function useIsInView<T extends HTMLElement>({
	threshold = 0.1,
	once = true,
}: Options = {}): { ref: RefObject<T | null>; isInView: boolean } {
	const ref = useRef<T>(null);
	const [isInView, setIsInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		if (node.getBoundingClientRect().top < window.innerHeight) {
			setIsInView(true);
			if (once) return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setIsInView(true);
						if (once) observer.disconnect();
					} else if (!once) {
						setIsInView(false);
					}
				});
			},
			{ threshold },
		);
		observer.observe(node);

		return () => observer.disconnect();
	}, [threshold, once]);

	return { ref, isInView };
}
