const STORAGE_KEY = 'tsh-progress'

export interface TrackProgress {
  started: boolean
  completedStages: number[]
  completedProjects: string[]
  lastVisited?: string
}

export interface ProgressData {
  tracks: Record<string, TrackProgress>
  quizResult?: {
    completed: boolean
    recommendations: string[]
  }
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
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getTrackProgress(trackId: string): TrackProgress {
  const data = getProgress()
  return data.tracks[trackId] ?? defaultProgress()
}

export function startTrack(trackId: string): void {
  const data = getProgress()
  if (!data.tracks[trackId]) data.tracks[trackId] = defaultProgress()
  data.tracks[trackId].started = true
  data.tracks[trackId].lastVisited = new Date().toISOString()
  saveProgress(data)
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

export function saveQuizResult(recommendations: string[]): void {
  const data = getProgress()
  data.quizResult = { completed: true, recommendations }
  saveProgress(data)
}
