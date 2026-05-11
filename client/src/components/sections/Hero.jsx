import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiArrowUpRight } from 'react-icons/fi'
import gsap from 'gsap'
import { Suspense, lazy } from 'react'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

const STATS = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5yr', label: 'Industry Experience' },
  { value: '40+', label: 'Happy Clients' },
]

const Hero = () => {
  const headingRef = useRef(null)
  const taglineRef = useRef(null)
  const ctaRef = useRef(null)
  const statsRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(
      '.hero-tag',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        '.hero-line',
        { opacity: 0, y: 60, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.12, ease: 'power4.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        '.hero-cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        '.hero-stat',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
        '-=0.3'
      )
  }, [])

  const handleScrollDown = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-950)] grid-bg"
    >
      {/* Three.js Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00d4ff] opacity-[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#0066ff] opacity-[0.06] blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-5xl">
          {/* Tag */}
          <div className="hero-tag section-tag mb-8 opacity-0">
            Premium Digital Agency
          </div>

          {/* Heading */}
          <div ref={headingRef} className="overflow-hidden mb-6">
            <h1 className="font-display font-800 leading-[0.95] tracking-tight">
              <div className="hero-line opacity-0 text-[clamp(3.5rem,9vw,8rem)] text-[var(--color-text-primary)]">
                We Build
              </div>
              <div className="hero-line opacity-0 text-[clamp(3.5rem,9vw,8rem)] text-gradient">
                Digital
              </div>
              <div className="hero-line opacity-0 text-[clamp(3.5rem,9vw,8rem)] text-[var(--color-text-primary)]">
                Excellence.
              </div>
            </h1>
          </div>

          {/* Subheading */}
          <p
            ref={taglineRef}
            className="hero-sub opacity-0 font-body text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl leading-relaxed mb-10"
          >
            From stunning interfaces to robust backends — we engineer premium web experiences
            that convert visitors into loyal customers. Modern. Fast. Unforgettable.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20">
            <button
              className="hero-cta opacity-0 btn-primary"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
              <FiArrowUpRight />
            </button>
            <button
              className="hero-cta opacity-0 btn-outline"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </button>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-px border border-[var(--color-border)] overflow-hidden"
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="hero-stat opacity-0 p-6 bg-[rgba(8,21,34,0.5)] backdrop-blur-sm group hover:bg-[rgba(0,212,255,0.05)] transition-colors duration-300"
              >
                <div className="font-display text-3xl font-800 text-gradient mb-1">{value}</div>
                <div className="font-body text-xs text-[var(--color-text-muted)] uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors duration-300"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <FiArrowDown size={16} />
      </motion.button>
    </section>
  )
}

export default Hero
