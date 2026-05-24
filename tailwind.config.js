/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0, 0%, 0%)',
        'background-soft': 'hsl(0, 0%, 5%)',
        foreground: 'hsl(0, 0%, 100%)',
        'foreground-muted': 'hsl(0, 0%, 60%)',
        'foreground-faint': 'hsl(0, 0%, 35%)',
        border: 'hsl(0, 0%, 15%)',
        card: 'hsl(0, 0%, 7%)',
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
