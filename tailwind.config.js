/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#b3d9ff',
          300: '#86c2ff',
          400: '#59a6ff',
          500: '#2b87ff',
          600: '#1767e6',
          700: '#114fba',
          800: '#0f408f',
          900: '#0d376f'
        }
      },
      boxShadow: {
        glow: '0 0 60px rgba(43,135,255,0.25)'
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(1200px 600px at 80% -20%, rgba(43,135,255,.25), transparent), radial-gradient(800px 400px at -10% 10%, rgba(255,255,255,.7), transparent)'
      }
    },
  },
  plugins: [],
};
