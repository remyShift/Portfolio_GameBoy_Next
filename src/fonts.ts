import localFont from "next/font/local";

export const gillSans = localFont({
	src: [
		{
			path: "./fonts/GillSans/GillSans.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "./fonts/GillSans/GillSans.woff",
			weight: "400",
			style: "normal",
		},
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
			path: "./fonts/GillSans/GillSans-Bold.woff2",
			weight: "700",
			style: "normal",
		},
		{
			path: "./fonts/GillSans/GillSans-Bold.woff",
			weight: "700",
			style: "normal",
		},
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
			path: "./fonts/GillSans/GillSans-Italic.woff2",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/GillSans/GillSans-Italic.woff",
			weight: "400",
			style: "italic",
		},
		{
			path: "./fonts/GillSans/GillSans-Italic.otf",
			weight: "400",
			style: "italic",
		}
	],
	variable: "--font-gill-sans-italic"
});

export const gillSansBoldItalic = localFont({
	src: [
		{
			path: "./fonts/GillSans/GillSans-Bold-Italic.woff2",
			weight: "700",
			style: "italic",
		},
		{
			path: "./fonts/GillSans/GillSans-Bold-Italic.woff",
			weight: "700",
			style: "italic",
		},
		{
			path: "./fonts/GillSans/GillSans-Bold-Italic.otf",
			weight: "700",
			style: "italic",
		}
	],
	variable: "--font-gill-sans-bold-italic"
});