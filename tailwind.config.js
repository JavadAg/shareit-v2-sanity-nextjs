/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        ball: {
          "0%": {
            width: "5rem",
            height: "2rem",
            borderRadius: "20px",
            transform: "translateY(0)"
          },
          "2%": {
            width: "5rem",
            height: "2rem",
            borderRadius: "20px",
            transform: "translateY(0)"
          },
          "30%": { width: "4.8rem", height: "5.5rem", borderRadius: "40px" },
          "60%": { width: "4.8rem", borderRadius: "40px" },
          "100%": {
            width: "4.8rem",
            height: "4.8rem",
            borderRadius: "40px",
            transform: "translateY(-150px)"
          }
        }
      },
      animation: {
        ball: "ball 0.6s cubic-bezier(.25,.7,.2,1) infinite alternate"
      }
    }
  },
  plugins: [require("@headlessui/tailwindcss")]
}
