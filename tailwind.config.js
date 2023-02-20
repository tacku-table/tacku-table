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
                // 채하꺼
                main: "#F16C34",
                border: "#DFDFDF",
                grayText: "#777777",
                baseText: "#333333",
                hoverGray: "#f5f5f5",
            },
            // 채하꺼
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
    variants: {},
    plugins: [],
};
