/** @type {import('tailwindcss').Config} */
module.exports = {
  //./src/: Dice a Tailwind di guardare dentro la directory src, che è la cartella principale di un progetto Angular.
  //**/*: Cerca in tutti i file e sottocartelle di src, ricorsivamente.
  //{html,ts}: Limita la ricerca ai file con estensioni .html (template) e .ts (TypeScript).
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
