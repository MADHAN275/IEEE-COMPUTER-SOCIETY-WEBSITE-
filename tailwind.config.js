/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F39019',
        'primary-light': '#F7A347',
        'primary-dark': '#E67E00',
        'primary-darker': '#CC6F00',
        secondary: '#FFFFFF',
        accent: '#1A1A1A',
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #F39019 0%, #F7A347 50%, #FFB84D 100%)',
      },
      boxShadow: {
        'orange-glow': '0 0 40px rgba(243, 144, 25, 0.6)',
        'orange-intense': '0 0 80px rgba(243, 144, 25, 0.8), 0 0 120px rgba(243, 144, 25, 0.4)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 40px rgba(243, 144, 25, 0.6)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 80px rgba(243, 144, 25, 0.8), 0 0 120px rgba(243, 144, 25, 0.4)',
            transform: 'scale(1.02)',
          },
        },
      },
    },
  },
  plugins: [],
}