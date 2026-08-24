/**
 * Organic-opportunity scoring model — an internal prioritization tool.
 *
 * It is explicitly NOT a perfect ranking formula. Inputs are normalized to
 * 0..1 and combined into an estimated 0..100 score that ranks what to work
 * on next. Where real search data is not yet available, inputs are estimates
 * and MUST be labeled as such — no fabricated achievements.
 */

import { SEARCH_INTENTS, SearchIntent, getSearchToPageMatrix } from './search-intents'

export interface OpportunityInputs {
  /** Estimated relative search demand (0..1). Estimates until GSC data lands. */
  searchDemand: number
  /** How central the topic is to what TechSkillHub teaches (0..1). */
  productRelevance: number
  /** How strong/complete current content is on the topic (0 = none, 1 = strong). */
  contentGap: number
  /** How likely the topic converts to a learning activity (0..1). */
  conversionPotential: number
}

function normalize(value: number): number {
  if (value <= 1) return Math.min(1, Math.max(0, value))
  if (value <= 10) return Math.min(1, Math.max(0, value / 10))
  return Math.min(1, Math.max(0, value / 100))
}

export function scoreOpportunity(inputs: OpportunityInputs): number {
  const score =
    normalize(inputs.searchDemand) *
    normalize(inputs.productRelevance) *
    normalize(inputs.contentGap) *
    normalize(inputs.conversionPotential)
  return Math.round(score * 100)
}

export interface ScoredOpportunity {
  id: string
  query: string
  cluster: string
  targetPage: string
  status: string
  score: number
  priority: string
  recommendation: string
  inputs: OpportunityInputs
}

/**
 * Current opportunity table derived from the search-intent map.
 * AI estimates remain editorial estimates until real Search Console/Bing data
 * is connected; they are intentionally conservative and clearly labeled.
 */
export function getScoredOpportunities(): ScoredOpportunity[] {
  const rows = getSearchToPageMatrix()
  const estimateFor: Record<string, OpportunityInputs> = {
    'learn-coding': { searchDemand: 0.9, productRelevance: 1, contentGap: 0.3, conversionPotential: 0.9 },
    'get-into-tech': { searchDemand: 0.9, productRelevance: 1, contentGap: 0.2, conversionPotential: 0.8 },
    'learn-web-dev': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.2, conversionPotential: 0.8 },
    'web-dev-roadmap': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.4, conversionPotential: 0.9 },
    'frontend-roadmap': { searchDemand: 0.7, productRelevance: 1, contentGap: 0.3, conversionPotential: 0.9 },
    'backend-roadmap': { searchDemand: 0.6, productRelevance: 1, contentGap: 0.3, conversionPotential: 0.9 },
    'fullstack-roadmap': { searchDemand: 0.6, productRelevance: 1, contentGap: 0.4, conversionPotential: 0.9 },
    'learn-python': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.2, conversionPotential: 0.8 },
    'learn-javascript': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.2, conversionPotential: 0.8 },
    'javascript-roadmap': { searchDemand: 0.6, productRelevance: 1, contentGap: 0.3, conversionPotential: 0.8 },
    'react-roadmap': { searchDemand: 0.6, productRelevance: 1, contentGap: 0.3, conversionPotential: 0.8 },
    'becoming-frontend-dev': { searchDemand: 0.7, productRelevance: 1, contentGap: 0.2, conversionPotential: 0.8 },
    'become-frontend-dev': { searchDemand: 0.7, productRelevance: 1, contentGap: 0.2, conversionPotential: 0.8 },
    'become-backend-dev': { searchDemand: 0.6, productRelevance: 1, contentGap: 0.3, conversionPotential: 0.8 },
    'become-software-engineer': { searchDemand: 0.5, productRelevance: 0.8, contentGap: 0.4, conversionPotential: 0.7 },
    'learn-ai': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-beginner': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-learn': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-for-work': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-prompting': { searchDemand: 0.7, productRelevance: 1, contentGap: 0.7, conversionPotential: 0.8 },
    'ai-research': { searchDemand: 0.7, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.8 },
    'ai-coding': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-youtube': { searchDemand: 0.7, productRelevance: 0.9, contentGap: 0.8, conversionPotential: 0.8 },
    'ai-automation': { searchDemand: 0.7, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-agents': { searchDemand: 0.8, productRelevance: 1, contentGap: 0.8, conversionPotential: 0.9 },
    'ai-design': { searchDemand: 0.6, productRelevance: 0.9, contentGap: 0.8, conversionPotential: 0.8 },
  }

  const results: ScoredOpportunity[] = []
  for (const intent of SEARCH_INTENTS) {
    const inputs: OpportunityInputs = estimateFor[intent.id] ?? {
      searchDemand: 0.5,
      productRelevance: 0.7,
      contentGap: 0.4,
      conversionPotential: 0.6,
    }
    const score = scoreOpportunity(inputs)
    const gap = intent.status === 'gap'
    results.push({
      id: intent.id,
      query: intent.query,
      cluster: intent.cluster,
      targetPage: intent.targetPage,
      status: intent.status,
      score,
      priority: intent.priority,
      recommendation: gap
        ? 'Create/expand the target page and connect it into its journey.'
        : score >= 55
          ? 'Optimize the landing-page funnel (answer, CTA, next step, internal links).'
          : 'Polish titles/descriptions and internal links; revisit with real search data.',
      inputs,
    })
  }
  return results.sort((a, b) => b.score - a.score || a.priority.localeCompare(b.priority))
}

export function getContentPriorityTable(): { opportunity: string; searchIntent: string; existingPage: string; gap: string; funnelValue: string; priority: string }[] {
  const byKey: Record<string, { opportunity: string; gap: string; funnelValue: string }> = {
    'learn-coding': { opportunity: 'Learn coding', gap: 'Weak CTA → fixed (intent CTA + journey)', funnelValue: 'High' },
    'frontend-roadmap': { opportunity: 'Frontend roadmap', gap: 'Strong', funnelValue: 'High' },
    'get-into-tech': { opportunity: 'Get into tech', gap: 'New guide added this stage', funnelValue: 'High' },
    'projects-for-portfolio': { opportunity: 'Portfolio projects', gap: 'Project-level pages only; journey added', funnelValue: 'Medium' },
    'learn-ai': { opportunity: 'Learn AI', gap: 'AI hub + guided paths actively being rebuilt', funnelValue: 'Very High' },
    'ai-coding': { opportunity: 'AI coding', gap: 'AI software-development path + projects', funnelValue: 'Very High' },
    'ai-research': { opportunity: 'AI research', gap: 'Verification practice + evidence project', funnelValue: 'High' },
  }
  return SEARCH_INTENTS.map((i) => {
    const meta = byKey[i.id]
    return {
      opportunity: meta?.opportunity ?? i.query,
      searchIntent: i.intent,
      existingPage: i.targetPage,
      gap: meta?.gap ?? (i.status === 'gap' ? 'No mapped page' : 'Mapped'),
      funnelValue: meta?.funnelValue ?? (i.roadmap ? 'High' : 'Medium'),
      priority: i.priority,
    }
  })
}