import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: {
          DEFAULT: "#1A1A1A",
          secondary: "#242424",
          tertiary: "#2D2D2D",
        },
        foreground: {
          DEFAULT: "#FAFAFA",
          muted: "#94A3B8",
        },
        primary: {
          DEFAULT: "#FF6B4A",
          hover: "#FF8266",
          light: "#FFA38C",
          foreground: "#FFFFFF",
        },
        sentiment: {
          fear: {
            DEFAULT: "#EF4444",
            light: "#F87171",
          },
          neutral: {
            DEFAULT: "#F59E0B",
            light: "#FBBF24",
          },
          greed: {
            DEFAULT: "#10B981",
            light: "#34D399",
          },
        },
        chart: {
          orange: "#FF6B4A",
          brown: "#8B4513",
        },
        muted: {
          DEFAULT: "#2D2D2D",
          foreground: "#94A3B8",
        },
        card: {
          DEFAULT: "#242424",
          foreground: "#FAFAFA",
        },
      },
      borderRadius: {
        card: "1rem",
        button: "0.75rem",
      },
      backgroundImage: {
        "gradient-premium":
          "linear-gradient(135deg, #FF6B4A 0%, #A855F7 100%)",
        "gradient-card":
          "linear-gradient(180deg, rgba(255,107,74,0.1) 0%, rgba(26,26,26,0) 100%)",
      },
      boxShadow: {
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)",
        "card-hover":
          "0 10px 15px -3px rgba(255, 107, 74, 0.3), 0 4px 6px -2px rgba(255, 107, 74, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
