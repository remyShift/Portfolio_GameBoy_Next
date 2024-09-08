import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			colors: {
				topBrown: "#726456",
				cream: "#F8E9D9",
				wine: "#5C131D",
				greyScreen: "#CFCCCC",
				greyTextInfo: "#747474",
			},
			fontFamily: {
				gillSans: ["var(--font-gill-sans)"],
				gillSansBold: ["var(--font-gill-sans-bold)"],
				gillSansItalic: ["var(--font-gill-sans-italic)"],
				gillSansBoldItalic: ["var(--font-gill-sans-bold-italic)"],
			},
			boxShadow: {
				shadowPiv: "0 0.4rem 0 0 #6A6157, 0 0.6rem 0 0 #BFB2A4",
			},
		},
	},
	plugins: [],
};

export default config;