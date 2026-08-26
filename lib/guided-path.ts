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

export type QuizCognitiveLevel = 'recall' | 'understand' | 'apply' | 'analyze' | 'evaluate'

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Curriculum provenance. AI assessments populate these explicitly in Phase 6. */
  teachingSource?: string
  teachingStageId?: number
  cognitiveLevel?: QuizCognitiveLevel
}

const RESOURCE_STAGE_MAP: Record<string, Record<string, number>> = {
  frontend: {
    'fe-0a': 1,
    'fe-1': 1, 'fe-2': 1, 'fe-5': 1, 'fe-9': 1, 'fe-10': 1,
    'fe-3': 2, 'fe-6': 2, 'fe-14': 2,
    'fe-4': 3, 'fe-7': 3, 'fe-11': 3, 'fe-12': 3, 'fe-13': 3,
    'fe-8': 4, 'fe-15': 5,
    'fe-16': 4, 'fe-17': 4, 'fe-18': 1,
  },
  backend: {
    'be-0': 1, 'be-0b': 2,
    'be-1': 1, 'be-2': 2, 'be-3': 2, 'be-6': 2,
    'be-4': 3, 'be-5': 3, 'be-9': 3,
    'be-7': 4, 'be-8': 4, 'be-10': 4,
    'be-11': 5, 'be-12': 5, 'be-13': 5,
    'be-14': 1, 'be-15': 1,
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
    'qa-0a': 1,
    'qa-1': 1, 'qa-2': 1, 'qa-6': 1,
    'qa-4': 2,
    'qa-3': 3, 'qa-5': 3,
    'qa-7': 4, 'qa-8': 4, 'qa-9': 4,
  },
  data: {
    'da-0a': 1,
    'da-5': 1, 'da-1': 2, 'da-2': 2, 'da-8': 2,
    'da-3': 3, 'da-4': 3, 'da-7': 3,
    'da-6': 4,
    'da-9': 5, 'da-10': 5,
  },
  datascience: {
    'ds-0a': 1,
    'ds-1': 1, 'ds-2': 2, 'ds-3': 3, 'ds-5': 3,
    'ds-4': 2, 'ds-6': 4, 'ds-7': 2,
    'ds-8': 5, 'ds-9': 5,
  },
  devops: {
    'dv-0': 1, 'dv-0b': 2,
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
    'mob-9': 1,
  },
  video: {
    'vid-1': 1, 'vid-2': 1, 'vid-3': 3,
    'vid-4': 1, 'vid-5': 2, 'vid-6': 3,
    'vid-7': 4, 'vid-8': 4,
    'vid-9': 2,
  },
  youtube: {
    'yt-1': 1, 'yt-2': 2, 'yt-3': 2,
    'yt-4': 3, 'yt-5': 3, 'yt-6': 2,
    'yt-7': 4, 'yt-8': 4,
    'yt-9': 1,
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
  'ai-foundations': {
    'ai-f1': 1, 'ai-f2': 3, 'ai-f3': 1,
    'ai-f4': 1, 'ai-f5': 2, 'ai-f6': 3, 'ai-f7': 2,
  },
  'ai-work': {
    'ai-w1': 1, 'ai-w2': 5, 'ai-w3': 1,
  },
  'ai-research': {
    'ai-r1': 1, 'ai-r2': 1,
  },
  'ai-content': {
    'ai-c1': 5, 'ai-c2': 3,
  },
  'ai-youtube': {
    'ai-y1': 5, 'ai-y2': 3,
  },
  'ai-software-development': {
    'ai-s1': 4, 'ai-s2': 3, 'ai-s3': 2,
  },
  'ai-automation': {
    'ai-a1': 5, 'ai-a2': 2, 'ai-a3': 2,
  },
  'ai-agents': {
    'ai-ag1': 1, 'ai-ag2': 3, 'ai-ag3': 10,
  },
  'ai-engineering': {
    'ai-e1': 1, 'ai-e2': 6, 'ai-e3': 1, 'ai-e4': 6,
  },
  'ai-design': {
    'ai-d1': 5, 'ai-d2': 2,
  },
  nocode: {
    'nc-1': 1, 'nc-2': 2, 'nc-3': 1,
    'nc-4': 3, 'nc-5': 2,
  },
  writing: {
    'tw-1': 1, 'tw-2': 4, 'tw-3': 3, 'tw-4': 2,
    'tw-5': 1, 'tw-6': 2, 'tw-7': 3,
  },
  crypto: {
    'cr-0a': 1, 'cr-0b': 3,
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
    'son-10': 6, 'son-11': 6,
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
        if (!map) return false
        return map[r.id] === stage.id
      })

    for (const resource of stageResources) {
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
    }

    const stageQuiz = QUIZ_DATA[stage.quizId ?? '']
    if (stageQuiz?.length) {
      steps.push({
        index: index++,
        type: 'quiz',
        title: `Checkpoint: ${stage.title}`,
        description: 'Complete the knowledge check before continuing.',
        estimatedTime: '10–15 min',
        stageId: stage.id,
        quizQuestions: stageQuiz,
      })
    }
  }

  return steps
}

export function getProject(projectId: string): Project | undefined {
  for (const track of TRACKS) {
    const project = track.projects?.find((item) => item.id === projectId)
    if (project) return project
  }
  return undefined
}
