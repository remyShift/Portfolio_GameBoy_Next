import type { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export const FALLBACK_LOCALE: Locale = "fr";
