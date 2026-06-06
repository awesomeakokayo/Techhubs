import {
  Monitor, Server, Layers, Code2, Palette, Bug, BarChart2, BrainCircuit,
  GitBranch, Shield, Smartphone, Film, Youtube, TrendingUp, Sparkles, Blocks,
  FileText, Coins, type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  Monitor, Server, Layers, Code2, Palette, Bug, BarChart2, BrainCircuit,
  GitBranch, Shield, Smartphone, Film, Youtube, TrendingUp, Sparkles, Blocks, FileText,
  Coins,
}

export function getTrackIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Code2
}


