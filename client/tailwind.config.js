/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "loop-scroll": "loop-scroll 10s linear infinite",
      },
      keyframes: {
        "loop-scroll": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
      colors: {
        primary: "#f7f7f8",
        customViolet: "#673ab7",
        customBgColor: "#f7f7f8",
        studyOrangeColor: "#fb4927",
        theme: {
          DEFAULT: "#1A86B6",
          50: "#97D5F0",
          100: "#86CEEE",
          200: "#62BFE9",
          300: "#3EB1E3",
          400: "#1FA0DA",
          500: "#1A86B6",
          600: "#136285",
          700: "#0C3E54",
          800: "#051A23",
          900: "#000000",
          950: "#000000",
        },
      },
      fontSize: {
        "fs-xs": "clamp(11.11px, 0.09vi + 10.81px, 12.16px)",
        "fs-sm": "clamp(13.33px, 0.17vi + 12.8px, 15.2px)",
        "fs-base": "clamp(16px, 0.27vi + 15.14px, 19px)",
        "fs-md": "clamp(19.2px, 0.41vi + 17.9px, 23.75px)",
        "fs-lg": "clamp(23.04px, 0.59vi + 21.14px, 29.69px)",
        "fs-xl": "clamp(27.65px, 0.84vi + 24.94px, 37.11px)",
        "fs-xxl": "clamp(33.18px, 1.18vi + 29.4px, 46.39px)",
        "fs-xxxl": "clamp(39.81px, 1.62vi + 34.62px, 57.98px)",
      },
    },
  },
  plugins: [],
});
