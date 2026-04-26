import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050507",
        surface: "#0D0D12",
        "surface-alt": "#111118",
        "section-alt": "#08080C",
        border: "#1A1A24",
        "border-light": "#252530",
        "text-primary": "#E8E8ED",
        "text-secondary": "#888888",
        "text-tertiary": "#666666",
        "accent-blue": "#3B82F6",
        "accent-green": "#10B981",
        "accent-yellow": "#F59E0B",
        "accent-purple": "#8B5CF6",
        "accent-red": "#EF4444",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
