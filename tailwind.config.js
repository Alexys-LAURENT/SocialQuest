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
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  important: false,
}

export default config;
