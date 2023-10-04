/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#04364A",
        secondary: "#176B87",
        third: "#64CCC5",
      },
    },
  },
  plugins: [],
};
