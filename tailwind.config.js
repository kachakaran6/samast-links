import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#9E2A2B",
        "primary-500": "#9E2A2B",
        "primary-600": "#801F20",
        "secondary-500": "#D97706",
        "off-white": "#F4F4F5",
        red: "#EF4444",
        "dark-1": "#09090B",
        "dark-2": "#121215",
        "dark-3": "#18181B",
        "dark-4": "#27272A",
        "light-1": "#F4F4F5",
        "light-2": "#E4E4E7",
        "light-3": "#A1A1AA",
        "light-4": "#71717A",
      },
      screens: {
        xs: "480px",
        xmd: "968px",
      },
      width: {
        420: "420px",
        465: "465px",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        inter: ["Plus Jakarta Sans", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};
