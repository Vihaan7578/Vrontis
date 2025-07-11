/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px', 
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'aegis-black': '#000000',
        'aegis-white': '#ffffff',
        'aegis-brown': '#c99565',
        'aegis-burgundy': '#e4bc96',
        'aegis-dark-gray': '#1a1a1a',
        'aegis-off-white': '#f8f8f8',
        'aegis-highlight': '#c99565',
      },
      fontFamily: {
        'logo': ['Cinzel', 'serif'],
        'heading': ['Anton', 'Impact', 'Arial Black', 'sans-serif'],
        'subheading': ['Sanchez', 'Georgia', 'serif'],
        'body': ['Libre Baskerville', 'Georgia', 'serif'],
        'lexend': ['Lexend', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      boxShadow: {
        'lg': '0 4px 16px rgba(0, 0, 0, 0.3)',
        'xl': '0 8px 24px rgba(201, 149, 101, 0.2)',
        'glow': '0 0 16px rgba(201, 149, 101, 0.4)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      lineHeight: {
        'relaxed': '1.7',
      },
      letterSpacing: {
        'widest': '0.1em',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #c99565, #e4bc96)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-gradient-gold': {
          'background': 'linear-gradient(135deg, #c99565, #e4bc96)',
        },
        '.border-gradient': {
          'border': '2px solid',
          'border-image': 'linear-gradient(135deg, #c99565, #e4bc96) 1',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 