"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useValidPaths } from "@/context/store";

export default function TopScreen() {
	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const generateBreadcrumbLinks = (path: string) => {
		const basePath = path === "/" ? "@ACCUEIL" : `@ACCUEIL/${path.substring(1).toUpperCase().trim()}`;
		const parts = basePath.split('/');

		return parts.map((part, index) => {
			const isWelcomePage = part === "@ACCUEIL";
			const linkPath = isWelcomePage ? '/' : '/' + parts.slice(1, index + 1).join('/').toLowerCase();
			const label = isWelcomePage ? "@ACCUEIL" : validPaths.includes('/' + part.toLowerCase()) ? part : "404";

			return (
				<Link href={linkPath} className="text-greyTextInfo font-openSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline">
					{label}
				</Link>
			)
		});
	};

	const breadcrumbLinks = generateBreadcrumbLinks(pathname);

	const batteryStatus = validPaths.includes(pathname) ? "BATTERIE PLEINE" : "BATTERIE VIDE";

	return (
		<header className="flex justify-between mt-1 sm:mt-2 relative z-1">
			<div className="flex pl-2">
				{breadcrumbLinks.map((link, index) => (
					<div key={index} className="flex items-center gap-0.5 md:gap-2">
						{link}
						{(index < breadcrumbLinks.length - 1) && (
							<span className="text-greyTextInfo font-openSansBold text-[0.6rem] mr-1 sm:text-xs md:text-base lg:text-xl"> &gt; </span>
						)}
					</div>
				))}
			</div>
			<h1 className="text-greyTextInfo font-openSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl pr-2.5">
				{batteryStatus}
			</h1>
		</header >
	);
}