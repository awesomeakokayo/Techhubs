export type PackageReviewStatus = 'needs_human_review'

export interface PilotQuizQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  feedbackOnIncorrect: string | null
  points: number
  critical: boolean
  objective: string
  difficulty: string | null
  provenance: {
    package: string
    questionId: string
    rationaleSourceKeys: string[]
    reviewStatus: PackageReviewStatus
  }
}

export interface PilotMasteryCriterion {
  id: string
  name: string
  weight: number
  mandatory: boolean
  description: string
  stageSpecificEvidence: string | null
}

export interface PackageResourceCheck {
  url: string
  checkedAt: string
  verificationLevel: 3 | 4
  freeAccess: boolean
  accountRequired: boolean
  paymentRequired: boolean
  contentInspected: boolean
  objectiveRelevant: boolean
  contentChars: number
  excerpt: string
  contentHash: string
  limitations: string[]
}

export interface PackageResourceCandidate {
  candidateId: string
  kind: 'package_primary' | 'alternative'
  title: string
  publisher: string
  url: string
  type: string
  exactPortion: string
  durationMinutes: number | null
  accessNotes: string
  rationale: string
  packageRole: string
  packageDecision: string
  packageScreeningScore: number | null
  checkedAt: string | null
  httpStatus: number | null
  finalUrl: string
  contentChars: number
  excerpt: string
  contentHash: string
  terms: string[]
  objectiveHits: number
  curated: boolean
  states: {
    discovered: boolean
    destination_verified: boolean
    content_inspected: boolean
    current_free_access_verified: boolean
    playback_verified: boolean
    human_reviewed: boolean
    approved: boolean
  }
  objectiveRelevant: boolean
  suitable: boolean
  limitations: string[]
}

export interface SelectedPackageResource {
  candidateId: string
  title: string
  publisher: string
  url: string
  type: string
  source: 'package_primary' | 'alternative'
  exactPortion: string
  durationMinutes: number | null
  accessNotes: string
  rationale: string
  objectiveHits: number
  checkedAt: string
  contentChars: number
  excerpt: string
  contentHash: string
  states: PackageResourceCandidate['states']
  limitations: string[]
}

export interface PackageResourceDisposition {
  status: 'blocked' | 'provisional' | 'verified'
  required: boolean
  stageReady: boolean
  candidateCount: number
  primary: {
    title: string
    publisher: string
    url: string
    rationale: string
    verificationLevel: string | null
    freeAccess: string
    currentCheck: PackageResourceCheck | null
    states: PackageResourceCandidate['states']
  } | null
  selected: SelectedPackageResource | null
  reason: string
}

export interface PackageStageReadiness {
  trackId: string
  stageId: number
  stageTitle: string
  objective: string
  packagePrimaryStatus: 'blocked' | 'provisional' | 'verified'
  packagePrimaryBlocked: boolean
  preflightBlocked: boolean
  required: boolean
  stageReady: boolean
  selected: SelectedPackageResource | null
  primary: PackageResourceCandidate | null
  alternatives: PackageResourceCandidate[]
  candidateCount: number
  reason: string
}

export interface PilotStageContent {
  trackId: string
  stageId: number
  stageTitle: string
  objective: string
  targetOutcomes: string[]
  prerequisites: string[]
  topics: string[]
  workedExample: string | null
  commonMistakes: string[]
  instructionNote: string
  practice: {
    title: string
    instructions: string
    expectedOutput: string
    hints: string[]
    completionCriteria: string[]
  } | null
  quiz: PilotQuizQuestion[]
  mastery: {
    prompt: string
    evidenceFormats: string[]
    criteria: PilotMasteryCriterion[]
    passThreshold: number
    criticalGate: { required: boolean; rule: string } | null
    packageRubricVersion: string
    reviewStatus: PackageReviewStatus
  } | null
  projectIds: string[]
  resourceDisposition: PackageResourceDisposition
  reviewStatus: PackageReviewStatus
  packageProvenance: {
    package: string
    sourcePackageHash: string
    fetchedAt: string | null
    resourceVerification: string
  }
}

export interface PackageProjectBrief {
  problem: string
  audience: string
  objective: string
  prerequisites: string[]
  functionalRequirements: string[]
  constraints: string[]
  milestones: string[]
  acceptanceCriteria: string[]
  evidence: string[]
  commonFailureCases: string[]
  stretchGoal: string
  portfolioPresentation: string
}

export interface PackageExtraProject {
  id: string
  trackId: string
  title: string
  description: string
  level: 'beginner' | 'intermediate' | 'advanced'
  techTags: string[]
  stageIds: number[]
  isPortfolio: boolean
}

export interface PilotProjectOverride {
  projectId: string
  trackId: string
  discipline: string
  requiredArtifacts: Array<{
    kind: string
    label: string
    description: string
    required: boolean
    helpGuideId?: string
    alternatives?: Array<{ kind: string; label: string; helpGuideId?: string }>
  }>
  optionalArtifacts: Array<{
    kind: string
    label: string
    description: string
    required: boolean
    helpGuideId?: string
  }>
  /** Package text evidence is collected through the written explanation field. */
  writtenExplanationPrompts: string[]
  requiresSourceInspection: boolean
  requiresReadme: boolean
  requiresLivePreview: boolean
  writtenExplanationMinWords: number
  rubric: Array<{ id: string; label: string; weight: number; mandatory: boolean }>
  passThreshold: number
  acceptanceCriteria: string[]
  criticalGates: Array<{ gate: string; required: boolean; description?: string; appliesTo?: string[] }>
  packageRubricVersion: string
  reviewStatus: PackageReviewStatus
  note?: string
}
