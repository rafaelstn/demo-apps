import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0A0B", soft: "#1A1A1D", muted: "#3A3A40", faint: "#5A5A62" },
        paper: { DEFAULT: "#FFFFFF", soft: "#F6F6F4", line: "#E7E7E3", edge: "#D6D6D0" },
        accent: { DEFAULT: "#2563EB", soft: "#DBE4FF", deep: "#1E40AF" },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.04em" }],
        "display-md": ["clamp(1.875rem, 3.5vw, 3rem)", { lineHeight: "1.08", letterSpacing: "-0.035em" }],
      },
      maxWidth: {
        prose: "44rem",
      },
    },
  },
  plugins: [],
};

export default config;
