"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { getTrackForPathname } from "@/constants/pageTracks";
import { getMusicVolume, subscribeToAudioSettings } from "@/lib/audioSettings";
import {
	applyMusicVolume,
	playTrack,
	pauseForHiddenTab,
	resumeFromHiddenTab,
	stopMusic,
} from "@/lib/musicPlayer";
import {
	ensureAudioContextRunning,
	getSharedAudioContext,
} from "@/lib/retroAudio";

export default function MusicPlayer() {
	const pathname = usePathname();
	const [armed, setArmed] = useState(false);

	useEffect(() => {
		if (armed) return;

		const onFirstGesture = () => {
			void (async () => {
				await ensureAudioContextRunning(getSharedAudioContext());
				const track = getTrackForPathname(pathname);
				if (!track || getMusicVolume() <= 0) return;
				const started = await playTrack(track);
				if (started) setArmed(true);
			})();
		};

		document.addEventListener("pointerdown", onFirstGesture, true);
		document.addEventListener("keydown", onFirstGesture, true);
		return () => {
			document.removeEventListener("pointerdown", onFirstGesture, true);
			document.removeEventListener("keydown", onFirstGesture, true);
		};
	}, [armed, pathname]);

	useEffect(() => {
		if (!armed) return;
		const track = getTrackForPathname(pathname);
		if (track) {
			playTrack(track);
		} else {
			stopMusic();
		}
	}, [armed, pathname]);

	useEffect(() => {
		return subscribeToAudioSettings(() => {
			const volume = getMusicVolume();
			if (armed) {
				applyMusicVolume(volume);
				return;
			}
      if (volume <= 0) return;

			const track = getTrackForPathname(pathname);

      if (!track) return;

			playTrack(track).then((started) => {
				if (started) setArmed(true);
			});
		});
	}, [armed, pathname]);

	useEffect(() => {
		if (!armed) return;
		const onVisibilityChange = () => {
			if (document.visibilityState === "hidden") {
				pauseForHiddenTab();
			} else {
				resumeFromHiddenTab();
			}
		};
		document.addEventListener("visibilitychange", onVisibilityChange);
		return () =>
			document.removeEventListener("visibilitychange", onVisibilityChange);
	}, [armed]);

	return null;
}
