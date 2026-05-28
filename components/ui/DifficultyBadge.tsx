import { Star } from 'lucide-react'

interface DifficultyBadgeProps {
  difficulty: number
  label: string
}

export function DifficultyBadge({ difficulty, label }: DifficultyBadgeProps) {
  // Map difficulty level to 1, 2, or 3 filled stars
  let filledStars = 1
  if (difficulty === 3) filledStars = 2
  else if (difficulty >= 4) filledStars = 3

  return (
    <span className="inline-flex items-center gap-2 text-xs text-text-secondary">
      <span className="flex items-center gap-0.5 animate-fade-in" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, i) => (
          <Star
            key={i}
            size={11}
            className={i < filledStars ? 'fill-teal text-teal' : 'text-text-muted/30'}
          />
        ))}
      </span>
      <span>{label}</span>
    </span>
  )
}
