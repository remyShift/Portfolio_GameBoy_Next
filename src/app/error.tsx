"use client";

import { useEffect } from "react";

// Why: this root error.tsx is a rare fallback (the [locale]/error.tsx handles the
// localized cases). We stack both languages instead of detecting the locale to
// keep the file zero-dependency and synchronously rendered.
export default function GlobalError({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-full gap-4 p-4 text-center">
			<h1 className="font-pressStart2P text-base sm:text-lg md:text-2xl">Oups, une erreur</h1>
			<p className="font-gillSans text-sm md:text-base">Quelque chose a cassé. Réessaie ou reviens sur l&apos;accueil.</p>
			<h2 className="font-pressStart2P text-base sm:text-lg md:text-2xl mt-4">Oops, an error</h2>
			<p className="font-gillSans text-sm md:text-base">Something broke. Try again or go back to home.</p>
			<button
				type="button"
				onClick={reset}
				className="bg-wine hover:bg-wine/80 text-cream font-pressStart2P text-xs md:text-sm rounded px-4 py-2"
			>
				Réessayer / Try again
			</button>
		</div>
	);
}
