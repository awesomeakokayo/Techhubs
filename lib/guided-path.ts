import { TRACKS, Resource, Project } from './tracks'
import { QUIZ_DATA } from './quiz-data'

export type GuidedStepType = 'concept' | 'resource' | 'project' | 'checkpoint' | 'quiz'

export interface GuidedStep {
  index: number
  type: GuidedStepType
  title: string
  description: string
  estimatedTime: string
  resourceUrl?: string
  resourceId?: string
  projectId?: string
  stageId: number
  quizQuestions?: QuizQuestion[]
  topics?: string[]
  techTags?: string[]
  resourceType?: string
  resourceSource?: string
  resourceFree?: boolean
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const RESOURCE_STAGE_MAP: Record<string, Record<string, number>> = {
  frontend: {
    'fe-1': 1, 'fe-2': 1, 'fe-5': 1, 'fe-9': 1, 'fe-10': 1,
    'fe-3': 2, 'fe-6': 2, 'fe-14': 2,
    'fe-4': 3, 'fe-7': 3, 'fe-11': 3, 'fe-12': 3, 'fe-13': 3,
    'fe-8': 4, 'fe-15': 5,
  },
  backend: {
    'be-1': 1, 'be-2': 2, 'be-3': 2, 'be-6': 2,
    'be-4': 3, 'be-5': 3, 'be-9': 3,
    'be-7': 4, 'be-8': 4, 'be-10': 4,
    'be-11': 5, 'be-12': 5, 'be-13': 5,
  },
  fullstack: {
    'fs-1': 1, 'fs-2': 1, 'fs-3': 2,
    'fs-4': 3, 'fs-5': 4, 'fs-6': 4,
    'fs-7': 5, 'fs-8': 5, 'fs-9': 5,
  },
  python: {
    'py-1': 1, 'py-2': 1, 'py-5': 1,
    'py-3': 2, 'py-4': 2,
    'py-6': 3, 'py-7': 4, 'py-8': 5,
  },
  uiux: {
    'ux-1': 1, 'ux-3': 1, 'ux-7': 1, 'ux-8': 1,
    'ux-2': 2, 'ux-4': 2,
    'ux-5': 3, 'ux-9': 3,
    'ux-6': 4,
    'ux-10': 5, 'ux-11': 5, 'ux-12': 5,
  },
  qa: {
    'qa-1': 1, 'qa-2': 1, 'qa-6': 1,
    'qa-4': 2,
    'qa-3': 3, 'qa-5': 3,
    'qa-7': 4, 'qa-8': 4, 'qa-9': 4,
  },
  data: {
    'da-5': 1, 'da-1': 2, 'da-2': 2, 'da-8': 2,
    'da-3': 3, 'da-4': 3, 'da-7': 3,
    'da-6': 4,
    'da-9': 5, 'da-10': 5,
  },
  datascience: {
    'ds-1': 1, 'ds-2': 2, 'ds-3': 3, 'ds-5': 3,
    'ds-4': 2, 'ds-6': 4, 'ds-7': 2,
    'ds-8': 5, 'ds-9': 5,
  },
  devops: {
    'dv-1': 1, 'dv-2': 3, 'dv-3': 2,
    'dv-4': 4, 'dv-5': 1, 'dv-6': 4, 'dv-7': 4,
    'dv-8': 5, 'dv-9': 5,
  },
  cyber: {
    'cy-1': 3, 'cy-2': 3, 'cy-3': 3,
    'cy-4': 2, 'cy-5': 1, 'cy-6': 2, 'cy-7': 3,
    'cy-8': 4, 'cy-9': 4,
  },
  mobile: {
    'mob-1': 2, 'mob-2': 2, 'mob-3': 2,
    'mob-4': 1, 'mob-5': 2, 'mob-6': 3,
    'mob-7': 4, 'mob-8': 4,
  },
  video: {
    'vid-1': 1, 'vid-2': 1, 'vid-3': 3,
    'vid-4': 1, 'vid-5': 2, 'vid-6': 3,
    'vid-7': 4, 'vid-8': 4,
  },
  youtube: {
    'yt-1': 1, 'yt-2': 2, 'yt-3': 2,
    'yt-4': 3, 'yt-5': 3, 'yt-6': 2,
    'yt-7': 4, 'yt-8': 4,
  },
  marketing: {
    'mkt-1': 1, 'mkt-2': 2, 'mkt-3': 2,
    'mkt-4': 2, 'mkt-5': 2, 'mkt-6': 2,
    'mkt-7': 3, 'mkt-9': 3,
    'mkt-8': 4, 'mkt-10': 4,
  },
  ai: {
    'ai-1': 1, 'ai-2': 2, 'ai-3': 2,
    'ai-4': 3, 'ai-5': 1, 'ai-6': 4,
  },
  nocode: {
    'nc-1': 1, 'nc-2': 2, 'nc-3': 1,
    'nc-4': 3, 'nc-5': 2,
  },
  writing: {
    'tw-1': 1, 'tw-2': 4, 'tw-3': 3, 'tw-4': 2,
  },
  crypto: {
    'cr-1': 1, 'cr-2': 1, 'cr-3': 3,
    'cr-4': 3, 'cr-5': 3, 'cr-6': 4,
    'cr-7': 3, 'cr-8': 6, 'cr-9': 6,
    'cr-10': 6, 'cr-11': 5, 'cr-12': 4,
    'cr-13': 7, 'cr-14': 6, 'cr-15': 3,
    'cr-16': 5, 'cr-17': 6, 'cr-18': 4,
    'cr-19': 1, 'cr-20': 4,
    'cr-21': 2, 'cr-22': 2,
  },
  projectmgmt: {
    'pm-1': 1, 'pm-2': 2, 'pm-3': 2, 'pm-4': 1,
    'pm-5': 3, 'pm-6': 2, 'pm-7': 5, 'pm-8': 3, 'pm-9': 3,
    'pm-10': 4, 'pm-11': 4,
  },
  productmgmt: {
    'prd-1': 1, 'prd-2': 7, 'prd-3': 1,
    'prd-4': 7, 'prd-5': 3, 'prd-6': 5,
    'prd-7': 5, 'prd-8': 7, 'prd-9': 6,
    'prd-10': 2, 'prd-11': 2, 'prd-12': 4, 'prd-13': 4,
  },
  dart: {
    'dart-1': 1, 'dart-2': 1, 'dart-3': 1,
    'dart-4': 1, 'dart-5': 4, 'dart-6': 1,
    'dart-7': 4, 'dart-8': 4,
    'dart-9': 2, 'dart-10': 3, 'dart-11': 3,
  },
  sonic: {
    'son-1': 1, 'son-2': 2, 'son-3': 3,
    'son-4': 3, 'son-5': 4, 'son-6': 3,
    'son-7': 2, 'son-8': 3, 'son-9': 5,
  },
}

export function buildGuidedPath(trackId: string): GuidedStep[] {
  const track = TRACKS.find((t) => t.id === trackId)
  if (!track) return []

  const steps: GuidedStep[] = []
  let index = 0

  for (const stage of track.roadmap) {
    steps.push({
      index: index++,
      type: 'concept',
      title: stage.title,
      description: stage.description,
      estimatedTime: stage.duration,
      stageId: stage.id,
      topics: stage.topics,
    })

    const stageResources = track.resources
      .filter((r) => {
        const map = RESOURCE_STAGE_MAP[trackId]
        return map ? map[r.id] === stage.id : true
      })
      .sort((a, b) => {
        const order: Record<string, number> = { docs: 0, video: 1, practice: 2, book: 3, tool: 4, community: 5 }
        return (order[a.type] ?? 9) - (order[b.type] ?? 9)
      })

    for (const resource of stageResources) {
      const quiz = getQuizForResource(resource.id)
      steps.push({
        index: index++,
        type: 'resource',
        title: resource.title,
        description: resource.description,
        estimatedTime: '30–90 min',
        resourceUrl: resource.url,
        resourceId: resource.id,
        stageId: stage.id,
        resourceType: resource.type,
        resourceSource: resource.source,
        resourceFree: resource.free,
      })
      if (quiz) {
        steps.push({
          index: index++,
          type: 'quiz',
          title: `Check Your Understanding — ${resource.title}`,
          description: `Verify what you learned from "${resource.title}" before moving on.`,
          estimatedTime: '5–10 min',
          resourceId: resource.id,
          stageId: stage.id,
          quizQuestions: quiz,
        })
      }
    }

    const levelMap: Record<number, string> = { 1: 'beginner', 2: 'beginner', 3: 'intermediate', 4: 'intermediate', 5: 'advanced' }
    const matchingProject = track.projects.find((p) => {
      const target = p.level
      const stageTarget = levelMap[stage.id] || 'beginner'
      if (target === stageTarget) return true
      if (stage.id <= 2 && target === 'beginner') return true
      if (stage.id >= 4 && target === 'advanced') return true
      if (stage.id === 3 && target === 'intermediate') return true
      return false
    })
    if (matchingProject) {
      steps.push({
        index: index++,
        type: 'project',
        title: `Build: ${matchingProject.title}`,
        description: matchingProject.description,
        estimatedTime: '1–3 days',
        projectId: matchingProject.id,
        stageId: stage.id,
        techTags: matchingProject.techTags,
      })
    }

    steps.push({
      index: index++,
      type: 'checkpoint',
      title: `Stage ${stage.id} Complete`,
      description: `You've finished ${stage.title}. Ready to move to the next stage?`,
      estimatedTime: '—',
      stageId: stage.id,
    })
  }

  return steps
}

function getQuizForResource(resourceId: string): QuizQuestion[] | undefined {
  return QUIZ_DATA[resourceId]
}

export function getFirstUnlockedStep(
  steps: GuidedStep[],
  completedStepIndices: number[]
): number {
  for (let i = 0; i < steps.length; i++) {
    if (!completedStepIndices.includes(i)) return i
  }
  return steps.length - 1
}
