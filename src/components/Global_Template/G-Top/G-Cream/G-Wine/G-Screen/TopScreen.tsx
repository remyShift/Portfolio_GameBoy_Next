"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TopScreen() {
	const pathname = usePathname();

	const formatPathname = (path: string) => {
		if (path === "/") return "@ACCUEIL";
		return `@ACCUEIL/${path.substring(1).toUpperCase().trim()}`;
	};

	const createLinks = (formattedPath: string) => {
		const parts = formattedPath.split('/');
		return parts.map((part, index) => {
			const linkPath = part === "ACCUEIL" ? part : '/' + parts.slice(1, index + 1).join('/').toLowerCase();
			return (
				<Link key={index} href={linkPath} className="text-greyTextInfo font-gillSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl hover:text-wine hover:underline">
					{part === "@ACCUEIL" ? part : `/${part}`}
				</Link>
			);
		});
	};

	return (
		<div className="flex justify-between pt-2 relative z-1">
			<div className="flex pl-2">
				{createLinks(formatPathname(pathname))}
			</div>
			<h1 className="text-greyTextInfo font-gillSansBold text-[0.6rem] sm:text-xs md:text-base lg:text-xl pr-2.5">
				BATTERIE PLEINE
			</h1>
		</div>
	);
}