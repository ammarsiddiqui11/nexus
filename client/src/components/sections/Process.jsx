import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'We start with a deep-dive into your business, goals, users, and competitors. We leave with a complete picture and a roadmap that actually makes sense.',
    duration: '1–2 weeks',
    deliverables: ['Project scope', 'Technical architecture', 'Timeline & milestones'],
  },
  {
    number: '02',
    title: 'Design',
    description: 'Wireframes evolve into high-fidelity mockups. Every screen, every state, every interaction — designed before a line of code is written.',
    duration: '2–3 weeks',
    deliverables: ['Wireframes', 'UI mockups', 'Design system'],
  },
  {
    number: '03',
    title: 'Development',
    description: 'Clean, modular code built to spec. Weekly builds, continuous deployment, and full transparency into our progress. No black boxes.',
    duration: '4–8 weeks',
    deliverables: ['Working builds', 'Code reviews', 'Progress updates'],
  },
  {
    number: '04',
    title: 'Testing & QA',
    description: 'Thorough testing across browsers, devices, and edge cases. Performance audits, accessibility checks, and security reviews before anything ships.',
    duration: '1–2 weeks',
    deliverables: ['QA report', 'Performance audit', 'Bug-free build'],
  },
  {
    number: '05',
    title: 'Launch & Beyond',
    description: 'Seamless deployment with zero downtime. Post-launch monitoring, analytics setup, and an ongoing relationship to keep things running perfectly.',
    duration: 'Ongoing',
    deliverables: ['Live deployment', 'Analytics setup', 'Support plan'],
  },
]

const Process = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="process" className="relative py-32 bg-[var(--color-bg-950)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="section-tag justify-center mb-6"
          >
            How We Work
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800"
          >
            Our{' '}
            <span className="text-gradient">Process</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 font-body text-[var(--color-text-secondary)] max-w-lg mx-auto"
          >
            A refined workflow built over years of shipping complex digital products — predictable, collaborative, and built for quality.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-px bg-[var(--color-border)]">
          {STEPS.map((step, index) => {
            const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
            return (
              <motion.div
                key={step.number}
                ref={ref}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="bg-[var(--color-bg-950)] group hover:bg-[var(--color-bg-800)] transition-colors duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-8 items-center p-8 md:p-10">
                  {/* Number */}
                  <div className="font-display text-6xl font-800 text-gradient opacity-30 group-hover:opacity-60 transition-opacity w-24 text-center">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-display text-2xl font-700 text-[var(--color-text-primary)]">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
                      {step.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {step.deliverables.map((d) => (
                        <span
                          key={d}
                          className="font-mono text-xs px-3 py-1 border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-accent-primary)]/30"
                        >
                          ✓ {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs text-[var(--color-text-muted)] block">TIMELINE</span>
                    <span className="font-display text-sm font-600 text-[var(--color-accent-primary)]">{step.duration}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Process
