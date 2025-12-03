const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // Minimal Mode Colors
        mambo: {
          black: '#0D0D0D',
          white: '#FAFAFA',
          ember: '#FF1A1A',        // El punto rojo de la brasa
          neutral: {
            900: '#111827',
            700: '#374151',
            500: '#6B7280',
            300: '#D1D5DB',
            100: '#F3F4F6',
          }
        },
        // Retro 90s Mode Colors
        retro: {
          magenta: '#FF00C8',
          cyan: '#00C4FF',
          lime: '#8FFF00',
          orange: '#FF7A00',
          yellow: '#FFEA00',
          purple: '#9D00FF',
          pink: '#FF69B4',
          slime: '#39FF14',
        },
        // Semantic colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...fontFamily.sans],
        display: ['var(--font-poppins)', ...fontFamily.sans],
        retro: ['var(--font-press-start)', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'ember-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px #FF1A1A, 0 0 10px #FF1A1A',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 15px #FF1A1A, 0 0 25px #FF1A1A',
            opacity: '0.8'
          },
        },
        'smoke-rise': {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.6' },
          '100%': { transform: 'translateY(-20px) scale(1.5)', opacity: '0' },
        },
        'neon-flicker': {
          '0%, 19%, 21%, 23%, 25%, 54%, 56%, 100%': {
            textShadow: '0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #FF00C8, 0 0 80px #FF00C8',
          },
          '20%, 24%, 55%': {
            textShadow: 'none',
          },
        },
        'vhs-glitch': {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'ember-glow': 'ember-glow 2s ease-in-out infinite',
        'smoke-rise': 'smoke-rise 3s ease-out infinite',
        'neon-flicker': 'neon-flicker 1.5s infinite alternate',
        'vhs-glitch': 'vhs-glitch 0.3s infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'retro-grid': `
          linear-gradient(to right, rgba(255,0,200,0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,0,200,0.1) 1px, transparent 1px)
        `,
        'vhs-noise': `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
