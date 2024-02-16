// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        textLight: "#e0e0e0",
        bgDark: "#0a0a0a",
        bgDarkCard: "#11100e",
        bgDarkPopover: "#3b3b3b",
        bgLight: "#F1F1F1",
        bgLightCard: "#E2E2E2",
        bgLightPopover: "#b9b9b9",
        textDark: "#323232",
        secondary: "#0070F0",
        bgDarkSecondary: "#1C1C1C",
        bgLightSecondary: "#F0F0F0",

        tempBgDarkSecondary: "#0d0d10",
        tempBgLightSecondary: "#f6f6f6",
        tempBgDark: "#09090b",
        tempDarkHover: "#27272a",
        tempLighHover: "#f4f4f5",
        tempDarkHoverSecondary: "#4e4f51",
        tempDarkBorder: '#27272a',
        tempTextLight: '#fafafa',
        tempLightBorder: '#e4e4e7',
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  important: false,
}

export default config;
