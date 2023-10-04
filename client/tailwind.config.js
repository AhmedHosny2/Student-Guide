/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./dist/*.html", "./js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc", // Replace with your primary color
        secondary: {
          100: "#e2e2d5",
          200: "#888883",
        },
        main: "#e3342f",
      },
    },
  },
  plugins: [],
};
