import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TECH_STACK = [
  'React', 'Next.js', 'TypeScript', 'Node.js',
  'MongoDB', 'PostgreSQL', 'AWS', 'Docker',
  'Redis', 'GraphQL', 'Tailwind CSS', 'Framer Motion',
]

const VALUES = [
  {
    title: 'Precision Craftsmanship',
    description: 'Every line of code, every animation, every interaction is deliberate. We sweat the small stuff so your users never have to.',
  },
  {
    title: 'Performance First',
    description: 'Speed isn\'t negotiable. We build for real-world performance — fast loads, smooth interactions, and infrastructure that scales.',
  },
  {
    title: 'Transparent Partnership',
    description: 'No black boxes. You\'re kept informed at every stage — planning, progress, and delivery. We build long-term trust.',
  },
]

const About = () => {
  const marqueeRef = useRef(null)
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })
  const { ref: valuesRef, inView: valuesInView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (!marqueeRef.current) return
    gsap.to(marqueeRef.current, {
      x: '-50%',
      duration: 20,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <section id="about" className="relative py-32 bg-[var(--color-bg-800)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      {/* Marquee */}
      <div className="overflow-hidden mb-20 border-y border-[var(--color-border)] py-4">
        <div ref={marqueeRef} className="flex gap-12 whitespace-nowrap" style={{ width: '200%' }}>
          {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
            <span key={`${tech}-${i}`} className="font-mono text-sm text-[var(--color-text-muted)] flex items-center gap-12">
              {tech}
              <span className="text-[var(--color-accent-primary)] text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left — Text */}
          <div ref={titleRef} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              className="section-tag"
            >
              About LeapUp Digital
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(2rem,4vw,3.5rem)] font-800 leading-tight"
            >
              We Don't Build{' '}
              <span className="text-gradient">Websites.</span>
              <br />
              We Engineer{' '}
              <span className="text-gradient">Experiences.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                NEXUS was founded on a single belief: that the digital products you put in front of the world should be extraordinary. Not adequate. Not functional. Extraordinary.
              </p>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                We're a team of obsessive builders — developers, designers, and strategists who care deeply about craft. Every project we take on gets our full focus, from the architecture decisions to the micro-animations.
              </p>
              <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
                Our clients range from early-stage startups finding their footing to established businesses ready to go premium. What they share: ambition, high standards, and a desire for digital products they're proud to show off.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={titleInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="btn-primary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Work With Us
            </motion.button>
          </div>

          {/* Right — Values */}
          <div ref={valuesRef} className="space-y-4">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 40 }}
                animate={valuesInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="glass glass-hover p-8 group"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-[var(--color-accent-primary)] mt-1 shrink-0">
                    0{index + 1}
                  </span>
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-700 text-[var(--color-text-primary)]">
                      {value.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Availability status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass p-6 border-l-2 border-l-green-400"
            >
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <div>
                  <p className="font-display text-sm font-600 text-[var(--color-text-primary)]">
                    Currently Accepting Projects
                  </p>
                  <p className="font-mono text-xs text-[var(--color-text-muted)] mt-1">
                    slots available 
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
