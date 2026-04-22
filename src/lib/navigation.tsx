import { Link } from "@/i18n/navigation";
import { VALID_PATHS } from "@/constants/validPaths";

const BREADCRUMB_CLASS = "text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline";

export function buildBreadcrumb(path: string, homeLabel: string = "@ACCUEIL") {
	const segments = path === "/" ? [homeLabel] : [homeLabel, ...path.substring(1).toUpperCase().trim().split("/")];

	return segments.map((segment, index) => {
		const isHome = segment === homeLabel;
		const href = isHome ? "/" : "/" + segments.slice(1, index + 1).join("/").toLowerCase();
		const isKnown = (VALID_PATHS as readonly string[]).includes(href);
		const label = isHome ? homeLabel : isKnown ? segment : "404";

		return (
			<Link key={`${href}-${index}`} href={href} className={BREADCRUMB_CLASS}>
				{label}
			</Link>
		);
	});
}
