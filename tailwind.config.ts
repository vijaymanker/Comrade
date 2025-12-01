import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                nothing: {
                    black: "#000000",
                    white: "#FFFFFF",
                    gray: {
                        50: "#FAFAFA",
                        100: "#F5F5F5",
                        200: "#E5E5E5",
                        300: "#D4D4D4",
                        400: "#A3A3A3",
                        500: "#737373",
                        600: "#525252",
                        700: "#404040",
                        800: "#262626",
                        900: "#171717",
                    },
                },
            },
            borderWidth: {
                thin: "0.5px",
            },
            borderRadius: {
                "2xl": "1rem",
                "3xl": "1.5rem",
            },
            spacing: {
                18: "4.5rem",
                22: "5.5rem",
            },
            boxShadow: {
                soft: "0 2px 8px rgba(0, 0, 0, 0.04)",
                glow: "0 0 20px rgba(255, 255, 255, 0.1)",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
