"use client";

import { useTranslations } from "next-intl";
import { useMusicVolume, useUiVolume } from "@/hooks/useAudioSettings";
import { setMusicVolume, setUiVolume } from "@/lib/audioSettings";
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

	const applyLevel = (level: number) => {
		const nextVolume = level / MAX_LEVEL;

    if (kind === "music") {
			setMusicVolume(nextVolume);
			return;
    }

		setUiVolume(nextVolume);

    (async () => {
			const ctx = getSharedAudioContext();
			await ensureAudioContextRunning(ctx);
			playNavClickBlip(ctx);
		})();
	};

	return (
		<div
			className="flex items-end gap-1.5 sm:gap-2 pt-1"
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
						onClick={() => applyLevel(level)}
						aria-pressed={isActive}
						aria-label={t("volumeLevelAria", { level, max: MAX_LEVEL })}
						className="flex items-end p-0.5"
					>
						{level === 0 ? (
							<span
								aria-hidden="true"
								className={`font-pressStart2P text-[0.5rem] sm:text-xs md:text-sm ${
									isActive ? "text-wine" : "text-greyTextInfo"
								}`}
							>
								✕
							</span>
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
