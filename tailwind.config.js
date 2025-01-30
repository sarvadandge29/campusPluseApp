/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
      },
      fontFamily: {
        bebasNeueRegular: ["BebasNeue-Regular", "sans-serif"],
        IBMPlexSansRegular: ["IBMPlexSans-Regular", "sans-serif"],
        IBMPlexSansMedium: ["IBMPlexSans-Medium", "sans-serif"],
        IBMPlexSansBold: ["IBMPlexSans-Bold", "sans-serif"],
        IBMPlexSansSemiBold: ["IBMPlexSans-SemiBold", "sans-serif"],
      },
    },
  },
  plugins: [],
}