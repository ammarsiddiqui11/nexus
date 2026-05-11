import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiCode, FiLayout, FiServer, FiZap, FiSearch, FiSmartphone
} from 'react-icons/fi'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: FiCode,
    title: 'Web Development',
    description: 'Full-stack websites built with modern frameworks. React, Next.js, Vue — we pick the right tool for your needs and deliver pixel-perfect results.',
    tags: ['React', 'Next.js', 'TypeScript'],
    number: '01',
  },
  {
    icon: FiLayout,
    title: 'UI/UX Design',
    description: 'Interfaces that don\'t just look beautiful — they convert. We design with intent, every pixel chosen to guide your users toward action.',
    tags: ['Figma', 'Prototyping', 'Design Systems'],
    number: '02',
  },
  {
    icon: FiSmartphone,
    title: 'Web Applications',
    description: 'Complex SPAs and dashboards that handle real-world scale. From MVPs to enterprise platforms, we engineer applications that grow with you.',
    tags: ['SPA', 'PWA', 'Real-time'],
    number: '03',
  },
  {
    icon: FiServer,
    title: 'Backend Development',
    description: 'Robust APIs, microservices, and database architectures built to handle anything. Node.js, Express, MongoDB — engineered for reliability.',
    tags: ['Node.js', 'REST API', 'MongoDB'],
    number: '04',
  },
  {
    icon: FiZap,
    title: 'Performance Optimization',
    description: 'Speed is a feature. We audit, optimize, and supercharge your existing platforms — turning sluggish experiences into instant delight.',
    tags: ['Core Web Vitals', 'Caching', 'CDN'],
    number: '05',
  },
  {
    icon: FiSearch,
    title: 'SEO Architecture',
    description: 'Visibility baked in from day one. Semantic HTML, structured data, lightning fast pages, and technical SEO that actually moves the needle.',
    tags: ['Technical SEO', 'Schema', 'Analytics'],
    number: '06',
  },
]

const ServiceCard = ({ service, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative glass glass-hover p-8 flex flex-col gap-6 cursor-default"
    >
      {/* Number */}
      <span className="font-mono text-xs text-[var(--color-text-muted)] absolute top-6 right-6">
        {service.number}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-glow)] transition-all duration-300">
        <Icon className="text-[var(--color-accent-primary)]" size={20} />
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h3 className="font-display text-xl font-700 text-[var(--color-text-primary)]">
          {service.title}
        </h3>
        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-3 py-1 border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-[var(--color-accent-primary)]/30 group-hover:text-[var(--color-accent-primary)] transition-all duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Hover line */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#00d4ff] to-[#0066ff] transition-all duration-500" />
    </motion.div>
  )
}

const Services = () => {
  const sectionRef = useRef(null)
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 bg-[var(--color-bg-900)] overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-tag mb-6"
          >
            What We Do
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight max-w-xl"
            >
              Our Core{' '}
              <span className="text-gradient">Services</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[var(--color-text-secondary)] max-w-sm text-sm leading-relaxed"
            >
              End-to-end digital solutions from concept to launch. Every service designed to deliver measurable results.
            </motion.p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)]">
          {SERVICES.map((service, index) => (
            <div key={service.title} className="bg-[var(--color-bg-900)]">
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
