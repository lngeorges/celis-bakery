/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#f6efe1',
          200: '#eedeba',
          300: '#e3c78e',
          400: '#d8b56d',
        },
        burgundy: {
          400: '#a93a3a',
          500: '#8c2323',
          600: '#731c1c',
          700: '#591616',
          800: '#451111',
          900: '#3a0e0e',
        },
        gold: {
          400: '#d4af37',
          500: '#b8972e',
        },
        wood: {
          400: '#9a7a5f',
          500: '#7b5d43',
          700: '#5d4532',
          800: '#4a3728',
          900: '#2d2218',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair-display)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};