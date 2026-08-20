import { unlockAudioContext } from './retroAudio';

type GestureListener = () => void;

type NavigatorWithActivation = Navigator & {
	userActivation?: { hasBeenActive: boolean };
};

const listeners = new Set<GestureListener>();
let hasUserGestured = false;

function handleUserGesture(): void {
	hasUserGestured = true;
	unlockAudioContext();
	for (const listener of [...listeners]) listener();
}

// Why: attaché à l'exécution du module et non dans un effet React — un effet
// n'arrive qu'après l'hydratation, et le premier tap serait perdu
if (typeof window !== 'undefined') {
	document.addEventListener('pointerdown', handleUserGesture, true);
	document.addEventListener('keydown', handleUserGesture, true);
}

// Why: notre écouteur n'existe qu'à partir de l'évaluation du bundle, alors que
// le navigateur retient tout geste antérieur — sans ce rattrapage, un tap arrivé
// avant restait invisible et l'audio attendait le suivant
function hasPageBeenActivated(): boolean {
	if (hasUserGestured) return true;
	return (
		(navigator as NavigatorWithActivation).userActivation?.hasBeenActive ?? false
	);
}

// Why: le geste précède souvent le montage de celui qui veut y réagir —
// BootAnimation s'hydrate avant MusicPlayer, donc le tap qui congédie le splash
// était consommé sans lancer la musique, qui attendait un second geste
export function runOnUserGesture(listener: GestureListener): () => void {
	listeners.add(listener);
	if (hasPageBeenActivated()) {
		unlockAudioContext();
		listener();
	}
	return () => {
		listeners.delete(listener);
	};
}
