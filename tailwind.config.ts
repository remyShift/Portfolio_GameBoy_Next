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
				gillSans: ["Gill Sans", "sans-serif"],
				gillSansBold: ["Gill Sans Bold", "sans-serif"],
				gillSansBoldItalic: ["Gill Sans Bold Italic", "sans-serif"],
			}
		},
	},
	plugins: [],
};

export default config;