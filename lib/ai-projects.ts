import { AI_PROJECT_EXTENSIONS } from './ai-curriculum'

/**
 * Explicit stage mapping for AI portfolio projects.
 * AI projects are selected by competency stage, not by generic difficulty.
 */
export const AI_PROJECT_STAGE_MAP: Record<string, Record<string, number>> = {
  'ai-foundations': { 'ai-f-p3': 6 },
  'ai-work': { 'ai-w-p4': 5 },
  'ai-research': { 'ai-r-p2': 5 },
  'ai-content': { 'ai-c-p4': 5 },
  'ai-youtube': { 'ai-y-p3': 10 },
  'ai-software-development': { 'ai-s-p4': 8 },
  'ai-automation': { 'ai-a-p2': 8 },
  'ai-agents': { 'ai-ag-p2': 10 },
  'ai-engineering': { 'ai-e-p2': 10 },
  'ai-design': { 'ai-d-p2': 8 },
}

export function getAIProjectsForStage(trackId: string, stageId: number) {
  const projects = AI_PROJECT_EXTENSIONS[trackId] ?? []
  const stageMap = AI_PROJECT_STAGE_MAP[trackId] ?? {}
  return projects.filter((project) => stageMap[project.id] === stageId)
}
