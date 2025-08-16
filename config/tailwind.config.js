/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{tsx,ts}", "./components/**/*.{tsx,ts}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
