import { getSharedAudioContext } from './retroAudio';

// Why: une piste decodee pese 5 a 8 Mo en PCM — on ne garde que la courante et
// la precedente, les octets compresses (150 a 200 Ko) suffisant a redecoder
// sans repasser par le reseau
const MAX_DECODED_TRACKS = 2;

const compressedTracks = new Map<string, ArrayBuffer>();
const decodedTracks = new Map<string, AudioBuffer>();
const pendingLoads = new Map<string, Promise<AudioBuffer | null>>();

function rememberDecodedTrack(src: string, buffer: AudioBuffer): void {
	decodedTracks.set(src, buffer);
	while (decodedTracks.size > MAX_DECODED_TRACKS) {
		const oldest = decodedTracks.keys().next().value;
		if (oldest === undefined) break;
		decodedTracks.delete(oldest);
	}
}

async function fetchTrackBytes(src: string): Promise<ArrayBuffer | null> {
	const cached = compressedTracks.get(src);
	if (cached) return cached;

	try {
		const response = await fetch(src);
		if (!response.ok) return null;
		const bytes = await response.arrayBuffer();
		compressedTracks.set(src, bytes);
		return bytes;
	} catch {
		return null;
	}
}

export function loadTrack(src: string): Promise<AudioBuffer | null> {
	const decoded = decodedTracks.get(src);
	if (decoded) return Promise.resolve(decoded);

	const pending = pendingLoads.get(src);
	if (pending) return pending;

	const load = fetchTrackBytes(src)
		.then(async (bytes) => {
			if (!bytes) return null;
			// Why: decodeAudioData detache le tampon qu'on lui passe — on decode
			// une copie pour garder les octets compresses reutilisables
			const buffer = await getSharedAudioContext().decodeAudioData(
				bytes.slice(0),
			);
			rememberDecodedTrack(src, buffer);
			return buffer;
		})
		.catch(() => null)
		.finally(() => {
			pendingLoads.delete(src);
		});

	pendingLoads.set(src, load);
	return load;
}

// Why: seuls les octets sont recuperes avant le geste. Decoder exigerait un
// AudioContext, et en instancier un hors geste rend l'audio sourd sur iOS.
export function prefetchTrack(src: string): void {
	if (typeof window === 'undefined') return;
	void fetchTrackBytes(src);
}

export function getLoadedTrack(src: string): AudioBuffer | null {
	return decodedTracks.get(src) ?? null;
}
