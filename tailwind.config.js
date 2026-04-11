/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2a4a3a',
        'primary-light': '#4a7c59',
        secondary: '#8a6e42',
        background: '#fafbf8',
        surface: '#f0f4ee',
        border: '#e0e6dc',
        'text-primary': '#2c2c2c',
        'text-secondary': '#6a7a6a',
        'accent-red': '#d94f3a',
        'accent-blue': '#2a6478',
        japanese: '#c45a3c',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
