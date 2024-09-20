"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useValidPaths } from "@/context/store";

export default function TopScreen() {
	const { validPaths } = useValidPaths();
	const pathname = usePathname();

	const generateLinks = (path: string) => {
		const basePath = path === "/" ? "@ACCUEIL" : `@ACCUEIL/${path.substring(1).toUpperCase().trim()}`;
		const parts = basePath.split('/');

		return parts.map((part, index) => {
			const linkPath = part === "@ACCUEIL" ? '/' : '/' + parts.slice(1, index + 1).join('/').toLowerCase();
			return {
				label: part === "@ACCUEIL" ? part : validPaths.includes('/' + part.toLowerCase()) ? `/${part}` : `/404`,
				path: linkPath
			};
		});
	};

	const links = generateLinks(pathname);

	const generateBatteryStatus = () => {
		return validPaths.includes(pathname) ? "BATTERIE PLEINE" : "BATTERIE VIDE";
	}

	return (
		<div className="flex justify-between pt-2 relative z-1">
			<div className="flex pl-2">
				{links.map((link, index) => (
					<Link key={index} href={link.path} className="text-greyTextInfo font-gillSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline">
						{link.label}
					</Link>
				))}
			</div>
			<h1 className="text-greyTextInfo font-gillSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl pr-2.5">
				{generateBatteryStatus()}
			</h1>
		</div>
	);
}