/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
      },
      colors:
        {
          'blue-custom': '#4188A7',
          'blue-custom-hvr': "#306075",
        }
    },
  },
  plugins: [],
}

