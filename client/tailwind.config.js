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
        dark: '#121212',
        card: {
          dark: '#1E1E1E',
          light: '#FFFFFF',
        },
        primary: {
          dark: '#FFBF00',
          light: '#D97706',
          glow: 'rgba(255, 191, 0, 0.4)'
        },
        bg: {
          dark: '#121212',
          light: '#F8FAFC'
        },
        text: {
          primary: {
            dark: '#F8FAFC',
            light: '#1a1a1a'
          },
          secondary: {
            dark: '#A0A0A0',
            light: '#475569'
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
