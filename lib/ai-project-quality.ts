import { AI_PROJECT_BRIEFS } from './ai-project-briefs'
import { AI_PROJECT_EXTENSIONS } from './ai-curriculum'

export interface AIProjectQualityResult {
  projectId: string
  passed: boolean
  missing: string[]
}

export function auditAIProject(projectId: string): AIProjectQualityResult {
  const brief = AI_PROJECT_BRIEFS[projectId]
  if (!brief) return { projectId, passed: false, missing: ['project brief'] }

  const missing: string[] = []
  if (!brief.why.trim()) missing.push('problem/purpose')
  if (brief.deliverables.length < 3) missing.push('deliverables')
  if (brief.acceptanceCriteria.length < 3) missing.push('acceptance criteria')
  if (brief.evidence.length < 2) missing.push('evidence requirements')
  if (!brief.stretchGoal.trim()) missing.push('stretch goal')

  return { projectId, passed: missing.length === 0, missing }
}

export function getAIProjectQualityReport() {
  return Object.keys(AI_PROJECT_EXTENSIONS).length === 0
    ? []
    : Object.values(AI_PROJECT_EXTENSIONS).flat().map((project) => auditAIProject(project.id))
}

export function isAIProjectPortfolioReady(projectId: string) {
  return auditAIProject(projectId).passed
}
