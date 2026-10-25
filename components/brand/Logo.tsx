/**
 * TechSkillHub brand mark — the stepped-squares + arrow logo.
 * Hand-authored SVG so it stays crisp at any size (no raster dependency).
 */

const LOGO_COLORS = {
  base: '#4B4E6D',
  mid: '#95A3B3',
  top: '#84DCC6',
  arrow: '#222222',
} as const

export function LogoMark({ size = 28, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      role="img"
      aria-label="TechSkillHub"
      className={className}
      fill="none"
    >
      <rect x="2" y="32" width="20" height="20" rx="6" fill={LOGO_COLORS.base} />
      <rect x="17" y="19" width="20" height="20" rx="6" fill={LOGO_COLORS.mid} />
      <rect x="32" y="6" width="20" height="20" rx="6" fill={LOGO_COLORS.top} />
      <path
        d="M38.5 20.5 L46 13 M41.5 13 H46 V17.5"
        stroke={LOGO_COLORS.arrow}
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Logo({
  size = 28,
  variant = 'dark',
  showWordmark = true,
  className,
}: {
  size?: number
  variant?: 'dark' | 'light'
  showWordmark?: boolean
  className?: string
}) {
  const wordColor = variant === 'light' ? 'text-white' : 'text-text-primary'
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ''}`}>
      <LogoMark size={size} />
      {showWordmark && (
        <span className={`font-display text-lg font-semibold leading-none tracking-tight ${wordColor}`}>
          TechSkillHub
        </span>
      )}
    </span>
  )
}
