import type { SVGProps } from 'react'

/**
 * TypewriterIllustration — the signature Tech Skill Hub brand asset.
 *
 * Thin single-line line-art of a classic typewriter, drawn with one
 * consistent stroke weight. Renders in `currentColor` so the consumer
 * controls the colour (brand green) and size via className.
 *
 * Decorative by default (aria-hidden). Safe to reuse anywhere: hero,
 * empty states, onboarding, marketing surfaces.
 */
export function TypewriterIllustration({ className, ...props }: { className?: string } & Omit<SVGProps<SVGSVGElement>, 'ref'>) {
  const row1 = [96, 110, 124, 138, 152, 166]
  const row2 = [88, 102, 116, 130, 144, 158, 172]
  const row3 = [82, 96, 110, 124, 138, 152, 166, 180]

  return (
    <svg
      viewBox="0 0 260 232"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      {/* Paper sheet */}
      <g>
        <path d="M 106 16 Q 130 10 154 16 L 154 64 L 106 64 Z" />
        {/* typed lines */}
        <path d="M 114 30 v 0 h 24" />
        <path d="M 114 38 v 0 h 34" />
        <path d="M 114 46 v 0 h 18" opacity={0.55} />
        <path d="M 114 54 v 0 h 28" />
        <path d="M 134 44 v 6" className="typewriter-caret" />
      </g>

      {/* Paper bail */}
      <g opacity={0.8}>
        <path d="M 112 72 H 148" />
        <circle cx={118} cy={72} r={2.5} />
        <circle cx={142} cy={72} r={2.5} />
      </g>

      {/* Platen roller */}
      <path d="M 80 62 Q 74 62 74 69 Q 74 76 80 76 L 180 76 Q 186 76 186 69 Q 186 62 180 62 Z" />

      {/* Side knobs */}
      <g>
        <circle cx={68} cy={69} r={8} />
        <circle cx={192} cy={69} r={8} />
        <circle cx={68} cy={69} r={2.5} />
        <circle cx={192} cy={69} r={2.5} />
      </g>

      {/* Carriage return lever */}
      <g opacity={0.85}>
        <path d="M 182 92 C 210 84 224 106 209 120 C 198 131 184 130 176 120" />
        <circle cx={176} cy={120} r={3} />
      </g>

      {/* Body silhouette */}
      <path d="M 82 76 C 74 96 66 118 66 134 C 66 150 80 156 96 158 C 112 160 148 160 164 158 C 180 156 194 150 194 134 C 194 118 186 96 178 76 Z" />

      {/* Rivets */}
      <g opacity={0.6}>
        <circle cx={110} cy={88} r={1.8} />
        <circle cx={150} cy={88} r={1.8} />
      </g>

      {/* Keys */}
      <g>
        {row1.map((cx) => (
          <circle key={cx} cx={cx} cy={104} r={4} />
        ))}
        {row2.map((cx) => (
          <circle key={cx} cx={cx} cy={120} r={4} />
        ))}
        {row3.map((cx) => (
          <circle key={cx} cx={cx} cy={136} r={4} />
        ))}
      </g>

      {/* Space bar */}
      <path d="M 92 144 Q 130 140 168 144 Q 174 147 168 151 Q 130 155 92 151 Q 86 147 92 144 Z" />

      {/* Feet */}
      <g opacity={0.8}>
        <path d="M 92 158 V 168" />
        <path d="M 168 158 V 168" />
      </g>
    </svg>
  )
}