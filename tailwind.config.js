/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/site/index.html",
    "./site/**/*.{html,js}",
    "./admin/**/*.{html,js}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
      mono: ["ui-monospace", "monospace"],
      colors: {
        "main-1": "#9CA871",
        "main-2": "#E1F598",
        "main-3": "#F5CEC9",
      },
    },
    extend: {
      colors: {},
    },
    variants: {
      extend: {
        backgroundColor: ["dark"],
        color: ["dark"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin.cjs"), require("flowbite/plugin")],
  darkMode: "class",
};
