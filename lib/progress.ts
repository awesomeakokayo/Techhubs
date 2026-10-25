const STORAGE_KEY = 'tsh-progress'
const USER_KEY = 'tsh-user'

export function getStoredUserId(): string | null {
  if (typeof window === 'undefined') return null
  try { return localStorage.getItem(USER_KEY) }
  catch { return null }
}

export function setStoredUserId(id: string): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(USER_KEY, id) }
  catch { /* noop */ }
}

export function clearProgress(): void {
  if (typeof window === 'undefined') return
  try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(USER_KEY) }
  catch { /* noop */ }
}

export interface TrackProgress {
  started: boolean
  completedStages: number[]
  completedProjects: string[]
  lastVisited?: string
}

export interface QuizResult {
  completed: boolean
  recommendations: string[]
  level?: 'beginner' | 'intermediate' | 'advanced'
  time?: string
  weeklyHours?: number
  goal?: string
  updatedAt?: string
}

export interface ProgressData {
  tracks: Record<string, TrackProgress>
  quizResult?: QuizResult
  bookmarks?: string[]
}

const defaultProgress = (): TrackProgress => ({
  started: false,
  completedStages: [],
  completedProjects: [],
})

export function getProgress(): ProgressData {
  if (typeof window === 'undefined') return { tracks: {} }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { tracks: {} }
    return JSON.parse(raw) as ProgressData
  } catch {
    return { tracks: {} }
  }
}

export function saveProgress(data: ProgressData): void {
  if (typeof window === 'undefined') return
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
  catch { /* quota exceeded or storage full */ }
}

export function getTrackProgress(trackId: string): TrackProgress {
  const data = getProgress()
  return data.tracks[trackId] ?? defaultProgress()
}

export function toggleStage(trackId: string, stageId: number, totalStages: number): void {
  const data = getProgress()
  if (!data.tracks[trackId]) data.tracks[trackId] = defaultProgress()
  const tp = data.tracks[trackId]
  tp.started = true
  const idx = tp.completedStages.indexOf(stageId)
  if (idx >= 0) tp.completedStages.splice(idx, 1)
  else tp.completedStages.push(stageId)
  tp.lastVisited = new Date().toISOString()
  saveProgress(data)
}

export function toggleProject(trackId: string, projectId: string): void {
  const data = getProgress()
  if (!data.tracks[trackId]) data.tracks[trackId] = defaultProgress()
  const tp = data.tracks[trackId]
  tp.started = true
  const idx = tp.completedProjects.indexOf(projectId)
  if (idx >= 0) tp.completedProjects.splice(idx, 1)
  else tp.completedProjects.push(projectId)
  saveProgress(data)
}

export function getTrackPercent(trackId: string, totalStages: number, totalProjects: number): number {
  const tp = getTrackProgress(trackId)
  const stageWeight = totalStages > 0 ? 0.6 : 0
  const projectWeight = totalProjects > 0 ? 0.4 : 0
  const stagePct = totalStages ? (tp.completedStages.length / totalStages) * stageWeight : 0
  const projectPct = totalProjects ? (tp.completedProjects.length / totalProjects) * projectWeight : 0
  return Math.round((stagePct + projectPct) * 100)
}

export function getInProgressTracks(): string[] {
  const data = getProgress()
  return Object.entries(data.tracks)
    .filter(([, p]) => p.started)
    .map(([id]) => id)
}

export function saveQuizResult(
  recommendations: string[],
  extras?: Pick<QuizResult, 'level' | 'time' | 'weeklyHours' | 'goal'>
): void {
  const data = getProgress()
  data.quizResult = { completed: true, recommendations, ...extras, updatedAt: new Date().toISOString() }
  saveProgress(data)
}

