/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        skillio: {
          purple: '#7956D8',         // Main purple
          plum: '#302747',           // Deep plum
          'soft-lavender': '#E9DFFF',// Soft lavender
          'pale-lavender': '#F3EDFF',// Pale lavender
          peach: '#FFE1D2',          // Warm peach
          orange: '#FF914D',         // Soft orange
          yellow: '#FFD45C',         // Butter yellow
          mint: '#DDF3E8',           // Soft mint
          offwhite: '#FFFCF8',       // Warm off-white
          // Helper nuances
          'purple-deep': '#6542BC',
          'purple-lavender': '#A78BFA',
          'plum-muted': '#5D5473',
          'plum-light': '#8F86A5',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'playful-purple': '0 6px 0 0 #6542BC',
        'playful-purple-sm': '0 3px 0 0 #6542BC',
        'playful-orange': '0 4px 0 0 #e6742d',
        'playful-peach': '0 4px 0 0 #f0c3ad',
        'playful-lavender': '0 4px 0 0 #E9DFFF',
        'skillio-card': '0 4px 20px -2px rgba(48, 39, 71, 0.06), 0 2px 6px -1px rgba(121, 86, 216, 0.04)',
        'skillio-card-hover': '0 12px 28px -4px rgba(121, 86, 216, 0.16), 0 4px 10px -2px rgba(48, 39, 71, 0.06)',
        'blobby-glow': '0 0 25px rgba(255, 145, 77, 0.3)',
      },
      keyframes: {
        blobbyBreathe: {
          '0%, 100%': { transform: 'scale(1) translateY(0)' },
          '50%': { transform: 'scale(1.03, 0.97) translateY(-6px)' },
        },
        blobbyFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1.2deg)' },
        },
        blobbyBlink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' },
        },
        blobbyWave: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(20deg)' },
          '75%': { transform: 'rotate(-10deg)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.94) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'blobby-breathe': 'blobbyBreathe 3.5s ease-in-out infinite',
        'blobby-float': 'blobbyFloat 4s ease-in-out infinite',
        'blobby-blink': 'blobbyBlink 4s infinite',
        'blobby-wave': 'blobbyWave 1.2s ease-in-out infinite',
        'pop-in': 'popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
}
