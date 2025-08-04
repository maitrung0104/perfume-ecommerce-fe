/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // nếu dùng React hoặc Vite
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}
