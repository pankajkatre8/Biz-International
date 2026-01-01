// tailwind.config.ts
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
        /* Surface colors */
        "surface-primary": "var(--color-surface-primary)",
        "surface-secondary": "var(--color-surface-secondary)",
        "surface-tertiary": "var(--color-surface-tertiary)",

        /* Text colors */
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted": "var(--color-text-muted)",

        /* Wood palette */
        wood: {
          50: "var(--color-wood-50)",
          100: "var(--color-wood-100)",
          200: "var(--color-wood-200)",
          300: "var(--color-wood-300)",
          400: "var(--color-wood-400)",
          500: "var(--color-wood-500)",
          600: "var(--color-wood-600)",
          700: "var(--color-wood-700)",
          800: "var(--color-wood-800)",
          900: "var(--color-wood-900)",
        },

        /* Sidebar */
        sidebar: {
          bg: "var(--color-sidebar-bg)",
          hover: "var(--color-sidebar-hover)",
          text: "var(--color-sidebar-text)",
          muted: "var(--color-sidebar-muted)",
        },

        /* Status */
        success: {
          light: "var(--color-success-light)",
          DEFAULT: "var(--color-success)",
          dark: "var(--color-success-dark)",
        },
        warning: {
          light: "var(--color-warning-light)",
          DEFAULT: "var(--color-warning)",
          dark: "var(--color-warning-dark)",
        },
        error: {
          light: "var(--color-error-light)",
          DEFAULT: "var(--color-error)",
          dark: "var(--color-error-dark)",
        },
      },

      borderRadius: {
        wood: "var(--radius-wood)",
      },

      boxShadow: {
        wood: "var(--shadow-wood)",
        "wood-lg": "var(--shadow-wood-lg)",
      },
    },
  },
  plugins: [],
};

export default config;
