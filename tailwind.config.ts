import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#c9c6c5",
          container: "#0a0a0a",
        },
        secondary: {
          DEFAULT: "#e9c349",
          container: "#af8d11",
          fixed: "#ffe088",
        },
        surface: {
          DEFAULT: "#121414",
          container: "#1e2020",
          "container-low": "#1a1c1c",
          "container-lowest": "#0c0f0f",
        },
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#c4c7c7",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        poppins: ["Poppins", "Arial", "Helvetica", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'scale-up': 'scaleUp 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity:'0' },
          '100%': { opacity: '1' },
        },
        scaleUp: {
          '0%': { transform: 'scale(0)' }, // Exemplo de animação de escala
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
