import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'

const PROJECTS = [
  {
    id: 1,
    title: 'FinFlow Dashboard',
    category: 'Web Application',
    description: 'A real-time financial analytics platform with live data feeds, custom chart components, and role-based access control for a fintech startup.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket'],
    color: 'from-cyan-500/20 to-blue-600/20',
    accent: '#00d4ff',
    year: '2024',
    featured: true,
    githubUrl: 'https://github.com/yourusername/finflow',
    liveUrl: 'https://finflow-demo.com'
  },
  {
    id: 2,
    title: 'Luxe Commerce',
    category: 'E-Commerce Platform',
    description: 'Premium e-commerce experience for a luxury fashion brand. Built with Next.js for SSR, stripe integration, and a CMS-driven content layer.',
    tags: ['Next.js', 'Stripe', 'Sanity CMS', 'Tailwind'],
    color: 'from-violet-500/20 to-purple-600/20',
    accent: '#8b5cf6',
    year: '2024',
    featured: true,
    githubUrl: 'https://github.com/yourusername/luxe-commerce',
    liveUrl: 'https://luxe-commerce-shop.com'
  },
  {
    id: 3,
    title: 'Elite Chrono',
    category: 'E-Commerce Platform',
    description: 'A luxury watch store built for a smooth and modern shopping experience with smart filtering, secure checkout, and fast performance.',
    tags: ['React', 'Express', 'PostgreSQL', 'Redis'],
    color: 'from-emerald-500/20 to-teal-600/20',
    accent: '#10b981',
    year: '2023',
    featured: false,
    githubUrl: 'https://github.com/yourusername/elite-chrono',
    liveUrl: 'https://elite-chrono.com'
  },
  {
    id: 4,
    title: 'AURUM BAR & RESTRO',
    category: 'Web Application',
    description: 'A modern restaurant website with online reservations, menu browsing, event showcases, and an elegant user experience.',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'AWS'],
    color: 'from-orange-500/20 to-amber-600/20',
    accent: '#f59e0b',
    year: '2023',
    featured: false,
    githubUrl: 'https://github.com/yourusername/aurum-restro',
    liveUrl: 'https://aurum-restro.com'
  },
]

const FILTERS = ['All', 'Web Application', 'E-Commerce Platform', 'Healthcare SaaS', 'SaaS Platform']

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative glass glass-hover overflow-hidden cursor-pointer group ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Color overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Glowing border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${project.accent}40` }}
      />

      <div className="relative z-10 p-8 md:p-10">
        <div className="flex items-start justify-between mb-8">
          <div className="space-y-2">
            <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
              {project.year} — {project.category}
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-700 text-[var(--color-text-primary)] group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0 transform">
            {/* GitHub Link */}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
              aria-label="View on GitHub"
            >
              <FiGithub size={16} />
            </a>
            {/* Live Preview Link */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors"
              aria-label="Live preview"
            >
              <FiArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-lg">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs px-3 py-1 border border-[var(--color-border)] text-[var(--color-text-muted)] group-hover:border-white/20 group-hover:text-white/70 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Scan line effect */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
        animate={hovered ? { top: ['0%', '100%'] } : {}}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section id="projects" className="relative py-32 bg-[var(--color-bg-950)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-6"
          >
            Featured Work
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800"
            >
              Projects That{' '}
              <span className="text-gradient">Speak</span>
            </motion.h2>

            <button
              className="btn-outline self-start flex items-center gap-2"
              onClick={() => window.open('https://github.com/yourusername', '_blank')}
            >
              All Projects <FiArrowUpRight />
            </button>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`font-mono text-xs px-4 py-2 border transition-all duration-300 ${
                activeFilter === filter
                  ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] bg-[var(--color-accent-glow)]'
                  : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-primary)]/50 hover:text-[var(--color-accent-primary)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--color-border)]"
          >
            {filtered.map((project, index) => (
              <div key={project.id} className="bg-[var(--color-bg-950)]">
                <ProjectCard project={project} index={index} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Projects