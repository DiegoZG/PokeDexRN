/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'pokemon-red': '#FF0000',
        'pokemon-blue': '#3B4CCA',
        'pokemon-yellow': '#FFDE00',
        'pokemon-green': '#4CAF50',
      },
    },
  },
  plugins: [],
} 