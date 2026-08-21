import { unlockAudioContext } from './retroAudio';

type GestureListener = () => void;

type NavigatorWithActivation = Navigator & {
	userActivation?: { hasBeenActive: boolean };
};

type WindowWithGesture = Window & { __retroUserGestured?: boolean };

const listeners = new Set<GestureListener>();
let gestureSeen = false;

function handleUserGesture(): void {
	gestureSeen = true;
	unlockAudioContext();
	for (const listener of [...listeners]) listener();
}

// Why: attaché à l'exécution du module et non dans un effet React — un effet
// n'arrive qu'après l'hydratation, et le premier tap serait perdu
if (typeof window !== 'undefined') {
	document.addEventListener('pointerdown', handleUserGesture, true);
	document.addEventListener('keydown', handleUserGesture, true);
}

// Why: cet écouteur n'existe qu'à partir de l'exécution du bundle, soit ~3 s
// après le premier paint sur un téléphone. Le script inline du layout, lui,
// tourne dès le parsing du HTML : c'est la seule source fiable sur WebKit, où
// navigator.userActivation n'est pas implémenté — donc sur iPhone.
export function hasUserGestured(): boolean {
	if (gestureSeen) return true;
	if (typeof window === 'undefined') return false;
	if ((window as WindowWithGesture).__retroUserGestured) return true;
	return (
		(navigator as NavigatorWithActivation).userActivation?.hasBeenActive ?? false
	);
}

// Why: le geste précède souvent le montage de celui qui veut y réagir —
// BootAnimation s'hydrate avant MusicPlayer, donc le tap qui congédie le splash
// était consommé sans lancer la musique, qui attendait un second geste
export function runOnUserGesture(listener: GestureListener): () => void {
	listeners.add(listener);
	if (hasUserGestured()) {
		unlockAudioContext();
		listener();
	}
	return () => {
		listeners.delete(listener);
	};
}
