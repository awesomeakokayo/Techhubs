import { TRACKS, Resource, Project } from './tracks'
import { getStageLearningPlan, getProjectBrief, STAGE_PROJECT_MAP, PORTFOLIO_PROJECT, type ProjectBrief } from './curriculum'
import { getExtraProjects, getExtraProject } from './curriculum-extended-projects'
import { getExtendedStageResourcesForStage } from './curriculum-extended-resources'
import { getStageWorkedExample } from './stage-worked-examples'
import { getPackageStageContent } from './curriculum-package/stage-content.generated'
import type { PublicSubmissionContract } from './project-verification/contract'
import { questionIdFor } from './quiz-attempts'

export type GuidedStepType = 'concept' | 'resource' | 'practice' | 'project' | 'checkpoint' | 'quiz'

export interface GuidedStep {
  index: number
  type: GuidedStepType
  title: string
  description: string
  estimatedTime: string
  resourceUrl?: string
  resourceId?: string
  projectId?: string
  projectLevel?: 'beginner' | 'intermediate' | 'advanced'
  projectBrief?: ProjectBrief
  isPortfolio?: boolean
  stageId: number
  quizQuestions?: QuizQuestion[]
  topics?: string[]
  techTags?: string[]
  resourceType?: string
  resourceSource?: string
  resourceFree?: boolean
  /** Imported content is explicitly labelled until a named review is recorded. */
  contentReviewStatus?: 'needs_human_review'
  contentProvenance?: Record<string, unknown>
  /** A historical completion is preserved, but was not scored on this quiz version. */
  legacyGrandfathered?: boolean
}

export type QuizCognitiveLevel = 'recall' | 'understand' | 'apply' | 'analyze' | 'evaluate'

export interface QuizQuestion {
  /** Stable package question id; legacy authored questions may omit it. */
  id?: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  /** Weight out of 100. If any question supplies points, every question must. */
  points?: number
  /** A missed critical question fails the attempt regardless of the total score. */
  critical?: boolean
  /** Objective the question assesses, used for remediation without revealing the key. */
  objective?: string
  /** Optional remediation note retained server-side for a missed question. */
  feedbackOnIncorrect?: string | null
  difficulty?: string | null
  /** Curriculum provenance. AI assessments populate these explicitly in Phase 6. */
  teachingSource?: string
  teachingStageId?: number
  cognitiveLevel?: QuizCognitiveLevel
  /** Imported content remains explicitly unapproved until a named review is recorded. */
  reviewStatus?: 'needs_human_review' | 'reviewed'
  provenance?: Record<string, unknown>
}

/** A quiz question as sent to the client: never includes the answer or rationale. */
export type PublicQuizQuestion = Pick<
  QuizQuestion,
  'id' | 'question' | 'options' | 'points' | 'objective' | 'difficulty' | 'teachingSource' | 'teachingStageId' | 'cognitiveLevel' | 'reviewStatus'
>

/** Public submission-assessment state attached to a project step. */
export interface PublicSubmissionState {
  status: string
  code?: string | null
  reviewSummary?: string | null
  criteria?: { criterionId: string; status: string; evidence: string; feedback: string; suggestedFix?: string; confidence: number }[] | null
  decision?: { outcome: string; score: number; decisionReason: string } | null
  warnings?: string[]
  reason?: string | null
  helpGuideId?: string | null
  evidenceFingerprint?: string | null
  attemptCount?: number
  minWords?: number | null
  wordCount?: number | null
  artifacts?: { kind: string; url: string }[]
  explanation?: string
}

/** A guided step as sent to the client: quiz answers are stripped. */
export type PublicGuidedStep = Omit<GuidedStep, 'quizQuestions'> & {
  quizQuestions?: PublicQuizQuestion[]
  submissionContract?: PublicSubmissionContract
  submission?: PublicSubmissionState | null
}

/** Remove answers and explanations before a step leaves the server. */
export function toPublicStep(step: GuidedStep): PublicGuidedStep {
  if (step.type !== 'quiz' || !step.quizQuestions) return step
  return {
    ...step,
    quizQuestions: step.quizQuestions.map((question, index) => ({
      // Legacy authored questions have no stored id. Derive the same stable id
      // the grader uses so the client can submit an answer to every question.
      id: questionIdFor(question, index, step.stageId),
      question: question.question,
      options: question.options,
      points: question.points,
      objective: question.objective,
      difficulty: question.difficulty,
      teachingSource: question.teachingSource,
      teachingStageId: question.teachingStageId,
      cognitiveLevel: question.cognitiveLevel,
      reviewStatus: question.reviewStatus,
    })),
  }
}

export const RESOURCE_STAGE_MAP: Record<string, Record<string, number>> = {
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
    'cr-0a': 1, 'cr-1': 1, 'cr-2': 1, 'cr-19': 1,
    'cr-21': 2, 'cr-22': 2,
    'cr-3': 3, 'cr-4': 3, 'cr-5': 3, 'cr-15': 3,
    'cr-6': 4, 'cr-7': 4, 'cr-0b': 4,
    'cr-12': 5, 'cr-18': 5, 'cr-20': 5,
    'cr-11': 7, 'cr-16': 8,
    'cr-8': 9, 'cr-9': 9, 'cr-10': 9, 'cr-14': 9,
    'cr-17': 10,
    'cr-13': 11,
    'cr-23': 6,
  },
  projectmgmt: {
    'pm-1': 1, 'pm-4': 1,
    'pm-6': 2,
    'pm-2': 3, 'pm-3': 3,
    'pm-5': 4, 'pm-8': 4, 'pm-9': 4,
    'pm-10': 5, 'pm-11': 5,
    'pm-7': 6,
    'pm-12': 6,
  },
  productmgmt: {
    'prd-1': 1, 'prd-3': 1,
    'prd-10': 2,
    'prd-5': 3,
    'prd-11': 4, 'prd-12': 4, 'prd-13': 4,
    'prd-6': 5,
    'prd-7': 6,
    'prd-9': 7,
    'prd-2': 8, 'prd-4': 8, 'prd-8': 8,
  },
  dart: {
    'dart-1': 1, 'dart-2': 1, 'dart-3': 1,
    'dart-4': 1, 'dart-5': 4, 'dart-6': 1,
    'dart-7': 4, 'dart-8': 4,
    'dart-10': 3, 'dart-11': 3,
    'dart-12': 2,
  },
  sonic: {
    'son-1': 1, 'son-2': 2, 'son-3': 3,
    'son-4': 3, 'son-5': 4, 'son-6': 3,
    'son-7': 2, 'son-8': 3, 'son-9': 5,
    'son-10': 6, 'son-11': 6,
  },
}

function formatBrief(brief: ProjectBrief): string {
  const list = (items: string[]) => items.map((item) => `• ${item}`).join('\n')
  const sections = [
    'THE PROBLEM\n' + brief.problem,
    'WHO IT IS FOR\n' + brief.audience,
    'OBJECTIVE\n' + brief.objective,
  ]
  if (brief.prerequisites?.length) sections.push('PREREQUISITES\n' + list(brief.prerequisites))
  sections.push(
    'FUNCTIONAL REQUIREMENTS\n' + list(brief.functionalRequirements),
    'CONSTRAINTS\n' + list(brief.constraints),
    'MILESTONES\n' + list(brief.milestones),
    'ACCEPTANCE CRITERIA\n' + list(brief.acceptanceCriteria),
    'EVIDENCE TO SUBMIT\n' + list(brief.evidence),
  )
  if (brief.commonFailureCases?.length) sections.push('COMMON FAILURE CASES\n' + list(brief.commonFailureCases))
  sections.push('STRETCH GOAL\n' + brief.stretchGoal)
  return sections.join('\n\n')
}

export function buildGuidedPath(trackId: string): GuidedStep[] {
  const track = TRACKS.find((t) => t.id === trackId)
  if (!track) return []

  const steps: GuidedStep[] = []
  let index = 0

  for (const stage of track.roadmap) {
    const plan = getStageLearningPlan(trackId, stage.id)
    const packageStage = getPackageStageContent(trackId, stage.id)
    const workedExample = getStageWorkedExample(trackId, stage.id) ?? packageStage?.workedExample ?? null
    const objective = packageStage?.objective ?? plan?.objective
    const successCriteria =
      packageStage?.targetOutcomes?.length ? packageStage.targetOutcomes : (plan?.successCriteria ?? [])
    const commonMistakes =
      packageStage?.commonMistakes?.length ? packageStage.commonMistakes : (plan?.commonMistakes ?? [])
    const concepts = packageStage?.topics?.length ? packageStage.topics : stage.topics
    const conceptDescription = objective
      ? [
          stage.description,
          `OBJECTIVE\n${objective}`,
          concepts.length ? `CORE TOPICS\n${concepts.map((item) => `- ${item}`).join('\n')}` : '',
          successCriteria.length ? `SUCCESS CRITERIA\n${successCriteria.map((item) => `- ${item}`).join('\n')}` : '',
          packageStage?.prerequisites?.length
            ? `BEFORE YOU START\n${packageStage.prerequisites.map((item) => `- ${item}`).join('\n')}`
            : '',
          workedExample ? `WORKED EXAMPLE\n${workedExample}` : '',
          commonMistakes.length ? `COMMON MISTAKES\n${commonMistakes.map((item) => `- ${item}`).join('\n')}` : '',
          'Before the knowledge check, complete the guided practice and be able to explain each decision you made.',
        ]
          .filter(Boolean)
          .join('\n\n')
      : stage.description

    steps.push({
      index: index++,
      type: 'concept',
      title: stage.title,
      description: conceptDescription,
      estimatedTime: stage.duration,
      stageId: stage.id,
      topics: concepts,
      ...(packageStage
        ? {
            contentReviewStatus: 'needs_human_review' as const,
            contentProvenance: {
              package: packageStage.packageProvenance.package,
              sourcePackageHash: packageStage.packageProvenance.sourcePackageHash,
              instructionNote: packageStage.instructionNote,
              resourceStatus: packageStage.resourceDisposition.status,
              resourceRequired: packageStage.resourceDisposition.required,
              resourceReason: packageStage.resourceDisposition.reason,
            },
          }
        : {}),
    })

    const stageResources = [
      // Researched, content-verified resources first, then the base catalogue
      // resources. De-duplicated by URL so the learner never sees a repeat.
      ...getExtendedStageResourcesForStage(trackId, stage.id),
      ...track.resources.filter((resource) => {
        const map = RESOURCE_STAGE_MAP[trackId]
        if (!map) return false
        return map[resource.id] === stage.id
      }),
    ].filter((resource, position, all) => all.findIndex((other) => other.url === resource.url) === position)

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

    const practiceInstructions = packageStage?.practice?.instructions ?? plan?.exercise ?? null
    if (practiceInstructions) {
      const practiceBody = [
        practiceInstructions,
        packageStage?.practice?.expectedOutput ? `WHAT TO PRODUCE\n${packageStage.practice.expectedOutput}` : '',
        packageStage?.practice?.hints?.length
          ? `HINTS\n${packageStage.practice.hints.map((item) => `- ${item}`).join('\n')}`
          : '',
        /This is ungraded practice/i.test(practiceInstructions)
          ? ''
          : 'This is ungraded practice. Complete it before the knowledge check so you can answer from experience, not memory.',
      ]
        .filter(Boolean)
        .join('\n\n')
      steps.push({
        index: index++,
        type: 'practice',
        title: `Practice: ${stage.title}`,
        description: `DO THIS NOW\n${practiceBody}`,
        estimatedTime: packageStage?.practice ? '20-45 min' : '20-45 min',
        stageId: stage.id,
        resourceType: 'practice',
        resourceSource: 'TechSkillHub Guided Practice',
        resourceFree: true,
        ...(packageStage?.practice
          ? {
              contentReviewStatus: 'needs_human_review' as const,
              contentProvenance: {
                package: '06_STAGE_MASTERY_AND_PRACTICE.json',
                stageId: stage.id,
                resourceStatus: packageStage.resourceDisposition.status,
                resourceRequired: packageStage.resourceDisposition.required,
                resourceReason: packageStage.resourceDisposition.reason,
              },
            }
          : {}),
      })
    }

    const quizQuestions: QuizQuestion[] | undefined = packageStage?.quiz?.length
      ? packageStage.quiz.map((question) => ({
          ...question,
          reviewStatus: 'needs_human_review' as const,
          provenance: question.provenance as unknown as Record<string, unknown>,
        }))
      : plan?.knowledgeCheck

    if (quizQuestions?.length) {
      steps.push({
        index: index++,
        type: 'quiz',
        title: `Knowledge check: ${stage.title}`,
        description: 'Answer from what you learned in this stage. Your answers are validated on the server and you can retry freely.',
        estimatedTime: '5-10 min',
        stageId: stage.id,
        quizQuestions,
        ...(packageStage
          ? {
              contentReviewStatus: 'needs_human_review' as const,
              contentProvenance: {
                package: '05_QUIZ_BANK.jsonl',
                sourcePackageHash: packageStage.packageProvenance.sourcePackageHash,
                quizVersion: 'computed server-side',
                resourceStatus: packageStage.resourceDisposition.status,
                resourceRequired: packageStage.resourceDisposition.required,
                resourceReason: packageStage.resourceDisposition.reason,
              },
            }
          : {}),
      })
    }

    const stageProjectId = STAGE_PROJECT_MAP[trackId]?.[stage.id]
    const catalogueProjects = [...track.projects, ...getExtraProjects(trackId)]
    const stageProject = catalogueProjects.find((project) => project.id === stageProjectId)
    if (stageProject) {
      steps.push(makeProjectStep(index++, stageProject, stage.id, false))
    }
  }

  const portfolioId = PORTFOLIO_PROJECT[trackId]
  const portfolioProject = [...track.projects, ...getExtraProjects(trackId)].find((project) => project.id === portfolioId)
  if (portfolioProject) {
    steps.push(makeProjectStep(index++, portfolioProject, track.roadmap.length, true))
  }

  return steps
}

function makeProjectStep(
  index: number,
  project: Project,
  stageId: number,
  isPortfolio: boolean,
): GuidedStep {
  const brief = getProjectBrief(project.id, project.level, project.title)
  return {
    index,
    type: 'project',
    title: `${isPortfolio ? 'Portfolio project' : 'Build'}: ${project.title}`,
    description: `${project.description}\n\n${formatBrief(brief)}`,
    estimatedTime: isPortfolio ? '3–10 days' : '1–3 days',
    projectId: project.id,
    projectLevel: project.level,
    projectBrief: brief,
    isPortfolio,
    stageId,
    techTags: project.techTags,
    resourceType: 'build',
    resourceSource: 'TechSkillHub Project Brief',
    resourceFree: true,
  }
}

export function getProject(projectId: string): Project | undefined {
  for (const track of TRACKS) {
    const project = track.projects?.find((item) => item.id === projectId)
    if (project) return project
  }
  return getExtraProject(projectId)
}

/**
 * Minimum number of correct answers required to pass a knowledge check.
 *
 * AI stages keep the 80% mastery bar. Authored non-AI checks are short (three
 * questions), so they allow a single mistake rather than demanding a perfect
 * score. Used by both the server route and the client so they never disagree.
 */
export function requiredCorrectFor(trackId: string, total: number): number {
  if (total <= 0) return 0
  if (trackId.startsWith('ai-')) return Math.ceil(total * 0.8)
  return Math.max(1, total - 1)
}

/* --------------------------------------------------------------------------
 * Guided-path versioning
 *
 * A guided path's step indices are meaningful only for the path version that
 * produced them, so every track whose step list changes carries a bumped
 * version and its enrollments are remapped on load.
 *
 * The remap is NOT a restart: `lib/path-compat.ts` reconstructs the learner's
 * completed steps from their stable activity records and preserves their
 * position, adopting steps that were added after they passed them and never
 * skipping a mandatory assessment. See `lib/path-enrollment.ts` for the
 * database-facing migration. `expectedPathVersion` below is the pure,
 * dependency-light part (which version a track is on), so it stays here.
 * ------------------------------------------------------------------------ */

export const GUIDED_PATH_VERSION = 2
export const AI_GUIDED_PATH_VERSION = 6
/** Applied only to tracks whose path gained authored steps or was restructured. */
export const EXTENDED_PATH_VERSION = 3
/**
 * Applied to tracks whose step shape changed in the curriculum-excellence and
 * evidence-verification passes: embedded stage projects
 * (`lib/curriculum-extended-projects.ts`) and/or researched, content-verified
 * stage resources (`lib/curriculum-extended-resources.ts`). Old step indices
 * cannot be translated safely across those changes.
 */
export const CONTENT_STEP_PATH_VERSION = 6
/** Incremented only for flagship paths whose final client-capstone project changed. */
export const FLAGSHIP_CAPSTONE_PATH_VERSION = 7
export const FLAGSHIP_CAPSTONE_TRACK_IDS = new Set(['frontend', 'backend', 'python'])
export const CONTENT_STEP_TRACK_IDS = new Set([
  'fullstack',
  'datascience',
  'devops',
  'youtube',
  'ai',
  'writing',
  'projectmgmt',
  'dart',
  'productmgmt',
  'sonic',
  'crypto',
  'python',
  'uiux',
  'data',
  'cyber',
])

export function expectedPathVersion(trackId: string, isExtended: boolean): number {
  if (trackId.startsWith('ai-')) return AI_GUIDED_PATH_VERSION
  if (FLAGSHIP_CAPSTONE_TRACK_IDS.has(trackId)) return FLAGSHIP_CAPSTONE_PATH_VERSION
  if (CONTENT_STEP_TRACK_IDS.has(trackId)) return CONTENT_STEP_PATH_VERSION
  return isExtended ? EXTENDED_PATH_VERSION : GUIDED_PATH_VERSION
}

