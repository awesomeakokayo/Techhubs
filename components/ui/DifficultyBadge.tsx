import { difficultyStars } from '@/lib/icons'

interface DifficultyBadgeProps {
  difficulty: number
  label: string
}

export function DifficultyBadge({ difficulty, label }: DifficultyBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-text-secondary">
      <span aria-hidden="true">{difficultyStars(difficulty)}</span>
      <span>{label}</span>
    </span>
  )
}
