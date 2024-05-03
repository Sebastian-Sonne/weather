/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'bg': '#0b131e',
        'bg-secondary': '#202b3b',
      },
      screens: {
        'xs': '450px'
      },
    },
  },
  plugins: [],
}

