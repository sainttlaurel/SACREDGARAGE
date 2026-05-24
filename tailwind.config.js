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
        background: 'hsl(var(--background) / <alpha-value>)',
        'background-soft': 'hsl(var(--background-soft) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        'foreground-muted': 'hsl(var(--foreground-muted) / <alpha-value>)',
        'foreground-faint': 'hsl(var(--foreground-faint) / <alpha-value>)',
        border: 'hsl(var(--border) / <alpha-value>)',
        card: 'hsl(var(--card) / <alpha-value>)',
        'motorsport-red': '#c1121f',
        'motorsport-blue': '#0a1f44',
        metallic: '#c0c0c0',
      },
      fontFamily: {
        serif: ['Instrument Serif', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        'luxury': '0.15em',
      },
    },
  },
  plugins: [],
}

