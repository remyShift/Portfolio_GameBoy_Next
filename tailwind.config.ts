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
				openSans: ["var(--font-openSans)"],
				openSansBold: ["var(--font-openSansBold)"],
				openSansItalic: ["var(--font-openSansItalic)"],
				openSansBoldItalic: ["var(--font-openSansBoldItalic)"],
				pressStart2P: ["var(--font-pressStart2P)"],
			},
			boxShadow: {
				shadowsPiv: "0 0.1rem 0 0 #6A6157, 0 0.35rem 0 0 #d0c5bb, 0 0.5rem 0 0.15rem #F8E9D9",
				shadowPivBigger: "0 0.3rem 0 0 #6A6157, 0 0.8rem 0 0 #d0c5bb, 0 1rem 0 0.2rem #F8E9D9",
				shadowPivInset: "inset 0 -0.5rem 0.7rem -0.5rem #111, inset 0 0.5rem 0.4rem -0.6rem #111",
				shadowPivBot: "inset 0 -0.5rem 0.7rem -0.5rem #111",
				shadowTop: "0 0.4rem 0.2rem -0.2rem rgba(0, 0, 0, 0.5)"
			},
			borderWidth: {
				piv: "1px",
			},
			borderColor: {
				pivGrey: "#6A6157",
			},
			textStrokeWidth: {
				DEFAULT: '0.15rem',
				bigger: '0.25rem',
			},
			textStrokeColor: {
				wine: '#C6AF87',
			},
		},
		variants: {
			extend: {
				inset: ["group-hover"],
			}
		}
	},
	plugins: [

	],
};

export default config;