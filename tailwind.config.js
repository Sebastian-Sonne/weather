/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        'bg-light': '#ffffff',
        'component-light': '#f0f0f0',
        'component-light-hover': '#9ca3af',

        'bg-dark': '#0b131e',
        'component-dark': '#202b3b',
        'component-dark-hover': '4b5563',

        'icon': '#ced4da',

        'primary-d': '#dde0e4',
        'secondary-d': '#8899a2',
        'accent-d': '#9399a2',

        'primary-l': '#1b1e22',
        'secondary-l': '#5e6f78',
        'accent-l': '#2b313b',
      },
      screens: {
        'xs': '450px'
      },
    },
  },
  plugins: [],
}

