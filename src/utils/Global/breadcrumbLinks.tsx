import { useValidPaths } from "@/context/store";
import Link from "next/link";

export function generateBreadcrumbLinks(path: string) {
	const { validPaths } = useValidPaths();
	const basePath = path === "/" ? "@ACCUEIL" : `@ACCUEIL/${path.substring(1).toUpperCase().trim()}`;
	const parts = basePath.split('/');

	return parts.map((part, index) => {
		const isWelcomePage = part === "@ACCUEIL";
		const linkPath = isWelcomePage ? '/' : '/' + parts.slice(1, index + 1).join('/').toLowerCase();
		const label = isWelcomePage ? "@ACCUEIL" : validPaths.includes('/' + part.toLowerCase()) ? part : "404";

		return (
			<Link href={linkPath} className="text-greyTextInfo font-gillSans font-bold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline" >
				{label}
			</Link>
		)
	});
};