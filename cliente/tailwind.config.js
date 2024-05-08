/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pktVerde: "#3dae2b",
        pktAzul: "#165090",
        pktCafé: "#bd8e68",
      },
    },
  },
  plugins: [],
};
