import localFont from "next/font/local";

export const gillSans = localFont({
	src: [
		{
			path: "./fonts/GillSans/GillSans.otf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-gill-sans"
});

export const gillSansBold = localFont({
	src: [
		{
			path: "./fonts/GillSans/GillSans-Bold.otf",
			weight: "700",
			style: "normal",
		}
	],
	variable: "--font-gill-sans-bold"
});

export const gillSansItalic = localFont({
	src: [
		{
			path: "./fonts/GillSans/GillSans-Italic.otf",
			weight: "700",
			style: "italic",
		}
	],
	variable: "--font-gill-sans-italic"
});

export const gillSansBoldItalic = localFont({
	src: [
		{
			path: "./fonts/GillSans/GillSans-Bold-Italic.otf",
			weight: "700",
			style: "italic",
		}
	],
	variable: "--font-gill-sans-bold-italic"
});