import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        editorial: ['var(--font-editorial)', 'Instrument Serif', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        void: 'var(--bg-void)',
        deep: 'var(--bg-deep)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        overlay: 'var(--bg-overlay)',
        teal: {
          DEFAULT: 'var(--accent-primary)',
          dim: 'var(--accent-primary-dim)',
          bright: 'var(--accent-primary-bright)',
          50: 'var(--accent-primary-bg)',
          100: 'var(--accent-primary-bg)',
          200: 'var(--accent-primary-border)',
        },
        amber: { DEFAULT: 'var(--accent-secondary)', dim: 'var(--accent-secondary-dim)' },
        violet: { DEFAULT: 'var(--accent-tertiary)', dim: 'var(--accent-tertiary-dim)' },
        cat: {
          build: 'var(--cat-build)',
          design: 'var(--cat-design)',
          analyze: 'var(--cat-analyze)',
          grow: 'var(--cat-grow)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          default: 'var(--border-default)',
          active: 'var(--border-active)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)',
        },
      },
      borderRadius: { xs: '4px', sm: '6px', md: '10px', lg: '14px', xl: '20px' },
      boxShadow: {
        card: 'var(--shadow-card)',
        raised: 'var(--shadow-raised)',
        modal: '0 1px 2px rgba(20,24,31,0.05), 0 16px 40px rgba(20,24,31,0.14)',
      },
      backgroundImage: {
        'gradient-accent': 'var(--gradient-accent)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
      },
      transitionTimingFunction: { spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      maxWidth: { content: '70ch', site: '1200px' },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 6vw, 4.5rem)', { lineHeight: '1.05' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.5rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15' }],
      },
    },
  },
  plugins: [],
}
export default config