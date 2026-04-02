/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        brut: "6px 6px 0 0 rgba(255, 255, 255, 0.12)",
        "brut-sm": "4px 4px 0 0 rgba(255, 255, 255, 0.1)",
        "brut-red": "5px 5px 0 0 var(--accent-red)",
      },
    },
  },
  plugins: [],
};
