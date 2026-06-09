/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#020617',
          secondary: '#0F172A',
          tertiary: '#111827',
        },
        primary: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          secondary: '#A855F7',
        },
        text: {
          primary: '#F8FAFC',
          secondary: '#CBD5E1',
        },
        border: 'rgba(255,255,255,0.08)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
