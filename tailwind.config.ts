import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne','sans-serif'], body: ['DM Sans','sans-serif'],
        mono: ['JetBrains Mono','monospace'], sans: ['DM Sans','sans-serif'],
      },
      colors: {
        void: '#080B10', deep: '#0D1117', surface: '#161B22',
        elevated: '#1C2333', overlay: '#21262D',
        teal: { DEFAULT: '#00D4AA', dim: '#00A884', bright: '#00FFCC',
          50: 'rgba(0,212,170,0.05)', 100: 'rgba(0,212,170,0.1)', 200: 'rgba(0,212,170,0.2)' },
        amber: { DEFAULT: '#F0A500', dim: '#C47D00' },
        violet: { DEFAULT: '#A78BFA', dim: '#7C5CDB' },
        track: {
          frontend: '#61DAFB', backend: '#68D391', fullstack: '#F6AD55', python: '#FFD43B',
          uiux: '#F687B3', qa: '#76E4F7', data: '#9F7AEA', datascience: '#B794F4',
          devops: '#FC8181', cyber: '#48BB78', mobile: '#63B3ED', video: '#FBB040',
          youtube: '#FF4E4E', marketing: '#68D391', ai: '#00D4AA', nocode: '#A78BFA', writing: '#E2C97E',
        },
        border: { subtle: '#21262D', default: '#30363D', active: '#388BFD' },
        text: { primary: '#E6EDF3', secondary: '#8B949E', muted: '#484F58', inverse: '#0D1117' },
      },
      borderRadius: { xs: '4px', sm: '6px', md: '10px', lg: '16px', xl: '24px', '2xl': '32px' },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.25)',
        raised: '0 8px 24px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        modal: '0 24px 64px rgba(0,0,0,0.7)',
        'glow-teal': '0 0 16px rgba(0,212,170,0.3), 0 0 48px rgba(0,212,170,0.08)',
        'glow-amber': '0 0 16px rgba(240,165,0,0.3)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #080B10 0%, #0D1117 50%, #0A1628 100%)',
        'gradient-text': 'linear-gradient(92deg, #00D4AA 0%, #61DAFB 45%, #A78BFA 100%)',
        'gradient-accent': 'linear-gradient(90deg, #00D4AA, #A78BFA)',
        'gradient-warm': 'linear-gradient(135deg, #F0A500, #FC8181)',
        'grid-pattern': 'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)',
        'dot-pattern': 'radial-gradient(rgba(0,212,170,0.12) 1px, transparent 1px)',
      },
      backgroundSize: { grid: '40px 40px', dot: '24px 24px' },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'progress-fill': 'progressFill 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(20px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.92)' }, to: { opacity: '1', transform: 'scale(1)' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 16px rgba(0,212,170,0.3)' }, '50%': { boxShadow: '0 0 32px rgba(0,212,170,0.6)' } },
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
        progressFill: { from: { width: '0%' }, to: { width: 'var(--progress-width, 0%)' } },
      },
      transitionTimingFunction: { spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', smooth: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      maxWidth: { content: '70ch', site: '1320px' },
      fontSize: {
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.2' }],
      },
    },
  },
  plugins: [],
}
export default config
