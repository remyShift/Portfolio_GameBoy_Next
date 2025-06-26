import type { Metadata } from "next";
import "./globals.css";
import GlobalTemplate from "@/components/Global_Template/Global_Template";
import { Press_Start_2P } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import localFont from "next/font/local";

const gillSans = localFont({
	src: [
		{
			path: '../../public/fonts/GillSans/GillSansC.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/GillSans-Bold/GillSansC-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../../public/fonts/GillSans-Italic/GillSansC-Italic.ttf',
			weight: '400',
			style: 'italic',
		},
		{
			path: '../../public/fonts/GillSans-BoldItalic/GillSansC-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		}
	],
	variable: "--font-gillSans",
});


const pressStart2P = Press_Start_2P({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-pressStart2P",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://remyshift.dev"),
	title: {
		default: "Portfolio remyShift",
		template: "%s | Portfolio remyShift",
	},
	description: "Portfolio de Rémy Cassagne, développeur fullstack.",
	icons: {
		icon: "https://remyshift.dev/assets/icons/gameboy.ico",
	},
	openGraph: {
		title: "Portfolio remyShift",
		description: "Bienvenue sur le portfolio de Rémy Cassagne !",
		url: "https://remyshift.dev",
		siteName: "remyshift",
		images: [
			{
				url: "https://remyshift.dev/assets/img/thumbnail-og.png",
				width: 1200,
				height: 630,
				alt: "portfolio thumbnail",
			},
		],
		locale: "fr-FR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Portfolio remyShift",
		description: "Bienvenue sur le portfolio de Rémy Cassagne !",
		images: ["https://remyshift.dev/assets/img/thumbnail-og.png"],
	},
	keywords: ["portfolio", "dev", "developer", "développeur", "remyshift"],

};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${pressStart2P.variable} ${gillSans.variable} h-[100dvh] font-gillSans`}>
			<body className="w-full h-full">
				<GlobalTemplate>
					{children}
				</GlobalTemplate>
				<SpeedInsights />
			</body>
		</html>
	);
}
