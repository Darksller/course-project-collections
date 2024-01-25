/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      under: 'Playfair Display',
      muli: ['Mulish', 'sans-serif'],
      sofiaProBold: 'SofiaProBold',
      cgr: 'CenturyGothicRegular',
      cgb: 'CenturyGothicBold',
    },
    animationDelay: {
      minus: '-0.2s',
      minusXl: '-0.4s',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      boxShadow: {
        big: [
          '0 19px 38px rgba(0, 0, 0, 0.3)',
          '0 15px 12px rgba(0, 0, 0, 0.22)',
        ],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundColor: {
        gr: 'rgba(77, 77, 77, .9)',
      },
      maxWidth: {
        1440: '1440px',
        sFull: '10%',
      },
      height: {
        notFull: '80%',
        littleFull: '20%',
      },
      width: {
        xlFull: '200%',
        halfFull: '50%',
        sFull: '70%',
        calc: 'calc(70%-40px)',
        thrcalc: 'calc(30%-2px)',
      },
      bottom: {
        px: '1px',
        under: '-100px',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        fill: {
          '0%': { color: '#fff' },
          '100%': { color: '#000' },
        },
        arrow: {
          '0%': {
            opacity: 0,
            transform: 'rotate(45deg) translate(-20px, -20px)',
          },
          '50%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
            transform: 'rotate(45deg) translate(20px, 20px)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        arrow: 'arrow 2s infinite',
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    require('tailwind-scrollbar'),
    require('tailwindcss-animation-delay'),
  ],
}
