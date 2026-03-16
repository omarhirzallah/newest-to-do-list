/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lol-dark': '#010A13',
        'lol-blue': '#0A1428',
        'lol-gold': '#C89B3C',
        'lol-cyan': '#0BC5EA',
        'lol-purple': '#8B5CF6',
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(11, 197, 234, 0.5)',
        'glow-gold': '0 0 20px rgba(200, 155, 60, 0.5)',
      },
    },
  },
  plugins: [],
}
