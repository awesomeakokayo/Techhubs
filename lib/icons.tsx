import {
  Monitor, Server, Layers, Code2, Palette, Bug, BarChart2, BrainCircuit,
  GitBranch, Shield, Smartphone, Film, Youtube, TrendingUp, Sparkles, Blocks,
  FileText, type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Server, Layers, Code2, Palette, Bug, BarChart2, BrainCircuit,
  GitBranch, Shield, Smartphone, Film, Youtube, TrendingUp, Sparkles, Blocks, FileText,
}

export function getTrackIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Code2
}

export function difficultyStars(level: number): string {
  const stars = Math.min(Math.max(level, 1), 5)
  if (stars <= 2) return '⭐'
  if (stars === 3) return '⭐⭐'
  if (stars === 4) return '⭐⭐⭐'
  return '⭐⭐⭐'
}
