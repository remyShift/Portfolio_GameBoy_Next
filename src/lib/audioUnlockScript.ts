import { DEFAULT_UI_VOLUME, UI_VOLUME_STORAGE_KEY } from './audioSettings';
import {
	DECAY_FLOOR_RATIO,
	SCHEDULE_LEAD_SECONDS,
	WELCOME_CHIME_BASE_GAIN,
	WELCOME_CHIME_NOTES,
} from './retroAudio';

// Why: runtime minimal du seul instant que l'application ne peut pas couvrir.
// Sur un telephone, le premier paint precede l'execution du bundle de 1 a 3 s ;
// pendant cette fenetre l'ecran est affiche et aucun handler n'existe, donc tout
// tap est avale sans reponse. Ce script, execute au parsing du HTML :
//   - cree le contexte partage DANS le geste, seule facon d'obtenir un contexte
//     deja "running" sur WebKit ;
//   - joue l'arpege d'accueil immediatement, pour que le tap soit accuse tout de
//     suite au lieu d'attendre l'hydratation ;
//   - note le geste, que l'application rejoue a son montage.
// Les valeurs viennent de retroAudio et audioSettings : une seule source de
// verite, seule la boucle de programmation est repetee ici, faute de pouvoir
// importer quoi que ce soit avant le bundle.
export const EARLY_AUDIO_UNLOCK_SCRIPT = `(function(){
var N=${JSON.stringify(WELCOME_CHIME_NOTES)},G=${WELCOME_CHIME_BASE_GAIN},F=${DECAY_FLOOR_RATIO},L=${SCHEDULE_LEAD_SECONDS};
function readVolume(){try{var s=localStorage.getItem(${JSON.stringify(UI_VOLUME_STORAGE_KEY)});
if(s===null||s.trim()==='')return ${DEFAULT_UI_VOLUME};var n=Number(s);
return isFinite(n)?Math.max(0,Math.min(1,n)):${DEFAULT_UI_VOLUME}}catch(e){return ${DEFAULT_UI_VOLUME}}}
function chime(c){var v=readVolume();if(v<=0)return;var t=c.currentTime+L,i,o,g,p;
for(i=0;i<N.length;i++){o=c.createOscillator();g=c.createGain();o.connect(g);g.connect(c.destination);
o.type='triangle';o.frequency.value=N[i].freq;p=G*v;
g.gain.setValueAtTime(p,t+N[i].start);
g.gain.exponentialRampToValueAtTime(p*F,t+N[i].start+N[i].dur);
o.start(t+N[i].start);o.stop(t+N[i].start+N[i].dur+0.03)}
window.__retroEarlyChime=true}
function unlock(){try{var C=window.AudioContext||window.webkitAudioContext;if(C){
var c=window.__retroAudioContext||(window.__retroAudioContext=new C());
if(c.state!=='running'){c.resume()}chime(c)}}catch(e){}
window.__retroUserGestured=true;
document.removeEventListener('pointerdown',unlock,true);
document.removeEventListener('keydown',unlock,true)}
document.addEventListener('pointerdown',unlock,true);
document.addEventListener('keydown',unlock,true)})()`;
