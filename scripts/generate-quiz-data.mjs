import { readFileSync, writeFileSync } from 'fs'

const content = readFileSync('lib/tracks.ts', 'utf-8')

const trackIds = [
  'frontend', 'backend', 'fullstack', 'python', 'uiux', 'qa',
  'data', 'datascience', 'devops', 'cyber', 'mobile',
  'video', 'youtube', 'marketing', 'ai', 'nocode', 'writing',
  'crypto', 'projectmgmt', 'productmgmt', 'dart', 'sonic',
]

const QUIZ_TEMPLATES = {
  docs: (title, _description) => [
    { pattern: `What is ${title} primarily used for?`, optBase: ['Web development', 'Documentation reference', 'Data analysis', 'Design'] },
    { pattern: `What type of resource is ${title}?`, optBase: ['A video course', 'Documentation/reference material', 'A practice tool', 'A community forum'] },
  ],
  video: (title, _description) => [
    { pattern: `What format does "${title}" come in?`, optBase: ['Written documentation', 'A video course/tutorial', 'An interactive game', 'A book'] },
    { pattern: `What is the main advantage of "${title}"?`, optBase: ['Visual step-by-step learning', 'Quick reference lookup', 'Hands-on practice', 'Community discussion'] },
  ],
  practice: (title, _description) => [
    { pattern: `What does "${title}" help you do?`, optBase: ['Watch tutorials', 'Practice skills interactively', 'Read documentation', 'Join a community'] },
    { pattern: `How does "${title}" differ from a video tutorial?`, optBase: ['It is longer', 'It involves active hands-on work', 'It is paid only', 'It is harder'] },
  ],
  book: (title, _description) => [
    { pattern: `What format is "${title}"?`, optBase: ['A video series', 'A written book or guide', 'An interactive tool', 'A podcast'] },
    { pattern: `What makes "${title}" valuable?`, optBase: ['Deep comprehensive coverage', 'Quick visual demos', 'Gamified challenges', 'Community support'] },
  ],
  tool: (title, _description) => [
    { pattern: `What is "${title}" best described as?`, optBase: ['A programming language', 'A software tool/platform', 'A CSS framework', 'A database'] },
    { pattern: `When would you use "${title}"?`, optBase: ['To write code', 'To accomplish a specific practical task', 'To learn theory', 'To deploy applications'] },
  ],
  community: (title, _description) => [
    { pattern: `What does "${title}" provide?`, optBase: ['Paid courses', 'Community and networking opportunities', 'Software downloads', 'Code compilation'] },
    { pattern: `Why join "${title}"?', optBase: ['To get certified', 'To connect with peers and experts', 'To download software', 'To watch videos'] },
  ],
}

function generateQuestions(resource) {
  const templates = QUIZ_TEMPLATES[resource.type] || QUIZ_TEMPLATES.docs
  const tpls = templates(resource.title, resource.description)

  return tpls.map((t, i) => {
    const answers = [...t.optBase]
    const correctIdx = i % 2 === 0 ? 0 : 1
    // Shuffle so correct isn't always first
    const correctAnswer = answers[correctIdx]
    const shuffled = [...answers].sort(() => Math.random() - 0.5)
    const newCorrectIdx = shuffled.indexOf(correctAnswer)
    return {
      question: t.pattern,
      options: shuffled,
      correctIndex: newCorrectIdx,
      explanation: `The correct answer is: ${correctAnswer}.`,
    }
  })
}

function extractResources(text, trackId) {
  const re = new RegExp(`id:\\s*"${trackId}"[\\s\\S]*?resources:\\s*\\[([\\s\\S]*?)\\](?=\\s*projects:)`)
  const match = text.match(re)
  if (!match) return []
  const block = match[1]
  const resourceRegex = /\{\s*id:\s*"([^"]+)"[^}]*?title:\s*"([^"]+)"[^}]*?type:\s*"([^"]+)"[^}]*?description:\s*"([^"]+)"/g
  const resources = []
  let m
  while ((m = resourceRegex.exec(block)) !== null) {
    resources.push({ id: m[1], title: m[2], type: m[3], description: m[4].substring(0, 80) })
  }
  return resources
}

const EXISTING_QUIZ_IDS = ['fe-1', 'fe-2', 'fe-3', 'be-1', 'fs-1', 'py-1', 'ux-1', 'qa-1']

let output = `import type { QuizQuestion } from './guided-path'

export const QUIZ_DATA: Record<string, QuizQuestion[]> = {
`

for (const trackId of trackIds) {
  const resources = extractResources(content, trackId)
  for (const res of resources) {
    if (EXISTING_QUIZ_IDS.includes(res.id)) continue
    if (res.type === 'community') continue
    const questions = generateQuestions(res)
    output += `  '${res.id}': [
    { question: '${questions[0]?.question?.replace(/'/g, "\\'") || 'What does this resource cover?'}', options: ${JSON.stringify(questions[0]?.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'])}, correctIndex: ${questions[0]?.correctIndex || 0}, explanation: '${(questions[0]?.explanation || 'Learn this skill thoroughly.').replace(/'/g, "\\'")}' },
    { question: '${questions[1]?.question?.replace(/'/g, "\\'") || 'How should you approach this resource?'}', options: ${JSON.stringify(questions[1]?.options || ['Watch actively', 'Take notes', 'Build along', 'All of the above'])}, correctIndex: ${questions[1]?.correctIndex || 3}, explanation: '${(questions[1]?.explanation || 'Engage actively with the material.').replace(/'/g, "\\'")}' },
  ],
`
  }
}

output += `}
`

writeFileSync('lib/quiz-data.ts', output)
console.log('Quiz data generated successfully!')
console.log(`Generated questions for ${trackIds.length} tracks.`)
