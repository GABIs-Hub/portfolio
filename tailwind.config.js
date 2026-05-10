/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#10b981',
          800: '#059669',
          900: '#047857',
        },
        slate: {
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
        dark: {
          bg: '#030712',
          card: 'rgba(255,255,255,0.04)',
        },
        cyan: '#06b6d4',
        purple: '#8b5cf6',
        amber: '#f59e0b',
        pink: '#ec4899',
      },
      fontFamily: {
        syne: ["'Syne'", 'sans-serif'],
        sans: ["'DM Sans'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      keyframes: {
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        rotate: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        fadeDown: 'fadeDown 0.7s ease both',
        fadeUp: 'fadeUp 0.7s ease both',
        blink: 'blink 1s infinite',
        slideInLeft: 'slideInLeft 0.6s ease both',
        slideInRight: 'slideInRight 0.6s ease both',
        scaleIn: 'scaleIn 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        shimmer: 'shimmer',
        rotate: 'rotate',
        float: 'float 1s ease-in-out infinite',
        pulse: 'pulse',
      },
      spacing: {
        clamp: 'clamp(1rem, 5vw, 3rem)',
        clampLarge: 'clamp(1rem, 6vw, 5rem)',
      },
      backgroundImage: {
        'gradient-cyan-purple': 'linear-gradient(90deg, #06b6d4, #8b5cf6)',
        'gradient-purple-pink': 'linear-gradient(90deg, #8b5cf6, #ec4899)',
        'gradient-green-cyan': 'linear-gradient(90deg, #10b981, #06b6d4)',
        'gradient-amber-red': 'linear-gradient(90deg, #f59e0b, #ef4444)',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glow: '0 0 20px rgba(16,185,129,0.3)',
        'glow-lg': '0 0 30px rgba(16,185,129,0.5)',
        'glow-cyan': '0 0 20px rgba(6,182,212,0.3)',
        'glow-purple': '0 0 20px rgba(139,92,246,0.3)',
        'glow-amber': '0 0 20px rgba(245,158,11,0.3)',
        'glow-pink': '0 0 20px rgba(236,72,153,0.3)',
      },
      borderColor: {
        glass: 'rgba(255,255,255,0.1)',
      },
      opacity: {
        glass: '0.04',
      },
    },
  },
  plugins: [],
}
