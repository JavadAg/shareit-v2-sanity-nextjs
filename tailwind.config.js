/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#a6b0ed",
          secondary: "#ac8eed",
          accent: "#818cf8",
          neutral: "#222A39",
          "base-100": "#fafafa",
          info: "#599EE3",
          success: "#48E0A1",
          warning: "#FDBC68",
          error: "#E6192E",
          "--rounded-btn": "2rem"
        }
      },
      {
        dark: {
          primary: "#a6b0ed",
          secondary: "#ac8eed",
          accent: "#818cf8",
          neutral: "#222A39",
          "base-100": "#111827",
          info: "#599EE3",
          success: "#48E0A1",
          warning: "#FDBC68",
          error: "#E6192E",
          "--rounded-btn": "2rem"
        }
      },
      "light",
      "dark"
    ]
  }
}
