"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useValidPaths } from "@/context/store";

export default function TopScreen() {
	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const generateLinksProps = (path: string) => {
		const basePath = path === "/" ? "@ACCUEIL" : `@ACCUEIL/${path.substring(1).toUpperCase().trim()}`;
		const parts = basePath.split('/');

		return parts.map((part, index) => {
			const isWelcomePage = part === "@ACCUEIL";
			const linkPath = isWelcomePage ? '/' : '/' + parts.slice(1, index + 1).join('/').toLowerCase();
			const label = isWelcomePage ? "@ACCUEIL" : validPaths.includes('/' + part.toLowerCase()) ? part : "404";

			return { label, path: linkPath };
		});
	};

	const linksProps = generateLinksProps(pathname);

	const generateBatteryStatus = () => {
		return validPaths.includes(pathname) ? "BATTERIE PLEINE" : "BATTERIE VIDE";
	}

	return (
		<header className="flex justify-between mt-1 sm:mt-2 relative z-1">
			<div className="flex pl-2">
				{linksProps.map((link, index) => (
					<div key={index} className="flex items-center gap-0.5 md:gap-2">
						<Link href={link.path} className="text-greyTextInfo font-openSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline">
							{link.label}
						</Link>
						{(index < linksProps.length - 1) && (
							<span className="text-greyTextInfo font-openSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl"> &gt; </span>
						)}
					</div>
				))}
			</div>
			<h1 className="text-greyTextInfo font-openSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl pr-2.5">
				{generateBatteryStatus()}
			</h1>
		</header >
	);
}