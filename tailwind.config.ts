import { heroui } from '@heroui/react'
import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          500: '#FF1CF7',
        },
        violet: {
          500: '#b249f8',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
} satisfies Config
