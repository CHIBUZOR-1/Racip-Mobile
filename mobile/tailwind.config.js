/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      boxShadow: {
        glow: '0px 0px 10px 0px #475569',
      },
      fontFamily: {
        roboto: ["Roboto"],
        anton: ["Anton"],
        playwrite: ["PlaywriteCA"],
        oswald: ["Oswald"],
        rubik: ["Rubik"],
        pacifico: ["Pacifico"],
      },
    },
  },
  plugins: [],
}