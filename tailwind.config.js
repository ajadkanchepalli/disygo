module.exports = {
  /** @type {import('tailwindcss').Config} */
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0d0d0d',
        'obsidian-light': '#141414',
        'obsidian-card': '#1a1a1a',
        'obsidian-border': '#2a2a2a',
        cyan: {
          DEFAULT: '#50e5ea',
          glow: 'rgba(80,229,234,0.3)',
          dim: 'rgba(80,229,234,0.1)',
          bright: '#7aeef2',
        },
        primary: {
          light: '#50e5ea',
          DEFAULT: '#50e5ea',
          dark: '#2ec8cd',
        },
        secondary: {
          light: '#f8f9fa',
          DEFAULT: '#e9ecef',
          dark: '#dee2e6',
        },
        'text-primary': '#ffffff',
        'text-secondary': 'rgba(255,255,255,0.6)',
        'text-muted': 'rgba(255,255,255,0.35)',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 7vw, 5rem)', { lineHeight: '1.05', fontWeight: '700' }],
        'display': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
        'section': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '600' }],
      },
      spacing: {
        'section': '120px',
        'section-sm': '80px',
      },
      borderRadius: {
        'pill': '40px',
        'card': '20px',
        'lg-card': '30px',
      },
      boxShadow: {
        'cyan-glow': '0 0 30px rgba(80,229,234,0.4), 0 0 60px rgba(80,229,234,0.15)',
        'cyan-sm': '0 0 15px rgba(80,229,234,0.3)',
        'card': '0 4px 40px rgba(0,0,0,0.4)',
        'card-hover': '0 8px 60px rgba(80,229,234,0.15)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marqueeReverse 30s linear infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(80,229,234,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(80,229,234,0.6), 0 0 80px rgba(80,229,234,0.2)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cyan-gradient': 'linear-gradient(135deg, #50e5ea 0%, #2ec8cd 100%)',
        'dark-gradient': 'linear-gradient(180deg, #0d0d0d 0%, #141414 100%)',
      },
    },
  },
  plugins: [],
};
