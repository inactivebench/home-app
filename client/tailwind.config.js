/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2.5rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
        gridTemplateRows: {
          // Adds a variant for a grid with 3 rows where each row's size is set to auto
          3: "repeat(3, auto)",
        },
      },
      backgroundImage: {
        hero: "url(./assets/hero image 1.jpg)",
      },
    },
  },
  plugins: [],
};
