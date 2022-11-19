/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{html,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        theme1: { 
        "primary": "#00A5C8",
        "secondary": "#7767c1",
        "accent": "#8d7da6",
        "neutral": "#fcf7f1",
        "base-100": "#e0f2fe",
        "info": "#339BEB",
        "success": "#2EDCAA",
        "warning": "#D17E0A",
        "error": "#F73C2B",
        },
      },
      
    ],
  },
}
