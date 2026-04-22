import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Maps 'font-playfair' class to the CSS variable set in layout.tsx
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        cream: {
          50: "#FFFDF5",
          200: "#F5E6D3",
        },
      },
    },
  },
  plugins: [],
};

export default config;
