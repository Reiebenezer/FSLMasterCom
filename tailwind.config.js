/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./components/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'primary': 'hsl(var(--color-primary))',
        'accent': 'hsl(var(--color-accent))',

        'light': {
          100: 'hsl(var(--color-light-100))',
          200: 'hsl(var(--color-light-200))',
        },
        
        'dark': {
          100: 'hsl(var(--color-dark-100))',
          200: 'hsl(var(--color-dark-200))'
        }
      },
      fontFamily: {
        'poppins': ['Poppins_400Regular'],
        'poppins-bold': ['Poppins_700Bold'],
        'gi': ['GlacialIndifference']
      }
    },
  },
  plugins: [
    ({ addBase }) => {
      addBase({
        ":root": {
          "--color-primary": "0, 57%, 39%",
          "--color-accent": "23, 98%, 59%",

          "--color-light-100": "0, 0%, 100%",
          "--color-light-200": "216, 12%, 84%",

          "--color-dark-100": "215, 14%, 34%",
          "--color-dark-200": "221, 39%, 11%",
        }
      })
    }
  ],
}

