// Why: sur iOS, `preload` est ignoré tant qu'aucun geste n'a eu lieu — la piste
// ne se télécharge donc qu'au moment du tap, ce qui ajoute 1 à 3 s de silence en
// 4G. On la récupère nous-mêmes pendant le boot et on la garde en mémoire pour
// que `play()` démarre sans réseau.
const trackObjectUrls = new Map<string, string>();
const downloadingTracks = new Set<string>();

export function prefetchTrack(src: string): void {
	if (typeof window === 'undefined') return;
	if (trackObjectUrls.has(src) || downloadingTracks.has(src)) return;

	downloadingTracks.add(src);
	void fetch(src)
		.then((response) => (response.ok ? response.blob() : null))
		.then((blob) => {
			if (blob) trackObjectUrls.set(src, URL.createObjectURL(blob));
		})
		.catch(() => undefined)
		.finally(() => downloadingTracks.delete(src));
}

export function resolveTrackSource(src: string): string {
	return trackObjectUrls.get(src) ?? src;
}
