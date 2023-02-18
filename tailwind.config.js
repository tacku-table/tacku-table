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
                main: "#F16C34",
                border: "#DFDFDF",
                baseText: "#777777",
                hoverGray: "#f5f5f5",
            },
            keyframes: {
                slider: {
                    // "0%": {
                    //     transform: "translateY(0px)",
                    // },
                    // "100%": {
                    //     transform: "translateY(-1400px)",
                    // },
                    "0%": {
                        transform: "opacity(0)",
                    },
                    "100%": {
                        transform: "opacity(1)",
                    },
                },
            },
            // animation: {
            //     slider: "slider 15s linear infinite",
            // },
        },
    },
    plugins: [],
};
