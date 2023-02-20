//tailwind.config.js

/** @type {import('tailwindcss').Config} */

// const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colors you want to add go here
        // main: "#F16C34",
        // border: "#DFDFDF",
        // baseText: "#777777",
        // hoverGray: "#f5f5f5",
        brand100: "#F16C34",
        red100: "#FB4646",
        blue100: "#0066FF",
        mono100: "#333333",
        mono80: "#777777",
        mono70: "#AFAFAF",
        mono60: "#C1C1C1",
        mono50: "#DFDFDF",
        mono40: "#F6F6F6",
        mono30: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
