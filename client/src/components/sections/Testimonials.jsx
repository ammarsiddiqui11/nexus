import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO',
    company: 'FinFlow Technologies',
    text: 'NEXUS completely transformed how we think about our digital presence. The dashboard they built handles 50k concurrent users without breaking a sweat. Their attention to performance is unmatched.',
    rating: 5,
    avatar: 'SC',
  },
  {
    id: 2,
    name: 'Marcus Reid',
    role: 'Founder',
    company: 'Luxe Commerce',
    text: 'From the first meeting, they got it. The site launched on time, the design is exactly what we envisioned, and sales are up 40% since going live. These people genuinely care about outcomes.',
    rating: 5,
    avatar: 'MR',
  },
  {
    id: 3,
    name: 'Dr. Priya Nair',
    role: 'CTO',
    company: 'MedTrack Pro',
    text: 'Building HIPAA-compliant software is hard. Finding a team that understands both the technical and regulatory requirements is rare. NEXUS delivered a system we trust with patient data.',
    rating: 5,
    avatar: 'PN',
  },
  {
    id: 4,
    name: 'James Morello',
    role: 'Product Manager',
    company: 'BuilderOS',
    text: 'I\'ve worked with a lot of agencies. Most overpromise and underdeliver. NEXUS did the opposite — the final product exceeded our expectations on every metric we cared about.',
    rating: 5,
    avatar: 'JM',
  },
]

const Stars = ({ count }) => (
  <div className="flex gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <FiStar key={i} size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
    ))}
  </div>
)

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })

  const prev = () => {
    setDirection(-1)
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const next = () => {
    setDirection(1)
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
  }

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [])

  const t = TESTIMONIALS[current]

  return (
    <section className="relative py-32 bg-[var(--color-bg-800)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      {/* Background quote mark */}
      <div className="absolute top-10 left-10 font-display text-[20rem] leading-none text-white/[0.02] pointer-events-none select-none">
        "
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="section-tag justify-center mb-6"
          >
            Client Stories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800"
          >
            Trusted by{' '}
            <span className="text-gradient">Builders</span>
          </motion.h2>
        </div>

        {/* Main testimonial card */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={t.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass p-12 md:p-16 relative overflow-hidden"
            >
              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[var(--color-accent-primary)] opacity-40" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[var(--color-accent-primary)] opacity-40" />

              <Stars count={t.rating} />

              <blockquote className="font-display text-xl md:text-2xl font-500 text-[var(--color-text-primary)] leading-relaxed mt-6 mb-10">
                "{t.text}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-display font-700 text-sm text-[var(--color-bg-950)]" style={{ background: 'var(--gradient-accent)' }}>
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display text-sm font-700 text-[var(--color-text-primary)]">
                    {t.name}
                  </div>
                  <div className="font-mono text-xs text-[var(--color-text-muted)]">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i) }}
                  className={`h-px transition-all duration-300 ${i === current ? 'w-8 bg-[var(--color-accent-primary)]' : 'w-4 bg-[var(--color-border-hover)]'}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all duration-300"
              >
                <FiChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)] transition-all duration-300"
              >
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
