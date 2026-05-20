/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50:  '#FDF8F0',
          100: '#F9EDDA',
          200: '#F2D9B0',
          300: '#E8C07A',
          400: '#D9A04A',
          500: '#C4852A',
          600: '#A06B1E',
          700: '#7A5016',
          800: '#54370F',
          900: '#2E1E08',
        },
        ocean: {
          50:  '#E8F4F8',
          100: '#C5E4EE',
          200: '#8FCCDE',
          300: '#52ADCA',
          400: '#2090B5',
          500: '#0E7496',
          600: '#095B78',
          700: '#064358',
          800: '#032C3A',
          900: '#01161D',
        },
        savane: {
          50:  '#F2F7EC',
          100: '#D8EBCA',
          200: '#B0D590',
          300: '#82BA52',
          400: '#5C9A2E',
          500: '#437A1E',
          600: '#315C14',
          700: '#22420D',
          800: '#152A08',
          900: '#091503',
        },
        terracotta: {
          50:  '#FCF0EC',
          100: '#F7D4C8',
          200: '#EFA899',
          300: '#E47060',
          400: '#D44030',
          500: '#B52D1E',
          600: '#8E2116',
          700: '#68170F',
          800: '#430F09',
          900: '#200703',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        accent: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'card': '0 4px 24px rgba(196, 133, 42, 0.12)',
        'card-hover': '0 12px 40px rgba(196, 133, 42, 0.22)',
      },
    },
  },
  plugins: [],
}