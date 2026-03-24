/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2ff',
          800: '#0a1630',
          900: '#060e1e',
          950: '#030810',
        },
        brand: {
          blue:  '#1e3a6e',
          light: '#2a5298',
          cyan:  '#22d3ee',
          silver:'#b8c9f5',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Source Sans 3"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
