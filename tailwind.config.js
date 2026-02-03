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
        // Main Aegis Colors (kept intact)
        'aegis-black': '#000000',
        'aegis-white': '#ffffff',
        'aegis-brown': '#c99565',
        'aegis-burgundy': '#e4bc96',
        'aegis-dark-gray': '#1a1a1a',
        'aegis-off-white': '#f8f8f8',
        'aegis-highlight': '#c99565',
        'aegis-brown-dark': '#a67c52',
        'aegis-brown-light': '#dbb899',

        // Enhanced Gold Palette
        'gold': {
          50: '#fefdf7',
          100: '#fef7e0',
          200: '#fdecc4',
          300: '#fbdb9a',
          400: '#f8c572',
          500: '#e4bc96',  // aegis-burgundy
          600: '#c99565',  // aegis-brown
          700: '#a67c52',  // aegis-brown-dark
          800: '#8b6640',
          900: '#6d4f32',
        },

        // Sophisticated Gray Palette
        'neutral': {
          50: '#f9f9f9',
          100: '#f0f0f0',
          200: '#e4e4e4',
          300: '#d1d1d1',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Deep Charcoal Variations
        'charcoal': {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#454545',
          900: '#3d3d3d',
          950: '#1a1a1a',  // aegis-dark-gray
        },

        // Warm Accent Colors
        'amber': {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },

        // Elegant Copper Tones
        'copper': {
          50: '#fdf7f0',
          100: '#f9e6d3',
          200: '#f3d5b7',
          300: '#e4bc96',  // matches aegis-burgundy
          400: '#d4a574',
          500: '#c99565',  // matches aegis-brown
          600: '#b8845a',
          700: '#a67c52',  // matches aegis-brown-dark
          800: '#8b6640',
          900: '#6d4f32',
        },

        // Subtle Blue Accents (for links/interactive elements)
        'slate-blue': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },

        // Status Colors
        'success': '#22c55e',
        'warning': '#f59e0b',
        'error': '#ef4444',
        'info': '#3b82f6',
      },
      fontFamily: {
        'logo': ['Cinzel', 'serif'],
        'heading': ['Bebas Neue', 'Oswald', 'Anton', 'Impact', 'Arial Black', 'sans-serif'],
        'subheading': ['Sanchez', 'Georgia', 'serif'],
        'body': ['Libre Baskerville', 'Georgia', 'serif'],
        'lexend': ['Lexend', 'sans-serif'],
        'knockout': ['Bebas Neue', 'Oswald', 'Anton', 'Impact', 'Arial Black', 'sans-serif'],
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
        '.bg-gradient-gold-warm': {
          'background': 'linear-gradient(135deg, #a67c52, #c99565, #e4bc96)',
        },
        '.bg-gradient-gold-rich': {
          'background': 'linear-gradient(135deg, #6d4f32, #8b6640, #c99565)',
        },
        '.bg-gradient-charcoal': {
          'background': 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #262626)',
        },
        '.bg-gradient-neutral': {
          'background': 'linear-gradient(135deg, #171717, #404040, #737373)',
        },
        '.bg-gradient-copper': {
          'background': 'linear-gradient(135deg, #8b6640, #c99565, #f3d5b7)',
        },
        '.bg-gradient-radial': {
          'background': 'radial-gradient(circle, var(--tw-gradient-stops))',
        },
        '.bg-gradient-radial-gold': {
          'background': 'radial-gradient(circle, #e4bc96, #c99565, #a67c52)',
        },
        '.border-gradient': {
          'border': '2px solid',
          'border-image': 'linear-gradient(135deg, #c99565, #e4bc96) 1',
        },
        '.border-gradient-warm': {
          'border': '2px solid',
          'border-image': 'linear-gradient(135deg, #a67c52, #c99565, #e4bc96) 1',
        },
      }
      addUtilities(newUtilities)
    }
  ],
} 