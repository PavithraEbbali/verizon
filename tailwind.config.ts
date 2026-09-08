import type { Config } from "tailwindcss";

/**
 * Official Verizon brand palette. Red is reserved for calls to action and
 * brand marks; everything structural is black, white, or the Verizon slate.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        verizon: {
          red: "#EE0000",
          "red-deep": "#CD040B",
          black: "#000000",
          slate: "#6F7171",
          mist: "#EDEEEE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,.04), 0 8px 24px -12px rgba(0,0,0,.12)",
        "card-hover": "0 2px 4px rgba(0,0,0,.05), 0 16px 40px -16px rgba(0,0,0,.18)",
        lift: "0 12px 32px -12px rgba(238,0,0,.35)",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        // Entrance only, one shot, within the 400ms motion budget.
        "fade-rise": "fade-rise 380ms cubic-bezier(.22,.61,.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
