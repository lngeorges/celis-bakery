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
        // This maps the 'font-caveat' class to the CSS variable defined in layout.tsx
        caveat: ["var(--font-caveat)", "cursive"],
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
