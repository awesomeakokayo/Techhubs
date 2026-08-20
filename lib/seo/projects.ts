import { TRACKS, Project, ProjectLevel } from '@/lib/tracks'

export const PROJECT_LEVELS: { slug: string; label: string; description: string }[] = [
  {
    slug: 'beginner',
    label: 'Beginner Projects',
    description: 'First projects to build with HTML, CSS, JavaScript and beginner-level Python.',
  },
  {
    slug: 'intermediate',
    label: 'Intermediate Projects',
    description: 'Projects with real architecture — APIs, state management, user flows and data.',
  },
  {
    slug: 'advanced',
    label: 'Advanced Projects',
    description: 'Demanding full-stack, systems and AI-adjacent projects for serious builders.',
  },
]

export function getProjectsByLevel(level: ProjectLevel): { project: Project; trackName: string; trackSlug: string }[] {
  const results: { project: Project; trackName: string; trackSlug: string }[] = []
  for (const track of TRACKS) {
    for (const project of track.projects) {
      if (project.level === level) {
        results.push({ project, trackName: track.name, trackSlug: track.slug })
      }
    }
  }
  return results
}

export function getProjectCount(): { beginner: number; intermediate: number; advanced: number } {
  const counts = { beginner: 0, intermediate: 0, advanced: 0 }
  for (const track of TRACKS) {
    for (const project of track.projects) {
      counts[project.level] += 1
    }
  }
  return counts
}