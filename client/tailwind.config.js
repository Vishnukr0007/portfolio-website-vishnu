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
        dark: '#0a0a0b',
        card: '#131315',
        primary: {
          DEFAULT: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.5)'
        },
        secondary: '#06b6d4',
        accent: '#f472b6',
        text: {
            primary: '#ffffff',
            secondary: '#a1a1aa'
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
