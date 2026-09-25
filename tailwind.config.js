/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Hex, not var(--x), so opacity modifiers like text-paper/60 work.
        // Keep in sync with :root in globals.css.
        ink: '#0a0a0b',
        paper: '#f2f0eb',
        signal: '#ff2d2d',
        pulse: '#2d5bff',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
