import Link from "next/link";
import { VALID_PATHS } from "@/constants/validPaths";

export function getBreadcrumbLinks(path: string) {
	const basePath = path === "/" ? "@ACCUEIL" : `@ACCUEIL/${path.substring(1).toUpperCase().trim()}`;
	const parts = basePath.split('/');

	return parts.map((part, index) => {
		const isWelcomePage = part === "@ACCUEIL";
		const linkPath = isWelcomePage ? '/' : '/' + parts.slice(1, index + 1).join('/').toLowerCase();
		const isKnown = (VALID_PATHS as readonly string[]).includes('/' + part.toLowerCase());
		const label = isWelcomePage ? "@ACCUEIL" : isKnown ? part : "404";

		return (
			<Link key={`${linkPath}-${index}`} href={linkPath} className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline">
				{label}
			</Link>
		);
	});
}
