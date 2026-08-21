// Why: partagé entre Screen, qui décide d'afficher le splash, et le script
// inline du layout, qui doit savoir s'il y a un démarrage à accompagner d'un
// arpège — sans quoi il sonne aussi sur une page rechargée, sans splash
export const BOOT_SEEN_STORAGE_KEY = "boot-seen";
export const BOOT_SEEN_VALUE = "1";
