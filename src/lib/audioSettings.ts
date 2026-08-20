export const MUSIC_VOLUME_STORAGE_KEY = "audio-music-volume";
export const UI_VOLUME_STORAGE_KEY = "audio-ui-volume";
// Why: position sur l'échelle 0-1 (= niveau 3/5 du réglage), pas un gain —
// le volume global se règle via MUSIC_MAX_GAIN dans musicPlayer.ts
export const DEFAULT_MUSIC_VOLUME = 0.6;
export const DEFAULT_UI_VOLUME = 1;

type VolumeListener = () => void;

const listeners = new Set<VolumeListener>();

let musicVolume: number | null = null;
let uiVolume: number | null = null;
let lastAudibleMusicVolume: number | null = null;
let lastAudibleUiVolume: number | null = null;

function clampVolume(value: number): number {
	return Math.max(0, Math.min(1, value));
}

function readStoredVolume(key: string, fallback: number): number {
	if (typeof window === "undefined") return fallback;
	try {
		const raw = window.localStorage.getItem(key);
		if (raw === null || raw.trim() === "") return fallback;
		const parsed = Number(raw);
		if (!Number.isFinite(parsed)) return fallback;
		return clampVolume(parsed);
	} catch {
		return fallback;
	}
}

function writeStoredVolume(key: string, value: number): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(key, String(value));
  } catch {
    throw new Error("Failed to write stored volume");
	}
}

function notifyListeners(): void {
	for (const listener of listeners) listener();
}

export function getMusicVolume(): number {
	if (musicVolume === null) {
		musicVolume = readStoredVolume(
			MUSIC_VOLUME_STORAGE_KEY,
			DEFAULT_MUSIC_VOLUME,
		);
	}
	return musicVolume;
}

export function getUiVolume(): number {
	if (uiVolume === null) {
		uiVolume = readStoredVolume(UI_VOLUME_STORAGE_KEY, DEFAULT_UI_VOLUME);
	}
	return uiVolume;
}

export function setMusicVolume(value: number): void {
	musicVolume = clampVolume(value);
	if (musicVolume > 0) lastAudibleMusicVolume = musicVolume;
	writeStoredVolume(MUSIC_VOLUME_STORAGE_KEY, musicVolume);
	notifyListeners();
}

export function setUiVolume(value: number): void {
	uiVolume = clampVolume(value);
	if (uiVolume > 0) lastAudibleUiVolume = uiVolume;
	writeStoredVolume(UI_VOLUME_STORAGE_KEY, uiVolume);
	notifyListeners();
}

export function toggleMusicMute(): void {
	const current = getMusicVolume();
	if (current > 0) {
		lastAudibleMusicVolume = current;
		setMusicVolume(0);
		return;
	}
	setMusicVolume(lastAudibleMusicVolume ?? DEFAULT_MUSIC_VOLUME);
}

export function toggleUiMute(): void {
	const current = getUiVolume();
	if (current > 0) {
		lastAudibleUiVolume = current;
		setUiVolume(0);
		return;
	}
	setUiVolume(lastAudibleUiVolume ?? DEFAULT_UI_VOLUME);
}

export function subscribeToAudioSettings(
	listener: VolumeListener,
): () => void {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}
