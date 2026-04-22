"use client";

import { usePathname } from "@/i18n/navigation";
import { VALID_PATHS } from "@/constants/validPaths";

export function useIsValidPath(): boolean {
	const pathname = usePathname();
	return (VALID_PATHS as readonly string[]).includes(pathname);
}
