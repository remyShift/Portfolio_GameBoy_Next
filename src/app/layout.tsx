import type { Metadata } from "next";
import "./globals.css";
import GlobalTemplate from "@/components/Global_Template/Global_Template";
import { Press_Start_2P } from "next/font/google";
import { Cabin } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const cabin = Cabin({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-cabin",
});

const cabinBold = Cabin({
	weight: ["700"],
	subsets: ["latin"],
	variable: "--font-cabinBold",
});

const cabinItalic = Cabin({
	weight: ["400"],
	subsets: ["latin"],
	style: ["italic"],
	variable: "--font-cabinItalic",
});

const cabinBoldItalic = Cabin({
	weight: ["700"],
	subsets: ["latin"],
	style: ["italic"],
	variable: "--font-cabinBoldItalic",
});

const pressStart2P = Press_Start_2P({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-pressStart2P",
});

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
		<html lang="en" className={`${pressStart2P.variable} ${cabin.variable} ${cabinBold.variable} ${cabinItalic.variable} ${cabinBoldItalic.variable} h-[100dvh]`}>
			<body className="w-full h-full">
				<GlobalTemplate>
					{children}
				</GlobalTemplate>
				<SpeedInsights />
			</body>
		</html>
	);
}
