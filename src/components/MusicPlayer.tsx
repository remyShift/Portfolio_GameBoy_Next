"use client";

import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { getTrackForPathname } from "@/constants/pageTracks";
import { getMusicVolume, subscribeToAudioSettings } from "@/lib/audioSettings";
import {
	applyMusicVolume,
	playTrack,
	prepareMusicPlayer,
	pauseForHiddenTab,
	resumeFromHiddenTab,
	stopMusic,
} from "@/lib/musicPlayer";
import { prepareAudioContext, unlockAudioContext } from "@/lib/retroAudio";
import { prefetchTrack } from "@/lib/trackCache";

export default function MusicPlayer() {
	const pathname = usePathname();
	const [armed, setArmed] = useState(false);

	useEffect(() => {
		if (armed) return;

		prepareAudioContext();
		prepareMusicPlayer();

		const track = getTrackForPathname(pathname);
		if (track && getMusicVolume() > 0) prefetchTrack(track);
	}, [armed, pathname]);

	useEffect(() => {
		if (armed) return;

		// Why: aucun await avant play() — après un await, WebKit ne voit plus
		// d'activation utilisateur et refuse la lecture
		const onFirstGesture = () => {
			unlockAudioContext();

			const track = getTrackForPathname(pathname);
			if (!track || getMusicVolume() <= 0) return;

			void playTrack(track).then((started) => {
				if (started) setArmed(true);
			});
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

			unlockAudioContext();
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
