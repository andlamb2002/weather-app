/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#EBEFEF",
        text: '#2D2F34',
        header: '#3A91C4',
        darkBg: '#1A3F56',
        white: '#FFFFFF',
        whiteHover: '#C2C2C2',
        black: "#000000",
        orange: '#FFCF99',
        orangeHover: '#FFB561', 
      },
      fontFamily: {
        sans: ['"Open Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

