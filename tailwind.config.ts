import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      primary: "#EF8203",
      white: "#FFFFFF",
      almostWhite: "#ECEDE5",
      grey: "#44443D",
      lgrey: "#44443D",
      vlgrey: "#B4B1AE"
    },
    extend: {
      boxShadow: {
        lighttop: "0 18px 32px 2px rgba(0, 0, 0, 0.24)"
      }
    }
  },
  plugins: []
} satisfies Config;
