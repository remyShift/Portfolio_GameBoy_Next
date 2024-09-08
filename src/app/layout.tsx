import type { Metadata } from "next";
import "./globals.css";
import GlobalTemplate from "@/components/Global_Template/Global_Template";
import { gillSans, gillSansBold, gillSansItalic, gillSansBoldItalic } from "../fonts";

export const metadata: Metadata = {
	title: "Portfolio remyShift",
	description: "Portfolio Gameboy de Rémy",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${gillSans.variable} ${gillSansBold.variable} ${gillSansItalic.variable} ${gillSansBoldItalic.variable}`}>
			<body className="w-[100dvw] h-[100dvh]">
				<GlobalTemplate>
					{children}
				</GlobalTemplate>
			</body>
		</html>
	);
}
