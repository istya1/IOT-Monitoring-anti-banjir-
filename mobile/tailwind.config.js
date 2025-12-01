/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Custom colors jika perlu
        primary: '#1e40af',
        danger: '#dc2626',
        warning: '#d97706',
        success: '#16a34a',
      },
    },
  },
  plugins: [],
};