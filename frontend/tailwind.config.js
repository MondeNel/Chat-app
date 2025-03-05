/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6', // Custom primary color
      },
    },
  },
  plugins: [require("daisyui")],

    daisyui: {
      themes: ["dracula"], // Use the "dracula" theme
    },
};