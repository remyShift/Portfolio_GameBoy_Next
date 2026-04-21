import Link from "next/link";
import { VALID_PATHS } from "@/constants/validPaths";

const HOME_LABEL = "@ACCUEIL";
const BREADCRUMB_CLASS = "text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline";

export function buildBreadcrumb(path: string) {
	const segments = path === "/" ? [HOME_LABEL] : [HOME_LABEL, ...path.substring(1).toUpperCase().trim().split("/")];

	return segments.map((segment, index) => {
		const isHome = segment === HOME_LABEL;
		const href = isHome ? "/" : "/" + segments.slice(1, index + 1).join("/").toLowerCase();
		const isKnown = (VALID_PATHS as readonly string[]).includes("/" + segment.toLowerCase());
		const label = isHome ? HOME_LABEL : isKnown ? segment : "404";

		return (
			<Link key={`${href}-${index}`} href={href} className={BREADCRUMB_CLASS}>
				{label}
			</Link>
		);
	});
}
