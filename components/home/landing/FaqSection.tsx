import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { StructuredData } from '@/components/seo/StructuredData'
import { faqJsonLd } from '@/lib/seo/utils'
import { SectionRail } from './SectionRail'

export const LANDING_FAQS = [
  {
    question: 'What is TechSkillHub?',
    answer:
      'TechSkillHub is a self-paced technology learning platform. It gives you structured roadmaps, curated free resources, practical projects and career guidance so you can move from wanting to learn technology to building skills you can demonstrate.',
  },
  {
    question: 'Do I need previous experience?',
    answer:
      'No. Every roadmap starts with foundations, and the beginner-friendly paths assume no prior experience. If you are unsure where to begin, the three-question Find Your Path quiz points you toward a direction.',
  },
  {
    question: 'Is TechSkillHub free?',
    answer:
      'The public catalogue — roadmaps, curated resources and project ideas — is free to explore. Guided Path is an optional structured layer for learners who want more support. Any paid plan will be clearly labelled before you choose it, and nothing changes today.',
  },
  {
    question: 'How do the learning roadmaps work?',
    answer:
      'Each roadmap sequences the skills for a goal — such as frontend development or data analysis — in learning order. Every stage lists the topics to learn, links to resources, and points to practical work that applies the ideas.',
  },
  {
    question: 'What should I learn first?',
    answer:
      'Start with the Find Your Path quiz or browse the five directions. Most beginners begin with the How to Learn Coding guide, then choose a beginner-friendly path such as Frontend Development or Python Development.',
  },
  {
    question: 'Can TechSkillHub help me build a portfolio?',
    answer:
      'Yes. Projects are part of the learning model, not an afterthought. Each path includes projects at beginner, intermediate and advanced levels, and the career section explains how to present your work.',
  },
  {
    question: 'Does TechSkillHub guarantee a job?',
    answer:
      'No. TechSkillHub is not an accredited school and does not promise employment. It helps you build practical skills and evidence of your work; hiring decisions belong to employers.',
  },
]

export function FaqSection() {
  return (
    <section className="border-b border-hairline">
      <StructuredData blocks={[faqJsonLd(LANDING_FAQS)]} />

      <div className="landing-container py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionRail index="08" label="Questions" />
            <h2 className="landing-display mt-4 text-[clamp(2rem,3.5vw,3rem)]">
              Before you <span className="landing-serif text-brand">start.</span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/70">
              Still unsure? The three-question quiz points you toward a direction worth
              exploring first.
            </p>
            <Link href="/find-your-path" className="landing-arrow mt-6">
              Find Your Path <ArrowRight size={14} className="shrink-0" />
            </Link>
          </div>

          <div className="md:col-span-8">
            <div className="landing-faq divide-y divide-hairline border-y border-hairline">
              {LANDING_FAQS.map((faq, index) => (
                <details key={faq.question} className="group py-5">
                  <summary className="flex items-start gap-4">
                    <span className="mt-0.5 font-mono text-[0.6rem] tracking-[0.08em] text-ink/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 font-display text-base font-semibold text-ink">
                      {faq.question}
                    </span>
                    <Plus
                      size={16}
                      className="landing-faq-icon mt-0.5 shrink-0 text-brand transition-transform duration-200"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 pl-8 text-sm leading-relaxed text-ink/70">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
