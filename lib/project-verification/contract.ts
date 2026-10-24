/**
 * Project submission contracts.
 *
 * Every catalogue project declares what it actually needs — which artifact
 * types are required, whether source inspection is part of the rubric, what the
 * learner must explain, and the criteria that will be assessed. Requirements are
 * derived from the project's discipline, level and authored brief, with explicit
 * overrides for projects whose deliverables differ from the discipline default.
 *
 * This is intentionally not code-only: design, video, writing, data,
 * management, marketing, security and no-code projects get their own artifacts.
 */

import type { Project, Track } from '../tracks'
import type { ProjectBrief } from '../curriculum'
import { getPackageProjectOverride } from '../curriculum-package/projects.generated'

export type Discipline =
  | 'software'
  | 'data'
  | 'design'
  | 'video'
  | 'writing'
  | 'marketing'
  | 'management'
  | 'security'
  | 'qa'
  | 'nocode'
  | 'ai-foundations'
  | 'ai-work'
  | 'ai-research'
  | 'ai-content'
  | 'ai-automation'
  | 'ai-agents'
  | 'ai-engineering'

export const ARTIFACT_KINDS = [
  'github_repo',
  'code_sandbox',
  'live_url',
  'notebook',
  'dataset',
  'design_file',
  'design_export',
  'video_url',
  'document_url',
  'document_file',
  'dashboard_url',
  'presentation',
  'image',
  'text',
] as const

export type ArtifactKind = (typeof ARTIFACT_KINDS)[number]

export function isArtifactKind(value: unknown): value is ArtifactKind {
  return typeof value === 'string' && (ARTIFACT_KINDS as readonly string[]).includes(value)
}

export interface ArtifactRequirement {
  kind: ArtifactKind
  label: string
  description: string
  /** When true the submission cannot be assessed without this artifact. */
  required: boolean
  /** Help-center guide id for a beginner "how to submit this" link. */
  helpGuideId?: string
  example?: string
  /** Accepted alternative artifacts for learners who cannot use the preferred tool. */
  alternatives?: { kind: ArtifactKind; label: string; helpGuideId?: string }[]
}

export interface RubricCriterion {
  id: string
  label: string
  weight: number
  /** A mandatory criterion must be `met`; an unmet one blocks progression. */
  mandatory: boolean
}

export interface SubmissionContract {
  projectId: string
  trackId: string
  discipline: Discipline
  /** Bump when the rubric/criteria change so stale passes are invalidated. */
  rubricVersion: string
  requiredArtifacts: ArtifactRequirement[]
  optionalArtifacts: ArtifactRequirement[]
  requiresSourceInspection: boolean
  requiresReadme: boolean
  requiresLivePreview: boolean
  writtenExplanation: { minWords: number; prompts: string[] }
  rubric: RubricCriterion[]
  /** Weighted fraction of criteria that must be met to pass. */
  passThreshold: number
  acceptanceCriteria: string[]
  note?: string
}

/** A stable rubric version derived from the criteria set (not from ordering). */
export function computeRubricVersion(criteria: RubricCriterion[]): string {
  // Labels are material: changing what a criterion asks for must invalidate a
  // prior pass even when its id, weight, and mandatory flag are unchanged.
  const material = criteria
    .map((c) => `${c.id}:${c.mandatory ? 'M' : 'n'}:${c.weight}:${c.label}`)
    .sort()
    .join('|')
  let hash = 0
  for (let i = 0; i < material.length; i += 1) {
    hash = (hash * 31 + material.charCodeAt(i)) | 0
  }
  return `r${(hash >>> 0).toString(36)}-${criteria.length}`
}

const SOFTWARE_TRACKS = new Set(['frontend', 'backend', 'fullstack', 'python', 'devops', 'mobile', 'dart', 'crypto', 'sonic', 'ai-software-development'])
const DATA_TRACKS = new Set(['data', 'datascience'])
const DESIGN_TRACKS = new Set(['uiux', 'ai-design'])
const VIDEO_TRACKS = new Set(['video', 'youtube'])
const WRITING_TRACKS = new Set(['writing'])
const MARKETING_TRACKS = new Set(['marketing'])
const MANAGEMENT_TRACKS = new Set(['projectmgmt', 'productmgmt'])
const SECURITY_TRACKS = new Set(['cyber'])
const QA_TRACKS = new Set(['qa'])
const NOCODE_TRACKS = new Set(['nocode'])
const AI_FOUNDATIONS_TRACKS = new Set(['ai', 'ai-foundations'])
const AI_WORK_TRACKS = new Set(['ai-work'])
const AI_RESEARCH_TRACKS = new Set(['ai-research'])
const AI_CONTENT_TRACKS = new Set(['ai-content', 'ai-youtube'])
const AI_AUTOMATION_TRACKS = new Set(['ai-automation'])
const AI_AGENT_TRACKS = new Set(['ai-agents'])
const AI_ENGINEERING_TRACKS = new Set(['ai-engineering'])

/**
 * Resolve a track's assessment family explicitly. Returning `null` is
 * deliberate: an unrecognised track must fail closed rather than silently
 * receiving the software/GitHub contract.
 */
export function disciplineForTrack(trackId: string): Discipline | null {
  if (SOFTWARE_TRACKS.has(trackId)) return 'software'
  if (DATA_TRACKS.has(trackId)) return 'data'
  if (DESIGN_TRACKS.has(trackId)) return 'design'
  if (VIDEO_TRACKS.has(trackId)) return 'video'
  if (WRITING_TRACKS.has(trackId)) return 'writing'
  if (MARKETING_TRACKS.has(trackId)) return 'marketing'
  if (MANAGEMENT_TRACKS.has(trackId)) return 'management'
  if (SECURITY_TRACKS.has(trackId)) return 'security'
  if (QA_TRACKS.has(trackId)) return 'qa'
  if (NOCODE_TRACKS.has(trackId)) return 'nocode'
  if (AI_FOUNDATIONS_TRACKS.has(trackId)) return 'ai-foundations'
  if (AI_WORK_TRACKS.has(trackId)) return 'ai-work'
  if (AI_RESEARCH_TRACKS.has(trackId)) return 'ai-research'
  if (AI_CONTENT_TRACKS.has(trackId)) return 'ai-content'
  if (AI_AUTOMATION_TRACKS.has(trackId)) return 'ai-automation'
  if (AI_AGENT_TRACKS.has(trackId)) return 'ai-agents'
  if (AI_ENGINEERING_TRACKS.has(trackId)) return 'ai-engineering'
  return null
}

const REPO_HELP = 'publish-a-public-github-repository'
const README_HELP = 'organise-files-and-write-a-readme'
const EXPLAIN_HELP = 'write-a-project-description'
const SECRETS_HELP = 'protect-api-keys-and-personal-data'
const LIVE_HELP = 'publish-and-share-a-live-frontend-project'
const DRIVE_HELP = 'share-google-drive-files'
const DOCS_HELP = 'share-a-document-deliverable'
const FIGMA_HELP = 'share-a-figma-prototype'
const VIDEO_HELP = 'submit-a-video-editing-project'
const TESTING_HELP = 'document-testing-and-demonstrate-it-works'
const PORTFOLIO_HELP = 'prepare-a-portfolio-project'

/** Explicit overrides for projects whose deliverables differ from the default. */
const OVERRIDES: Record<string, Partial<SubmissionContract>> = {
  // Public-facing code projects that must run in a browser.
  'fe-p3': { requiresLivePreview: true },
  'fs-p0': { requiresLivePreview: true },
  // A UI/UX design system is a design artifact, not a repository.
  'ux-p4': {
    discipline: 'design',
    requiredArtifacts: [
      { kind: 'design_file', label: 'Project link — public Figma design file', description: 'Share the main link to the component library file. It must be publicly viewable.', required: true, helpGuideId: FIGMA_HELP, example: 'https://www.figma.com/file/…', alternatives: [{ kind: 'design_export', label: 'Exported screens (PDF/images)', helpGuideId: FIGMA_HELP }] },
    ],
    requiresSourceInspection: false,
  },
  // On-chain data analysis is a data project even inside a software track.
  'cr-p3': { discipline: 'data' },
  'cr-p6': { discipline: 'data' },
  // Marketing/PM deliverable-shaped projects.
  'mkt-p4': { discipline: 'marketing' },
  'pm-p5': { discipline: 'management' },
  'prd-p5': { discipline: 'management' },
}

function baseArtifacts(discipline: Discipline): { required: ArtifactRequirement[]; optional: ArtifactRequirement[] } {
  switch (discipline) {
    case 'software':
      return {
        required: [
          { kind: 'github_repo', label: 'Project link — public GitHub repository', description: 'Share the main link to the project you built. This should point to your actual project repository, not an unrelated website or document.', required: true, helpGuideId: REPO_HELP, example: 'https://github.com/username/project', alternatives: [{ kind: 'code_sandbox', label: 'Public CodeSandbox / StackBlitz', helpGuideId: REPO_HELP }] },
        ],
        optional: [
          { kind: 'live_url', label: 'Live preview', description: 'A working hosted demo.', required: false, helpGuideId: LIVE_HELP },
          { kind: 'image', label: 'Screenshots', description: 'Screenshots of the project running.', required: false },
        ],
      }
    case 'security':
      return {
        required: [
          { kind: 'document_url', label: 'Assessment report from an owned or explicitly authorised lab', description: 'Share the main report. State the authorised scope, what was tested, and what was excluded. Do not target public or real third-party systems.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'image', label: 'Redacted evidence', description: 'Redacted logs or screenshots from the authorised lab.', required: false },
          { kind: 'github_repo', label: 'Lab code or tooling', description: 'Code used in the authorised lab, with no secrets or live target data.', required: false, helpGuideId: REPO_HELP },
          { kind: 'text', label: 'Mitigation / retest notes', description: 'A link to mitigation and safe-retest notes.', required: false, helpGuideId: EXPLAIN_HELP },
        ],
      }
    case 'qa':
      return {
        required: [
          { kind: 'document_url', label: 'Test plan or test report', description: 'Share the actual test plan, manual test report, or exploratory testing notes. A repository is not required.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'image', label: 'Evidence screenshots', description: 'Screenshots or recordings of the observed behaviour.', required: false },
          { kind: 'text', label: 'Bug report or reproduction steps', description: 'A link to a bug report with reproduction steps.', required: false, helpGuideId: EXPLAIN_HELP },
          { kind: 'github_repo', label: 'Test code (optional)', description: 'Automated tests, if the project used them.', required: false, helpGuideId: REPO_HELP },
        ],
      }
    case 'ai-foundations':
      return {
        required: [
          { kind: 'document_url', label: 'Work product, prompt/version log, or evaluation brief', description: 'Share the actual work product. It does not have to be code; it must show the task, the instructions, the output, and your review.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'text', label: 'Evaluation or test-set notes', description: 'A link to representative cases and results.', required: false, helpGuideId: EXPLAIN_HELP },
          { kind: 'image', label: 'Output screenshots', description: 'Screenshots of representative outputs.', required: false },
          { kind: 'github_repo', label: 'Supporting code', description: 'Optional code used to run the workflow.', required: false, helpGuideId: REPO_HELP },
        ],
      }
    case 'ai-work':
      return {
        required: [
          { kind: 'document_url', label: 'Work product and process record', description: 'Share the actual work product and the decisions, review steps, and human checks behind it.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [{ kind: 'image', label: 'Supporting visuals', description: 'Before/after or output screenshots.', required: false }],
      }
    case 'ai-research':
      return {
        required: [
          { kind: 'document_url', label: 'Research brief with sources', description: 'Share the research brief. It must distinguish sources, dates, uncertainty, and the learner’s own analysis.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'dataset', label: 'Dataset or source list', description: 'The dataset or a public source list used in the research.', required: false },
          { kind: 'dashboard_url', label: 'Evidence dashboard', description: 'A public dashboard or evidence table.', required: false },
        ],
      }
    case 'ai-content':
      return {
        required: [
          { kind: 'document_url', label: 'Published or shareable content plus editorial record', description: 'Share the actual content and the editorial decisions, source checks, and human review behind it.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'video_url', label: 'Video deliverable', description: 'If the deliverable is a video, share an accessible preview.', required: false, helpGuideId: VIDEO_HELP },
          { kind: 'image', label: 'Creative or analytics evidence', description: 'Screenshots of the creative or performance evidence.', required: false },
        ],
      }
    case 'ai-automation':
      return {
        required: [
          { kind: 'document_url', label: 'Workflow design, run log, and failure record', description: 'Show the inputs, rules, exceptions, failure handling, permissions, and one real test run. Do not include secrets or private records.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'live_url', label: 'Workflow demo', description: 'A safe demo or sandbox link.', required: false, helpGuideId: LIVE_HELP },
          { kind: 'github_repo', label: 'Workflow code', description: 'Supporting automation code with no secrets.', required: false, helpGuideId: REPO_HELP },
          { kind: 'image', label: 'Run screenshots', description: 'Screenshots of a real run and failure case.', required: false },
        ],
      }
    case 'ai-agents':
      return {
        required: [
          { kind: 'document_url', label: 'Agent design, tool permissions, traces, and failure handling', description: 'Show the tool boundary, approvals, memory/data rules, at least one failure case, and human escalation. No live credentials or private data.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'github_repo', label: 'Agent code or trace fixtures', description: 'Supporting code or sanitized traces.', required: false, helpGuideId: REPO_HELP },
          { kind: 'live_url', label: 'Sandbox demo', description: 'A safe, non-production demo.', required: false, helpGuideId: LIVE_HELP },
          { kind: 'image', label: 'Trace screenshots', description: 'Sanitized screenshots of agent runs.', required: false },
        ],
      }
    case 'ai-engineering':
      return {
        required: [
          { kind: 'github_repo', label: 'Application or evaluation repository', description: 'Share the actual implementation, including tests or evaluation harness where available.', required: true, helpGuideId: REPO_HELP, alternatives: [{ kind: 'code_sandbox', label: 'Public sandbox', helpGuideId: REPO_HELP }] },
        ],
        optional: [
          { kind: 'document_url', label: 'Evaluation report', description: 'A report covering quality, cost, latency, security, and failure behaviour.', required: false, helpGuideId: DOCS_HELP },
          { kind: 'dashboard_url', label: 'Evaluation dashboard', description: 'A public results dashboard.', required: false },
        ],
      }
    case 'nocode':
      return {
        required: [
          { kind: 'live_url', label: 'Project link — public app preview', description: 'Share the main link to the app you built. It must be publicly reachable.', required: true, helpGuideId: LIVE_HELP },
        ],
        optional: [
          { kind: 'image', label: 'Screenshots', description: 'Screenshots of the main screens and flows.', required: false },
          { kind: 'document_url', label: 'Build documentation', description: 'A document describing the data model and workflows.', required: false, helpGuideId: DOCS_HELP },
        ],
      }
    case 'data':
      return {
        required: [
          { kind: 'github_repo', label: 'Project link — public repository or notebook', description: 'Share the main link to your analysis code so it can be reproduced.', required: true, helpGuideId: REPO_HELP, alternatives: [{ kind: 'notebook', label: 'Public hosted notebook', helpGuideId: REPO_HELP }] },
        ],
        optional: [
          { kind: 'dataset', label: 'Dataset provenance', description: 'Where the data came from and how it was obtained.', required: false },
          { kind: 'dashboard_url', label: 'Published dashboard', description: 'A public dashboard of the results.', required: false },
        ],
      }
    case 'design':
      return {
        required: [
          { kind: 'design_file', label: 'Project link — public Figma file/prototype', description: 'Share the main link to your design. It must be publicly viewable.', required: true, helpGuideId: FIGMA_HELP, alternatives: [{ kind: 'design_export', label: 'Exported design (PDF/images)', helpGuideId: FIGMA_HELP }] },
        ],
        optional: [{ kind: 'image', label: 'Key screens', description: 'Screenshots of the important screens or states.', required: false }],
      }
    case 'video':
      return {
        required: [
          { kind: 'video_url', label: 'Project link — accessible video preview', description: 'Share the main link to your edited video. A public or unlisted link is fine.', required: true, helpGuideId: VIDEO_HELP },
        ],
        optional: [
          { kind: 'image', label: 'Key frames', description: 'Screenshots of key moments.', required: false },
          { kind: 'document_url', label: 'Storyboard or notes', description: 'A storyboard or planning document.', required: false, helpGuideId: DOCS_HELP },
        ],
      }
    case 'writing':
      return {
        required: [
          { kind: 'document_url', label: 'Project link — public document', description: 'Share the main link to your actual written work (publicly accessible).', required: true, helpGuideId: DOCS_HELP, alternatives: [{ kind: 'document_file', label: 'PDF export', helpGuideId: DOCS_HELP }] },
        ],
        optional: [{ kind: 'github_repo', label: 'Repository (docs-as-code)', description: 'If you used a repository for the docs.', required: false, helpGuideId: REPO_HELP }],
      }
    case 'marketing':
      return {
        required: [
          { kind: 'document_url', label: 'Project link — campaign or plan document', description: 'Share the main link to your actual deliverable as a shareable document.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [
          { kind: 'dashboard_url', label: 'Analytics dashboard', description: 'A public dashboard or report of results.', required: false },
          { kind: 'image', label: 'Creative assets', description: 'Screenshots of the creative or campaign.', required: false },
        ],
      }
    case 'management':
      return {
        required: [
          { kind: 'document_url', label: 'Project link — plan or report document', description: 'Share the main link to your actual deliverable as a shareable document.', required: true, helpGuideId: DOCS_HELP },
        ],
        optional: [{ kind: 'image', label: 'Supporting visuals', description: 'Diagrams or screenshots such as Gantt charts.', required: false }],
      }
    default:
      return {
        required: [{ kind: 'document_url', label: 'Project link', description: 'Share the main link to the project you built.', required: true, helpGuideId: DOCS_HELP }],
        optional: [],
      }
  }
}

/** Discipline-specific mandatory rubric criteria that cannot be waived. */
function mandatoryCriteria(discipline: Discipline, requiresReadme: boolean): RubricCriterion[] {
  const base: RubricCriterion[] = []
  if (discipline === 'software' || discipline === 'data') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable source artifact is provided', weight: 1, mandatory: true })
    base.push({ id: 'implementation-present', label: 'Relevant implementation is present (not an empty or unrelated repository)', weight: 2, mandatory: true })
    if (requiresReadme) base.push({ id: 'readme', label: 'A meaningful README explains the project', weight: 1, mandatory: true })
  } else if (discipline === 'security') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable assessment report is provided', weight: 1, mandatory: true })
    base.push({ id: 'authorised-scope', label: 'The report states an owned or explicitly authorised lab scope and excludes real third-party targets', weight: 2, mandatory: true })
    base.push({ id: 'evidence-present', label: 'Redacted reproduction evidence is present', weight: 2, mandatory: true })
  } else if (discipline === 'qa') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable test plan or report is provided', weight: 1, mandatory: true })
    base.push({ id: 'test-evidence-present', label: 'The report contains actual test evidence, not only a plan or claim', weight: 2, mandatory: true })
  } else if (discipline === 'ai-foundations' || discipline === 'ai-work') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable work product is provided', weight: 1, mandatory: true })
    base.push({ id: 'ai-workflow-present', label: 'The submission shows the task, instructions, output, and human review', weight: 2, mandatory: true })
  } else if (discipline === 'ai-research') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable research brief is provided', weight: 1, mandatory: true })
    base.push({ id: 'sources-present', label: 'Sources, dates, and uncertainty are distinguishable from the learner’s analysis', weight: 2, mandatory: true })
  } else if (discipline === 'ai-content') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable content deliverable is provided', weight: 1, mandatory: true })
    base.push({ id: 'original-content-present', label: 'The content is original and materially reviewed, not unedited model output', weight: 2, mandatory: true })
  } else if (discipline === 'ai-automation') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable workflow record is provided', weight: 1, mandatory: true })
    base.push({ id: 'workflow-controls', label: 'Inputs, rules, exceptions, failure handling, permissions, and one real run are documented', weight: 2, mandatory: true })
  } else if (discipline === 'ai-agents') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable agent design or trace record is provided', weight: 1, mandatory: true })
    base.push({ id: 'permissions-failure-handling', label: 'Tool permissions, memory/data rules, a failure case, and human escalation are explicit', weight: 2, mandatory: true })
  } else if (discipline === 'ai-engineering') {
    base.push({ id: 'artifact-public', label: 'A public, inspectable implementation is provided', weight: 1, mandatory: true })
    base.push({ id: 'implementation-present', label: 'Relevant implementation is present (not an empty or unrelated repository)', weight: 2, mandatory: true })
    base.push({ id: 'evaluation-present', label: 'Evaluation of quality, cost, latency, security, or failure behaviour is present', weight: 1, mandatory: true })
    if (requiresReadme) base.push({ id: 'readme', label: 'A meaningful README explains the project', weight: 1, mandatory: true })
  } else if (discipline === 'nocode') {
    base.push({ id: 'artifact-public', label: 'A publicly reachable app or preview is provided', weight: 1, mandatory: true })
    base.push({ id: 'implementation-present', label: 'The app implements the required behaviour', weight: 2, mandatory: true })
  } else if (discipline === 'design') {
    base.push({ id: 'artifact-public', label: 'A publicly viewable design artifact is provided', weight: 1, mandatory: true })
    base.push({ id: 'design-rationale', label: 'The submission explains design decisions', weight: 1, mandatory: true })
  } else if (discipline === 'video') {
    base.push({ id: 'artifact-public', label: 'An accessible video preview is provided', weight: 1, mandatory: true })
    base.push({ id: 'editing-evidence', label: 'Evidence of the actual edit is present', weight: 2, mandatory: true })
  } else {
    base.push({ id: 'artifact-public', label: 'A publicly accessible deliverable is provided', weight: 1, mandatory: true })
    base.push({ id: 'content-present', label: 'The deliverable contains the required content', weight: 2, mandatory: true })
  }
  base.push({ id: 'explanation-relevant', label: 'The written explanation describes the actual submitted work', weight: 1, mandatory: true })
  return base
}

function pilotArtifacts(
  items: Array<{ kind: string; label: string; description: string; required: boolean; helpGuideId?: string; alternatives?: Array<{ kind: string; label: string; helpGuideId?: string }> }>,
): ArtifactRequirement[] {
  return items.map((item) => {
    if (!isArtifactKind(item.kind)) {
      throw new Error(`UNRESOLVED_ARTIFACT_KIND:${item.kind}`)
    }
    return {
      kind: item.kind,
      label: item.label,
      description: item.description,
      required: item.required,
      helpGuideId: item.helpGuideId,
      alternatives: item.alternatives?.map((alternative) => {
        if (!isArtifactKind(alternative.kind)) throw new Error(`UNRESOLVED_ARTIFACT_KIND:${alternative.kind}`)
        return { kind: alternative.kind, label: alternative.label, helpGuideId: alternative.helpGuideId }
      }),
    }
  })
}

export function deriveContract(input: {
  project: Pick<Project, 'id' | 'title' | 'level' | 'techTags'>
  track: Pick<Track, 'id' | 'name'>
  brief: ProjectBrief
}): SubmissionContract {
  const { project, track, brief } = input
  const override = OVERRIDES[project.id] ?? {}
  const packageOverride = getPackageProjectOverride(project.id)
  const discipline = (packageOverride?.discipline as Discipline | undefined) ?? override.discipline ?? disciplineForTrack(track.id)
  if (!discipline) throw new Error(`UNRESOLVED_DISCIPLINE:${track.id}`)

  const artifacts = baseArtifacts(discipline)
  const requiredArtifacts = packageOverride ? pilotArtifacts(packageOverride.requiredArtifacts) : override.requiredArtifacts ?? artifacts.required
  const optionalArtifacts = packageOverride ? pilotArtifacts(packageOverride.optionalArtifacts) : override.optionalArtifacts ?? artifacts.optional

  const requiresSourceInspection =
    packageOverride?.requiresSourceInspection ??
    override.requiresSourceInspection ??
    (discipline === 'software' || discipline === 'security' || discipline === 'data')
  const requiresReadme = packageOverride?.requiresReadme ?? override.requiresReadme ?? requiresSourceInspection
  const requiresLivePreview =
    packageOverride?.requiresLivePreview ?? override.requiresLivePreview ?? requiredArtifacts.some((a) => a.kind === 'live_url')

  // Package rubrics already total 100. Runtime safety gates are added at
  // weight 0: they can fail an otherwise high-scoring submission without
  // changing the package weighting.
  const criteria: RubricCriterion[] = packageOverride
    ? [
        ...packageOverride.rubric.map((criterion) => ({
          id: criterion.id,
          label: criterion.label,
          weight: criterion.weight,
          mandatory: criterion.mandatory,
        })),
        ...mandatoryCriteria(discipline, requiresReadme)
          .filter((criterion) => !packageOverride.rubric.some((existing) => existing.id === criterion.id))
          .map((criterion) => ({ ...criterion, weight: 0 })),
      ]
    : [
        ...mandatoryCriteria(discipline, requiresReadme),
        ...brief.acceptanceCriteria.map((label, index) => ({
          id: `ac-${index + 1}`,
          label,
          weight: 1,
          mandatory: false,
        })),
      ]

  const minWords = packageOverride?.writtenExplanationMinWords ?? (project.level === 'advanced' ? 120 : project.level === 'intermediate' ? 80 : 50)
  const acceptanceCriteria = packageOverride?.acceptanceCriteria.length ? packageOverride.acceptanceCriteria : brief.acceptanceCriteria

  return {
    projectId: project.id,
    trackId: track.id,
    discipline,
    rubricVersion: computeRubricVersion(criteria),
    requiredArtifacts,
    optionalArtifacts,
    requiresSourceInspection,
    requiresReadme,
    requiresLivePreview,
    writtenExplanation: {
      minWords,
      prompts: [
        'What problem does your project solve, and who is it for?',
        'What did you build, and which parts are your own work?',
        'How can someone see or run it?',
        brief.commonFailureCases?.length ? 'Which edge cases or mistakes did you handle?' : 'What would you improve next?',
        ...(packageOverride?.writtenExplanationPrompts ?? []),
      ],
    },
    rubric: criteria,
    passThreshold: packageOverride?.passThreshold ?? 0.8,
    acceptanceCriteria,
    note: packageOverride?.note ?? override.note,
  }
}

/** Public-safe view of a contract to send to the browser (no rubric internals). */
export interface PublicSubmissionContract {
  projectId: string
  discipline: Discipline
  requiredArtifacts: ArtifactRequirement[]
  optionalArtifacts: ArtifactRequirement[]
  writtenExplanation: { minWords: number; prompts: string[] }
  acceptanceCriteria: string[]
  requiresSourceInspection: boolean
  rubric: { id: string; label: string; mandatory: boolean }[]
  passThreshold: number
  note?: string
}

export function toPublicContract(contract: SubmissionContract): PublicSubmissionContract {
  return {
    projectId: contract.projectId,
    discipline: contract.discipline,
    requiredArtifacts: contract.requiredArtifacts,
    optionalArtifacts: contract.optionalArtifacts,
    writtenExplanation: contract.writtenExplanation,
    acceptanceCriteria: contract.acceptanceCriteria,
    requiresSourceInspection: contract.requiresSourceInspection,
    rubric: contract.rubric.map((c) => ({ id: c.id, label: c.label, mandatory: c.mandatory })),
    passThreshold: contract.passThreshold,
    note: contract.note,
  }
}

export { REPO_HELP, README_HELP, EXPLAIN_HELP, SECRETS_HELP, LIVE_HELP, DRIVE_HELP, DOCS_HELP, FIGMA_HELP, VIDEO_HELP, TESTING_HELP, PORTFOLIO_HELP }

// ─────────────────────────────────────────────────────────────────────────────
// Section-level mastery contracts
//
// Some progression-bearing sections (notably the AI tracks) embed a "Build"
// step that has no mapped portfolio project. Rather than leave the step
// unassessable (a dead end), the section is verified through a *mastery
// contract*: the learner demonstrates the section's objective in their own
// words (with an optional artifact link). It reuses the same assessment
// pipeline — reservation/idempotency/credits/fail-closed — via a synthetic
// project id stored in the same submission map.
// ─────────────────────────────────────────────────────────────────────────────

/** Synthetic, stable assessment id for a section-level mastery gate. */
export function stageMasteryProjectId(trackId: string, stageId: number): string {
  return `stage:${trackId}:${stageId}`
}

export function isStageMasteryProjectId(projectId: string): boolean {
  return typeof projectId === 'string' && projectId.startsWith('stage:')
}

function shortHash(material: string): string {
  let hash = 0
  for (let i = 0; i < material.length; i += 1) {
    hash = (hash * 31 + material.charCodeAt(i)) | 0
  }
  return (hash >>> 0).toString(36)
}

function truncate(value: string, max: number): string {
  const text = (value ?? '').trim()
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`
}

export interface StageMasteryInput {
  trackId: string
  stageId: number
  stageTitle: string
  objective: string
  successCriteria: string[]
  level?: string
  /** Objective-anchored rubric imported for a reviewed pilot stage. */
  rubric?: Array<{ id: string; label: string; weight: number; mandatory: boolean }>
  note?: string
}

/**
 * A section-level, AI-verified mastery contract.
 *
 * There is NO mandatory public artifact: mastery is judged on whether the
 * learner's evidence demonstrates the section objective, its reasoning and its
 * verification — not on hosting a repository. The rubric version includes the
 * objective/success-criteria text so that editing a section's outcomes changes
 * the version and never silently reinterprets an old decision.
 */
export function deriveStageMasteryContract(input: StageMasteryInput): SubmissionContract {
  const discipline = disciplineForTrack(input.trackId)
  if (!discipline) throw new Error(`UNRESOLVED_DISCIPLINE:${input.trackId}`)
  const packageCriteria = input.rubric?.length
    ? input.rubric.map((criterion) => ({
        id: criterion.id,
        label: truncate(criterion.label, 200),
        weight: criterion.weight,
        mandatory: criterion.mandatory,
      }))
    : null
  const criteria: RubricCriterion[] = packageCriteria
    ? [
        ...packageCriteria,
        {
          id: 'objective-demonstrated',
          label: `Demonstrates the section outcome: ${truncate(input.objective, 200)}`,
          weight: 0,
          mandatory: true,
        },
        {
          id: 'applied-evidence',
          label: 'Describes the specific work they actually did for this section (not general advice or a restatement of the lesson)',
          weight: 0,
          mandatory: true,
        },
      ]
    : [
        {
          id: 'objective-demonstrated',
          label: `Demonstrates the section outcome: ${truncate(input.objective, 200)}`,
          weight: 2,
          mandatory: true,
        },
        {
          id: 'applied-evidence',
          label: 'Describes the specific work they actually did for this section (not general advice or a restatement of the lesson)',
          weight: 2,
          mandatory: true,
        },
        { id: 'reasoning', label: 'Explains the decisions and trade-offs behind the work', weight: 1, mandatory: false },
        {
          id: 'verification',
          label: 'Explains how the result was checked against the section success criteria',
          weight: 1,
          mandatory: false,
        },
        ...input.successCriteria.map((label, index) => ({
          id: `sc-${index + 1}`,
          label: truncate(label, 200),
          weight: 1,
          mandatory: false,
        })),
      ]

  const minWords = input.level === 'advanced' ? 120 : input.level === 'intermediate' ? 80 : 60
  const rubricVersion = `sm-${shortHash(criteria.map((c) => `${c.id}:${c.label}:${c.mandatory ? 'M' : 'n'}:${c.weight}`).join('|'))}-${criteria.length}`

  return {
    projectId: stageMasteryProjectId(input.trackId, input.stageId),
    trackId: input.trackId,
    discipline,
    rubricVersion,
    requiredArtifacts: [],
    optionalArtifacts: [
      { kind: 'document_url', label: 'Artifact link — document, plan or notes', description: 'A public link to what you produced for this section, if you have one.', required: false, helpGuideId: DOCS_HELP },
      { kind: 'github_repo', label: 'Code or repository link', description: 'If you wrote code for this section, link the repository.', required: false, helpGuideId: REPO_HELP },
      { kind: 'live_url', label: 'Live result link', description: 'A link to a live result, workflow or demo.', required: false, helpGuideId: LIVE_HELP },
      { kind: 'image', label: 'Screenshot', description: 'A screenshot of the result.', required: false },
    ],
    requiresSourceInspection: false,
    requiresReadme: false,
    requiresLivePreview: false,
    writtenExplanation: {
      minWords,
      prompts: [
        `What did you do to demonstrate: ${truncate(input.objective, 160)}`,
        'What was your own contribution, and how did you decide what to do?',
        'What was harder than expected, and how did you handle it?',
        'How did you check the result against the success criteria?',
      ],
    },
    rubric: criteria,
    passThreshold: 0.8,
    acceptanceCriteria: input.successCriteria,
    note: input.note ?? 'This is a section mastery check, not a full project brief.',
  }
}
