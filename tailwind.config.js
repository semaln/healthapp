/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1d3528',
        'primary-light': '#4d7a56',
        sage: '#6b8f71',
        secondary: '#9a7050',
        background: '#f4f1eb',
        surface: '#ede8df',
        border: '#d4cdc1',
        cream: '#faf8f4',
        'text-primary': '#1c1a17',
        'text-secondary': '#7c7165',
        'accent-red': '#c24c37',
        'accent-blue': '#2a6478',
        terracotta: '#b06a47',
        japanese: '#c45a3c',
      },
      fontFamily: {
        display: ['Cormorant', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 16px rgba(40, 30, 15, 0.08), 0 1px 4px rgba(40, 30, 15, 0.05)',
        'card-hover': '0 4px 24px rgba(40, 30, 15, 0.12), 0 2px 8px rgba(40, 30, 15, 0.06)',
        nav: '0 -2px 32px rgba(29, 53, 40, 0.15), 0 4px 24px rgba(29, 53, 40, 0.10)',
      },
    },
  },
  plugins: [],
}
