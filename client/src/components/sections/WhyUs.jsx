import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiZap, FiShield, FiTrendingUp, FiGlobe,
  FiRefreshCw, FiHeadphones
} from 'react-icons/fi'

const REASONS = [
  {
    icon: FiZap,
    title: 'Blazing Fast Delivery',
    description: 'We move without cutting corners. Agile process, clear milestones, and a team that communicates proactively.',
  },
  {
    icon: FiShield,
    title: 'Built to Last',
    description: 'Scalable architecture, clean code, and full documentation. We hand over projects you can actually maintain.',
  },
  {
    icon: FiTrendingUp,
    title: 'Growth-Oriented',
    description: 'Every decision is made with your business goals in mind. We build for conversion, retention, and scale.',
  },
  {
    icon: FiGlobe,
    title: 'Modern Tech Stack',
    description: 'React, Node.js, MongoDB, TypeScript — we use technologies that are proven, modern, and future-ready.',
  },
  {
    icon: FiRefreshCw,
    title: 'Responsive & Adaptive',
    description: 'Flawless on every device, every screen size. Mobile-first design that looks incredible everywhere.',
  },
  {
    icon: FiHeadphones,
    title: 'Ongoing Support',
    description: 'We don\'t disappear after launch. Post-delivery support, maintenance plans, and a team you can actually reach.',
  },
]

const WhyUs = () => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className="relative py-32 bg-[var(--color-bg-900)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span className="font-display text-[20vw] font-800 text-white/[0.015] leading-none">
          WHY US
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={ref} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="section-tag justify-center mb-6"
          >
            Our Edge
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800"
          >
            Why Teams Choose{' '}
            <span className="text-gradient">NEXUS</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {REASONS.map((reason, index) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--color-bg-900)] p-8 group hover:bg-[var(--color-bg-800)] transition-colors duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-0 h-px bg-gradient-to-r from-[#00d4ff] to-[#0066ff] group-hover:w-full transition-all duration-500" />

                <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-glow)] mb-6 transition-all duration-300">
                  <Icon className="text-[var(--color-accent-primary)]" size={18} />
                </div>

                <h3 className="font-display text-lg font-700 text-[var(--color-text-primary)] mb-3">
                  {reason.title}
                </h3>
                <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyUs
