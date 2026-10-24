export interface QuizScoredAnswer {
  label: string
  scores: Record<string, number | undefined>
}

export interface QuizRecommendationScores {
  scores: Record<string, number>
  reasons: Record<string, string[]>
}

/**
 * Rebuild recommendation totals from the current answer set.
 *
 * Recomputing rather than incrementing prevents a learner's previous choice
 * being counted twice when they go back and revise an answer.
 */
export function aggregateQuizAnswers(
  answers: readonly (QuizScoredAnswer | null | undefined)[],
): QuizRecommendationScores {
  const scores: Record<string, number> = {}
  const reasons: Record<string, string[]> = {}

  for (const answer of answers) {
    if (!answer) continue

    for (const [trackId, value] of Object.entries(answer.scores)) {
      if (typeof value !== 'number' || !Number.isFinite(value) || value === 0) continue

      scores[trackId] = (scores[trackId] ?? 0) + value
      if (!reasons[trackId]) reasons[trackId] = []
      reasons[trackId].push(answer.label)
    }
  }

  return { scores, reasons }
}
