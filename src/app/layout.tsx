import type { Metadata } from "next";
import "./globals.css";
import GlobalTemplate from "@/components/Global_Template/Global_Template";
import { Press_Start_2P } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

const gillSans = localFont({
	src: [
		{
			path: '../../public/fonts/GillSans/GillSansC.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/GillSans/GillSansC.woff2',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/GillSans/GillSansC.ttf',
			weight: '400',
			style: 'normal',
		}
	],
	variable: "--font-gillSans",
});


const gillSansBold = localFont({
	src: [
		{
			path: '../../public/fonts/GillSans-Bold/GillSansC-Bold.woff',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/GillSans-Bold/GillSansC-Bold.woff2',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/GillSans-Bold/GillSansC-Bold.ttf',
			weight: '700',
			style: 'normal',
		}
	],
	variable: "--font-gillSansBold",
});

const gillSansItalic = localFont({
	src: [
		{
			path: '../../public/fonts/GillSans-Italic/GillSansC-Italic.woff',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/GillSans-Italic/GillSansC-Italic.woff2',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/GillSans-Italic/GillSansC-Italic.ttf',
			weight: '400',
			style: 'italic',
		}
	],
	variable: "--font-gillSansItalic",
});

const gillSansBoldItalic = localFont({
	src: [
		{
			path: '../../public/fonts/GillSans-BoldItalic/GillSansC-BoldItalic.woff',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/fonts/GillSans-BoldItalic/GillSansC-BoldItalic.woff2',
			weight: '700',
			style: 'italic',
		},
		{
			path: '../../public/fonts/GillSans-BoldItalic/GillSansC-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		}
	],
	variable: "--font-gillSansBoldItalic",
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
