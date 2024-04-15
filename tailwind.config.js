/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hind: ["Hind", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montaguSlab: ["Montagu Slab", "sans-serif"],
        PTserif: ["PT Serif", "sans-serif"],
      },
      lineClamp: {
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        15: "15",
        20: "20",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
