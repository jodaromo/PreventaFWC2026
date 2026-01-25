/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'fifa-black': '#0a0a0a',
        'fifa-white': '#fafafa',
        'fifa-gray': {
          100: '#f5f5f7',
          400: '#86868b',
          900: '#1d1d1f',
        },
        'fifa-gold': '#c9a227',
        'panini-yellow': '#ffed00',
        'panini-red': '#e31837',
        'whatsapp': '#25d366',
        // Primary accent color - Refined warm orange (Anthropic-inspired)
        'maple': {
          DEFAULT: '#E07B4C',     // Warm coral-orange
          light: '#E8956A',       // Lighter for hover
          dark: '#C96A3D',        // Darker shade
          50: '#FEF6F3',
          100: '#FCEEE8',
          200: '#F9D9CC',
          300: '#F3B89E',
          400: '#E8956A',
          500: '#E07B4C',
          600: '#C96A3D',
        },
        // Zayu (Mexican Jaguar) - Vibrant Teal/Cyan (his signature accent color)
        'zayu': {
          DEFAULT: '#17A2B8',     // Zayu's teal accent
          light: '#20C997',       // Lighter teal for hover
          dark: '#138496',        // Darker teal
          gold: '#FFD93D',        // Secondary gold accent
          'gold-light': '#FFE566',
          'gold-dark': '#E6C235',
        },
        // Clutch (American Bald Eagle) - Vibrant Blue (his signature color)
        'clutch': {
          DEFAULT: '#4361EE',     // Clutch's blue
          light: '#6C8FFF',       // Lighter blue for hover
          dark: '#3651D4',        // Darker blue
          purple: '#7B2CBF',
          'purple-light': '#9D4EDD',
        },
        // Clean neutral palette with orange accent
        'warm': {
          // Backgrounds - Clean whites/grays
          cream: '#FAFAFA',           // Pure light gray (almost white)
          'cream-dark': '#F5F5F5',    // Slightly darker
          'cream-light': '#FFFFFF',   // Pure white
          tan: '#E5E5E5',             // Light gray for borders/dividers
          // CTA / Primary actions - Warm coral-orange
          cta: '#E07B4C',             // Warm coral-orange
          'cta-hover': '#C96A3D',     // Darker
          'cta-light': '#E8956A',     // Lighter
          // Text - Neutral grays
          brown: '#171717',           // Near black for headings
          'brown-light': '#404040',   // Dark gray for body text
          gray: '#737373',            // Medium gray for secondary text
          'gray-light': '#A3A3A3',    // Light gray for muted text
          // Accent colors
          coral: '#EF4444',           // Red for alerts/errors
          'coral-light': '#F87171',
          gold: '#E07B4C',            // Orange accent
          'gold-light': '#E8956A',
          'gold-dark': '#C96A3D',
        },
        // Dark Mode Colors
        'dark': {
          bg: '#1A1D21',
          'bg-elevated': '#242830',
          'bg-card': '#2A2F38',
          surface: '#32383F',
          border: '#3D444D',
          text: '#F5F5F7',
          'text-muted': '#A8ADB5',
          'text-subtle': '#6B7280',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        fifa: ['Aldrich', 'Inter', 'sans-serif'], // FIFA World Cup 2026 inspired
      },
      borderRadius: {
        // iOS 26 continuous corners (squircle approximation)
        'ios': '1.5rem',
        'ios-lg': '2rem',
        'ios-xl': '2.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count': 'count 2s ease-out forwards',
        'theme-spin': 'themeSpin 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        themeSpin: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.1)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
      },
      boxShadow: {
        'product': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        'product-hover': '0 35px 60px -15px rgba(0, 0, 0, 0.25)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.12)',
        // Dark mode shadows (with accent glow)
        'card-dark': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-dark-hover': '0 8px 40px rgba(0, 0, 0, 0.5)',
        'glow-maple': '0 0 30px rgba(224, 123, 76, 0.3)',
        'glow-teal': '0 0 30px rgba(23, 162, 184, 0.3)',
        'glow-gold': '0 0 30px rgba(224, 123, 76, 0.3)',
        // iOS 26.3 Glassmorphism shadows
        'glass-sm': '0 1px 2px rgba(0, 0, 0, 0.03), 0 2px 6px rgba(0, 0, 0, 0.05)',
        'glass': '0 1px 3px rgba(0, 0, 0, 0.04), 0 8px 24px -4px rgba(0, 0, 0, 0.08)',
        'glass-md': '0 2px 4px rgba(0, 0, 0, 0.04), 0 12px 32px -4px rgba(0, 0, 0, 0.1)',
        'glass-lg': '0 4px 8px rgba(0, 0, 0, 0.05), 0 20px 48px -8px rgba(0, 0, 0, 0.12)',
        'glass-xl': '0 8px 16px rgba(0, 0, 0, 0.06), 0 32px 64px -12px rgba(0, 0, 0, 0.15)',
        // Dark mode glass shadows
        'glass-dark-sm': '0 1px 2px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.2)',
        'glass-dark': '0 1px 3px rgba(0, 0, 0, 0.2), 0 8px 24px -4px rgba(0, 0, 0, 0.4)',
        'glass-dark-md': '0 2px 4px rgba(0, 0, 0, 0.25), 0 12px 32px -4px rgba(0, 0, 0, 0.5)',
        'glass-dark-lg': '0 4px 8px rgba(0, 0, 0, 0.3), 0 20px 48px -8px rgba(0, 0, 0, 0.55)',
        // Inset highlights for glass depth
        'glass-inset': 'inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'glass-inset-dark': 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
      },
      backdropBlur: {
        'glass-subtle': '12px',
        'glass': '16px',
        'glass-strong': '20px',
        'glass-max': '24px',
      },
    },
  },
  plugins: [],
}
