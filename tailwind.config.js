/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // These colors are also defined in ./src/app/muiTheme.ts
        theme: '#27143C',
        accent: '#FFB800',
        chalk: '#F0F0F0',
      },
    },
  },
  corePlugins: {
    fontFamily: false,
  },
  plugins: [require('tailwindcss-safe-area')],
};
