/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Manrope"', "system-ui", "sans-serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        brut: "0 28px 70px -44px rgba(15, 23, 42, 0.36)",
        "brut-sm": "0 18px 44px -32px rgba(15, 23, 42, 0.26)",
        "brut-red": "0 18px 44px -28px rgba(255, 59, 48, 0.38)",
      },
    },
  },
  plugins: [],
};
