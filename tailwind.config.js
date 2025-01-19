/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",  // Rastreia todo o conteúdo dentro de app/
    "./src/components/**/*.{js,ts,jsx,tsx}",  // Rastreia os componentes
    "./src/pages/**/*.{js,ts,jsx,tsx}",  // Rastreia as páginas, se existirem
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
