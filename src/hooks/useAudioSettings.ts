"use client";

import { useSyncExternalStore } from "react";
import {
	DEFAULT_MUSIC_VOLUME,
	DEFAULT_UI_VOLUME,
	getMusicVolume,
	getUiVolume,
	subscribeToAudioSettings,
} from "@/lib/audioSettings";

export function useMusicVolume(): number {
	return useSyncExternalStore(
		subscribeToAudioSettings,
		getMusicVolume,
		() => DEFAULT_MUSIC_VOLUME,
	);
}

export function useUiVolume(): number {
	return useSyncExternalStore(
		subscribeToAudioSettings,
		getUiVolume,
		() => DEFAULT_UI_VOLUME,
	);
}
