/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./views/**/*.{html,js,ejs}",
    "./public/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        themeColor: ["#2054dc"],
        success: "#5aed87",
        danger: ["#fef2f2"],
      },
    },
  },
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
