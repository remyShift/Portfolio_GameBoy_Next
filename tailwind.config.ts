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
				pressStart2P: ["var(--font-pressStart2P)"],
			},
			boxShadow: {
				shadowsPiv: "0 0.1rem 0 0 #6A6157, 0 0.35rem 0 0 #d0c5bb, 0 0.5rem 0 0.15rem #F8E9D9",
				shadowPivBigger: "0 0.3rem 0 0 #6A6157, 0 0.8rem 0 0 #d0c5bb, 0 1rem 0 0.2rem #F8E9D9",
				shadowPivInset: "inset 0 -0.5rem 0.7rem -0.5rem #111, inset 0 0.5rem 0.4rem -0.6rem #111",
				shadowPivBot: "inset 0 -0.5rem 0.7rem -0.5rem #111",
			},
			borderWidth: {
				piv: "1px",
			},
			borderColor: {
				pivGrey: "#6A6157",
			},
		},
	},
	plugins: [],
};

export default config;