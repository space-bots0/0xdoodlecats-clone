/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1440px',
      // => @media (min-width: 1440px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      colors: {
        synth: {
          100: '#471e53',
          200: '#dc507e',
          300: '#e68e35',
          400: '#556dc8',
          500: '#7b99ee',
        },
        dark: '#222222',
        light: '#eeeeee',
      },
      scale: {
        101: '1.01',
      },
      borderWidth: {
        thin: '0.2px',
      },
      ringWidth: {
        thin: '0.2px',
      },
      maxWidth: {
        project: '21rem',
        container: '60ch',
      },
      spacing: {
        15: '3.75rem',
        30: '7.5rem',
        35: '8.75rem',
        50: '12.5rem',
        70: '17.5rem',
        120: '30rem',
        160: '40rem',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
}
