/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-500
        background: 'var(--color-background)', // gray-50
        foreground: 'var(--color-foreground)', // slate-700
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-500
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // purple-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-100
          foreground: 'var(--color-muted-foreground)', // gray-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // orange-500
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // slate-700
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // slate-700
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-600
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        // Additional theme colors
        surface: 'var(--color-surface)', // white
        'text-primary': 'var(--color-text-primary)', // slate-700
        'text-secondary': 'var(--color-text-secondary)', // gray-500
        // Emotional context colors
        calm: 'var(--color-calm)', // blue-500
        energized: 'var(--color-energized)', // orange-500
        focused: 'var(--color-focused)', // green-500
        stressed: 'var(--color-stressed)', // orange-600
        neutral: 'var(--color-neutral)', // gray-500
      },
      borderRadius: {
        lg: '12px', // var(--radius)
        md: '8px', // calc(var(--radius) - 2px)
        sm: '6px', // calc(var(--radius) - 4px)
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans Pro', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['12px', { lineHeight: '16px' }],
        'sm': ['14px', { lineHeight: '20px' }],
        'base': ['16px', { lineHeight: '24px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '28px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
        '3xl': ['30px', { lineHeight: '36px' }],
        '4xl': ['36px', { lineHeight: '40px' }],
      },
      spacing: {
        '18': '4.5rem', // 72px
        '22': '5.5rem', // 88px
      },
      boxShadow: {
        'soft': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'soft-lg': '0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06)',
        'emotional': '0 0 8px rgba(74, 144, 226, 0.4)',
      },
      animation: {
        'breathe-calm': 'breathe-calm 4s ease-in-out infinite',
        'breathe-stressed': 'breathe-stressed 2s ease-in-out infinite',
      },
      transitionTimingFunction: {
        'gentle': 'cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      zIndex: {
        'navigation': '100',
        'search-overlay': '200',
        'dropdown': '300',
        'modal': '1000',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
}