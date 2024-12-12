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
        "4.5": "1.125rem",
      },
      colors: {
        "gold-primary": "#e8c24a",
      },
      fontSize: {
        ss: ["0.8125rem", "1.125rem"],
      },
      fontFamily: {
        display: "Oswald, ui-serif", // Adds a new `font-display` class
        gliker: ["Gliker", "sans-serif"],
      },
      backgroundColor: {
        default: "var(--bg,#140E06)",
      },
      textColor: {
        default: "white",
        sub: "rgba(255,255,255,0.50)",
      },
      outlineColor: {
        base: "var(--button-stroke,rgba(247,147,26,0.20))",
      },
    },
  },
  darkMode: "class",
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
  ],
};
export default config;
