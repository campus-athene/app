/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: '#372649',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
