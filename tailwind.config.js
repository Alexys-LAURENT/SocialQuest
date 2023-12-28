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
        secondary: "#0070F0",
        darkSecondary: "#1C1C1C",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
  important: true,
}

export default config;
