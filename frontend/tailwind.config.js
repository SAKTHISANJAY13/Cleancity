/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        neon: {
          cyan: '#00D9FF',
          lime: '#39FF14',
          pink: '#FF1493',
          purple: '#A020F0',
          orange: '#FF6B35',
        },
        eco: {
          green: '#10B981',
          emerald: '#059669',
          teal: '#14B8A6',
        },
        vibrant: {
          indigo: '#4F46E5',
          violet: '#7C3AED',
          fuchsia: '#D946EF',
          rose: '#F43F5E',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        slideIn: 'slideIn 0.5s ease-out',
        glow: 'glow 2s ease-in-out infinite',
        shimmer: 'shimmer 3s infinite',
        neon: 'neon 1.5s ease-in-out infinite',
      },
      boxShadow: {
        neon: '0 0 10px #00D9FF, 0 0 20px rgba(0, 217, 255, 0.5)',
        'neon-pink': '0 0 10px #FF1493, 0 0 20px rgba(255, 20, 147, 0.5)',
        'neon-green': '0 0 10px #39FF14, 0 0 20px rgba(57, 255, 20, 0.5)',
      }
    },
  },
  plugins: [],
}
