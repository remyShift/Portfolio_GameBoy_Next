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
import { runOnUserGesture } from "@/lib/audioUnlock";
import { prepareAudioContext } from "@/lib/retroAudio";
import { prefetchTrack } from "@/lib/trackCache";

export default function MusicPlayer() {
	const pathname = usePathname();
	const [armed, setArmed] = useState(false);

	// Why: sans dependance a `armed` — le garder rendait le prechargement mort
	// des la premiere piste lancee, et les cinq autres passaient par le reseau
	// puis le decodeur au moment du clic de navigation
	useEffect(() => {
		prepareAudioContext();
		prepareMusicPlayer();

		const track = getTrackForPathname(pathname);
		if (track && getMusicVolume() > 0) prefetchTrack(track);
	}, [pathname]);

	useEffect(() => {
		if (armed) return;

		// Why: pas d'écouteur local — ce composant s'hydrate après BootAnimation et
		// manquait le tap de démarrage. Pas d'await avant play() non plus : après un
		// await, WebKit ne voit plus d'activation utilisateur et refuse la lecture.
		return runOnUserGesture(() => {
			const track = getTrackForPathname(pathname);
			if (!track || getMusicVolume() <= 0) return;

			void playTrack(track).then((started) => {
				if (started) setArmed(true);
			});
		});
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
