import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#003399",
          light: "#4d79cc",
          dark: "#002266",
          contrast: "#ffffff",
        },
        secondary: {
          DEFAULT: "#19212c",
          light: "#4a5259",
          dark: "#0f1419",
          contrast: "#ffffff",
        },
        success: {
          DEFAULT: "#206f32",
          light: "#4d8f5b",
          dark: "#164d22",
          contrast: "#ffffff",
        },
        text: {
          primary: "#090c0f",
          secondary: "#454950",
        },
        background: {
          DEFAULT: "#ffffff",
          paper: "#ffffff",
        },
        grey: {
          100: "#f5f5f5",
          200: "#e4e4e4",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#0f172a",
        },
        divider: "#d1d5db",
      },
      fontFamily: {
        sans: ['"Public Sans"', '"Roboto"', "Helvetica", "Arial", "sans-serif"],
        serif: ['"Playfair Display"', "serif"],
      },
      fontSize: {
        h1: ["4rem", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["1.5rem", { lineHeight: "1.4", fontWeight: "600" }],
        h4: ["1.125rem", { lineHeight: "1.4", fontWeight: "700" }],
        h5: ["1rem", { lineHeight: "1.5", fontWeight: "700" }],
        h6: ["0.875rem", { lineHeight: "1.5", fontWeight: "700" }],
        body1: ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        body2: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        button: ["0.875rem", { fontWeight: "700", textTransform: "uppercase" }],
        caption: ["0.75rem", { lineHeight: "1.4", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "8px", // buttons
        lg: "16px", // cards
      },
      boxShadow: {
        buttonHover: "0px 2px 8px rgba(0, 51, 153, 0.3)",
        card: "0px 1px 2px rgba(133, 133, 133, 0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
