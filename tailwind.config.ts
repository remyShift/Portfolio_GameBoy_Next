import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		backgroundImage: {
    			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
    			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
    		},
    		colors: {
    			topBrown: '#726456',
    			cream: '#F8E9D9',
    			wine: '#5C131D',
    			greyScreen: '#CFCCCC',
    			greyTextInfo: '#747474',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			gillSans: ["var(--font-gillSans)"],
    			pressStart2P: ["var(--font-pressStart2P)"]
    		},
    		boxShadow: {
    			shadowsPiv: '0 0.1rem 0 0 #6A6157, 0 0.35rem 0 0 #d0c5bb, 0 0.5rem 0 0.15rem #F8E9D9',
    			shadowPivBigger: '0 0.3rem 0 0 #6A6157, 0 0.8rem 0 0 #d0c5bb, 0 1rem 0 0.2rem #F8E9D9',
    			shadowPivInset: 'inset 0 -0.5rem 0.7rem -0.5rem #111, inset 0 0.5rem 0.4rem -0.6rem #111',
    			shadowPivBot: 'inset 0 -0.5rem 0.7rem -0.5rem #111',
    			shadowTop: '0 0.4rem 0.2rem -0.2rem rgba(0, 0, 0, 0.5)'
    		},
    		borderWidth: {
    			piv: '1px'
    		},
    		borderColor: {
    			pivGrey: '#6A6157'
    		},
    		textStrokeWidth: {
    			DEFAULT: '0.15rem',
    			bigger: '0.25rem'
    		},
    		textStrokeColor: {
    			sand: '#C6AF87'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [
        require("tailwindcss-animate")
    ],
};

export default config;