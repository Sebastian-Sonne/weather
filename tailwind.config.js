/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0b131e',
        'bg-light': '#e1e9f4',
        'secondary-dark': '#202b3b',
        'secondary-light': '#c3cedf',
      },
      screens: {
        'xs': '450px'
      },
    },
  },
  plugins: [],
}

