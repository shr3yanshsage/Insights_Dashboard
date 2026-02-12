/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        deepblue: '#0d1b2a',
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
};
