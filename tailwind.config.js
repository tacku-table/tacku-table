//tailwind.config.js

/** @type {import('tailwindcss').Config} */

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
                grayText: "#777777",
                baseText: "#333333",
                hoverGray: "#f5f5f5",
            },
            keyframes: {
                "up-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-50px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0px)",
                    },
                },
                "fade-in": {
                    "0%": {
                        opacity: "0",
                        transform: "translateX(-100px)",
                    },
                    "30%": {
                        opacity: "0.5",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateX(0px)",
                    },
                },
            },
            animation: {
                "up-down": "up-down 2s ease-out linear",
                "fade-in": "fade-in 2s ease-out infinite",
            },
        },
    },
    // plugins: [],
    variants: {},
    plugins: [],
};
