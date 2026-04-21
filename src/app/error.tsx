"use client";

import { useEffect } from "react";

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
			<button
				type="button"
				onClick={reset}
				className="bg-wine hover:bg-wine/80 text-cream font-pressStart2P text-xs md:text-sm rounded px-4 py-2"
			>
				Réessayer
			</button>
		</div>
	);
}
