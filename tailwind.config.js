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
        // Paper & Ink Design System Tokens (Dark & Light theme aware)
        canvas: "var(--canvas-bg, #181A18)",
        surface: "var(--surface-bg, #222522)",
        "surface-muted": "var(--surface-muted, #2C302C)",
        ink: "var(--text-main, #F4F0E8)",
        "ink-muted": "var(--text-muted, #B5BAB2)",
        border: "var(--border-color, #3B403B)",

        accent: "var(--accent-color, #D17A67)",
        "accent-hover": "var(--accent-hover, #E39782)",
        "accent-soft": "var(--accent-soft, rgba(209, 122, 103, 0.18))",
        success: "#6EBB91",
        warning: "#D9A64E",
        destructive: "#F08A82",

        // Dynamic Accent Mappings
        primary: "var(--accent-color, #D17A67)",
        "primary-500": "var(--accent-color, #D17A67)",
        "primary-600": "var(--accent-hover, #E39782)",
        "secondary-500": "#D9A64E",
        "off-white": "#F4F0E8",
        red: "#F08A82",
        "dark-1": "#181A18",
        "dark-2": "#222522",
        "dark-3": "#2C302C",
        "dark-4": "#3B403B",
        "light-1": "#F4F0E8",
        "light-2": "#EAE5DC",
        "light-3": "#B5BAB2",
        "light-4": "#888E85",
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
        sans: ["Manrope", "sans-serif"],
        serif: ["Newsreader", "serif"],
        inter: ["Manrope", "sans-serif"],
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
