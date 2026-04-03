import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        charcoal: '#0A0A0A',
        graphite: '#141414',
        stone: '#1C1C1C',
        gold: '#D4AF37',
        goldMuted: '#9C813D',
        cream: '#FAFAF8'
      },
      backgroundImage: {
        'luxury-glow': 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 80%)',
      }
    },
  },
  plugins: [],
} satisfies Config;
