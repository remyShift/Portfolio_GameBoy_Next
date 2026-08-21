"use client";

import { useSyncExternalStore } from "react";

const DEBUG_SEARCH_PARAM = "audio-debug";
const REFRESH_MS = 250;

type DiagnosticWindow = Window & {
	__retroAudioContext?: AudioContext;
	__retroUserGestured?: boolean;
	__retroEarlyChime?: boolean;
	__retroMusicPlayer?: {
		currentTrack: string | null;
		source: AudioBufferSourceNode | null;
		gain: GainNode;
	};
};

type NavigatorWithAudioSession = Navigator & { audioSession?: { type: string } };

// Why: lit uniquement les globales deja posees — n'instancie jamais de contexte,
// ce qui rendrait l'audio sourd sur iOS et fausserait la mesure.
// Why: serialise en texte pour que useSyncExternalStore compare deux etats sans
// recreer un objet a chaque sondage.
function readDiagnostics(): string {
	if (typeof window === "undefined") return "";
	if (!new URLSearchParams(window.location.search).has(DEBUG_SEARCH_PARAM)) {
		return "";
	}

	const w = window as DiagnosticWindow;
	const ctx = w.__retroAudioContext;
	const player = w.__retroMusicPlayer;

	return [
		`contexte=${ctx ? ctx.state : "aucun"}`,
		`currentTime=${ctx ? ctx.currentTime.toFixed(2) : "—"}`,
		`session iOS=${(navigator as NavigatorWithAudioSession).audioSession?.type ?? "non supporte"}`,
		`geste vu=${w.__retroUserGestured === true ? "oui" : "non"}`,
		`arpege joue=${w.__retroEarlyChime === true ? "oui" : "non"}`,
		`piste=${player?.currentTrack?.split("/").pop() ?? "—"}`,
		`en lecture=${player?.source ? "oui" : "non"}`,
		`gain=${player ? player.gain.gain.value.toFixed(4) : "—"}`,
	].join("\n");
}

let lastReading = "";

function subscribeToDiagnostics(onChange: () => void): () => void {
	const timer = window.setInterval(() => {
		const reading = readDiagnostics();
		if (reading === lastReading) return;
		lastReading = reading;
		onChange();
	}, REFRESH_MS);
	return () => window.clearInterval(timer);
}

function getDiagnostics(): string {
	return lastReading;
}

function getServerDiagnostics(): string {
	return "";
}

export default function AudioDiagnostics() {
	const reading = useSyncExternalStore(
		subscribeToDiagnostics,
		getDiagnostics,
		getServerDiagnostics,
	);

	if (!reading) return null;

	return (
		<div
			data-no-sound
			className="fixed left-1 top-1 z-[100] rounded bg-black/85 px-2 py-1.5 font-mono text-[9px] leading-tight text-lime-300"
		>
			{reading.split("\n").map((line) => {
				const [label, value] = line.split("=");
				return (
					<div key={label}>
						{label} : <span className="text-white">{value}</span>
					</div>
				);
			})}
		</div>
	);
}
