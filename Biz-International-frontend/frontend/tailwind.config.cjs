// tailwind.config.cjs
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f2f8ff",
          100: "#e6f2ff",
          500: "#0ea5e9", // change to your brand color
        },
        muted: {
          DEFAULT: "#6b7280",
        },
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography') // Install: npm i -D @tailwindcss/typography
  ],
};
