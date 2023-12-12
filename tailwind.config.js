/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',  
        secondary: '#34495e',
        accent: '#3498db',  
      },
    },
  },
  plugins: [],
}

