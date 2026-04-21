import type { Metadata, Viewport } from "next";
import "./globals.css";
import GameBoy from "@/components/gameboy/GameBoy";
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
	metadataBase: new URL("https://remy-shift.dev"),
	title: {
		default: "Portfolio remyShift",
		template: "%s | Portfolio remyShift",
	},
	description: "Portfolio de Rémy Cassagne, développeur fullstack.",
	icons: {
		icon: "/assets/icons/gameboy.ico",
	},
	openGraph: {
		title: "Portfolio remyShift",
		description: "Bienvenue sur le portfolio de Rémy Cassagne !",
		url: "https://remy-shift.dev",
		siteName: "remyshift",
		images: [
			{
				url: "/assets/img/thumbnail-og.png",
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
		images: ["/assets/img/thumbnail-og.png"],
	},
	keywords: ["portfolio", "dev", "developer", "développeur", "remyshift"],
	alternates: { canonical: "/" },
};

export const viewport: Viewport = {
	themeColor: "#5c1a27",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="fr" className={`${pressStart2P.variable} ${gillSans.variable} h-[100dvh] font-gillSans`}>
			<body className="w-full h-full">
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-black focus:text-white focus:px-3 focus:py-2 focus:rounded"
				>
					Aller au contenu principal
				</a>
				<GameBoy>
					{children}
				</GameBoy>
				<SpeedInsights />
			</body>
		</html>
	);
}
