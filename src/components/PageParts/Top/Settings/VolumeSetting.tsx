"use client";

import { useTranslations } from "next-intl";
import { LuMegaphoneOff } from "react-icons/lu";
import { useMusicVolume, useUiVolume } from "@/hooks/useAudioSettings";
import {
	setMusicVolume,
	setUiVolume,
	toggleMusicMute,
	toggleUiMute,
} from "@/lib/audioSettings";
import {
	ensureAudioContextRunning,
	getSharedAudioContext,
	playNavClickBlip,
} from "@/lib/retroAudio";

const MAX_LEVEL = 5;
const LEVELS = Array.from({ length: MAX_LEVEL + 1 }, (_, level) => level);

type VolumeKind = "music" | "ui";

export default function VolumeSetting({ kind }: { kind: VolumeKind }) {
	const t = useTranslations("settings");
	const musicVolume = useMusicVolume();
	const uiVolume = useUiVolume();
	const volume = kind === "music" ? musicVolume : uiVolume;
	const currentLevel = Math.round(volume * MAX_LEVEL);

	const playUiFeedback = () => {
		(async () => {
			const ctx = getSharedAudioContext();
			await ensureAudioContextRunning(ctx);
			playNavClickBlip(ctx);
		})();
	};

	const applyLevel = (level: number) => {
		const nextVolume = level / MAX_LEVEL;

		if (kind === "music") {
			setMusicVolume(nextVolume);
			return;
		}

		setUiVolume(nextVolume);
		playUiFeedback();
	};

	const toggleMute = () => {
		if (kind === "music") {
			toggleMusicMute();
			return;
		}

		toggleUiMute();
		playUiFeedback();
	};

	return (
		<div
			className="flex items-end gap-0 sm:gap-1 pt-1"
			role="group"
			aria-label={t(kind === "music" ? "music" : "soundEffects")}
			data-no-sound={kind === "ui" ? "" : undefined}
		>
			{LEVELS.map((level) => {
				const isActive = level === currentLevel;
				const isFilled = level > 0 && level <= currentLevel;
				return (
					<button
						key={level}
						onClick={() => (level === 0 ? toggleMute() : applyLevel(level))}
						aria-pressed={isActive}
						aria-label={
								level === 0
									? t("muteToggleAria")
									: t("volumeLevelAria", { level, max: MAX_LEVEL })
							}
						className="flex items-end justify-center min-w-6 min-h-6 p-0.5"
					>
						{level === 0 ? (
							<LuMegaphoneOff
								aria-hidden="true"
								className={`w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 transition-colors ${
									isActive ? "text-wine" : "text-greyTextInfo"
								}`}
							/>
						) : (
							<span
								aria-hidden="true"
								className={`w-2 sm:w-2.5 md:w-3 transition-colors ${
									isFilled ? "bg-wine" : "bg-greyTextInfo opacity-40"
								}`}
								style={{ height: `${6 + level * 4}px` }}
							/>
						)}
					</button>
				);
			})}
		</div>
	);
}
