/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        surfaceBorder: "var(--surface-border)",
        primary: "#2563eb",
        primaryHover: "#1d4ed8",
        accent: "#059669",
        accentCyan: "#0891b2"
      },
    },
  },
  plugins: [],
}
