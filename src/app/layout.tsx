import type { Metadata } from "next";
import "./globals.css";
import GlobalTemplate from "@/components/Global_Template/Global_Template";
import { Press_Start_2P } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-openSans",
});

const openSansBold = Open_Sans({
	weight: ["700"],
	subsets: ["latin"],
	variable: "--font-openSansBold",
});

const openSansItalic = Open_Sans({
	weight: ["400"],
	subsets: ["latin"],
	style: ["italic"],
	variable: "--font-openSansItalic",
});

const openSansBoldItalic = Open_Sans({
	weight: ["700"],
	subsets: ["latin"],
	style: ["italic"],
	variable: "--font-openSansBoldItalic",
});

const pressStart2P = Press_Start_2P({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-pressStart2P",
});

export const metadata: Metadata = {
	title: "Portfolio remyShift",
	description: "Portfolio Gameboy de Rémy",
	icons: {
		icon: "/assets/icons/gameboy.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${pressStart2P.variable} ${openSans.variable} ${openSansBold.variable} ${openSansItalic.variable} ${openSansBoldItalic.variable} h-[100dvh]`}>
			<body className="w-full h-full">
				<GlobalTemplate>
					{children}
				</GlobalTemplate>
				<SpeedInsights />
			</body>
		</html>
	);
}
