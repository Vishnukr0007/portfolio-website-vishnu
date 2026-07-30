/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#060913',
        space: {
          deep: '#060913',
          card: '#0a0f1d',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        card: {
          dark: '#0a0f1d',
          light: '#FFFFFF',
        },
        primary: {
          dark: '#f59e0b',
          light: '#d97706',
          glow: 'rgba(245, 158, 11, 0.35)',
        },
        botanical: {
          emerald: '#10b981',
          leaf: '#34d399',
          glow: 'rgba(16, 185, 129, 0.3)',
          dark: '#059669',
        },
        starlight: {
          amber: '#fbbf24',
          gold: '#f59e0b',
          glow: 'rgba(251, 191, 36, 0.25)',
        },
        bg: {
          dark: '#060913',
          light: '#F8FAFC'
        },
        text: {
          primary: {
            dark: '#F8FAFC',
            light: '#1a1a1a'
          },
          secondary: {
            dark: '#94A3B8',
            light: '#475569'
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'orbit-slow': 'orbit 25s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(245, 158, 11, 0.4))' },
          '50%': { opacity: '0.8', filter: 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.6))' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
