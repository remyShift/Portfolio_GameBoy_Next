import type { Metadata } from "next";
import "./globals.css";
import GlobalTemplate from "@/components/Global_Template/Global_Template";
import { Press_Start_2P } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const gillSans = {
	fontFamily: "GillSans",
	fontWeight: "400",
	fontStyle: "normal",
	subsets: ["latin"],
	variable: "--font-gillSans",
};

const gillSansBold = {
	fontFamily: "GillSans-Bold",
	fontWeight: "700",
	fontStyle: "normal",
	subsets: ["latin"],
	variable: "--font-gillSansBold",
};

const gillSansItalic = {
	fontFamily: "GillSans-Italic",
	fontWeight: "400",
	fontStyle: "italic",
	subsets: ["latin"],
	variable: "--font-gillSansItalic",
};

const gillSansBoldItalic = {
	fontFamily: "GillSans-BoldItalic",
	fontWeight: "700",
	subsets: ["latin"],
	fontStyle: "italic",
	variable: "--font-gillSansBoldItalic",
};

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
		<html lang="en" className={`${pressStart2P.variable} ${gillSans.variable} ${gillSansBold.variable} ${gillSansItalic.variable} ${gillSansBoldItalic.variable} h-[100dvh]`}>
			<body className="w-full h-full">
				<GlobalTemplate>
					{children}
				</GlobalTemplate>
				<SpeedInsights />
			</body>
		</html>
	);
}
