/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      Rubik: ["Rubik", "san-serif"],
      Vietnamese: ["serif"],
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      colors: {
        primary: "#2A0944",
        secondary: "#3FA796",
        third: "#FEC260",
        fourth: "#A10035",
      },
    },
  },
  plugins: [],
};
