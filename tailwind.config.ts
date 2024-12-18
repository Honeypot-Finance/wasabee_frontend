import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		size: {
  			'4.5': '1.125rem'
  		},
  		colors: {
  			'gold-primary': '#e8c24a',
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
  		fontSize: {
  			ss: [
  				'0.8125rem',
  				'1.125rem'
  			]
  		},
  		fontFamily: {
  			display: 'Oswald, ui-serif',
  			gliker: [
  				'Gliker',
  				'sans-serif'
  			]
  		},
  		backgroundColor: {
  			default: 'var(--bg,#140E06)'
  		},
  		textColor: {
  			default: 'white',
  			sub: 'rgba(255,255,255,0.50)'
  		},
  		outlineColor: {
  			base: 'var(--button-stroke,rgba(247,147,26,0.20))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ["class", "class"],
  plugins: [
    require("tailwindcss-textshadow"),
    nextui({
      // defaultTheme: "dark",
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#FFCD4D",
              50: "#523914",
              400: "#FFCD4D",
            },
          },
        },
      },
    }),
      require("tailwindcss-animate")
],
};
export default config;
