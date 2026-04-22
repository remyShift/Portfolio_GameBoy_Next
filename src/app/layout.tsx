import type { Viewport } from "next";
import "./globals.css";
import { Press_Start_2P } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import localFont from "next/font/local";
import { getLocale } from "next-intl/server";
import NavClickSound from "@/components/NavClickSound";
import PixelCursor from "@/components/PixelCursor";

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

export const viewport: Viewport = {
	themeColor: "#5c1a27",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = await getLocale();

	return (
		<html lang={locale} className={`${pressStart2P.variable} ${gillSans.variable} h-dvh font-gillSans`}>
			<body className="w-full h-full">
				{children}
				<Toaster position="top-center" richColors />
				<SpeedInsights />
				<NavClickSound />
				<PixelCursor />
			</body>
		</html>
	);
}
