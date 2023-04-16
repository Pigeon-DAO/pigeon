const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#082340",
        primaryDarker: "#051C34",
        accent: "#2ADACC",
        accent2: "#545252",
        accent3: "#153E5B",
      },
      fontFamily: {
        Nunito: ["Nunito"],
        Poppins: ["Poppins"],
      },
      textShadow: {
        sm: "0 1px 2px rgb(0, 0, 0, 0.4)",
        DEFAULT: "0 2px 4px rgb(0, 0, 0, 0.5)",
        lg: "0 8px 16px rgb(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
