/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue,html}",
  ],
  theme: {
    extend: {
      zIndex: {
        1000: '1000',
      },
    },
  },
  plugins: [],
}

