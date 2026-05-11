import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { FiArrowUpRight } from 'react-icons/fi'
import gsap from 'gsap'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 2.5 }
    )
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled
            ? 'glass border-b border-[var(--color-border)] py-3'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-800 tracking-tight"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            <span className="text-gradient">NEXUS</span>
            <span className="text-[var(--color-text-muted)] font-300 ml-1">.</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-accent-primary)] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => handleNavClick('#contact')}
              className="btn-primary text-xs px-6 py-3 flex items-center gap-2"
            >
              Start a Project
              <FiArrowUpRight />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[var(--color-text-primary)] p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[8999] glass flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 + 0.2 }}
                onClick={() => handleNavClick(link.href)}
                className="font-display text-4xl font-700 text-[var(--color-text-primary)] hover:text-gradient transition-all duration-300"
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.08 + 0.3 }}
              onClick={() => handleNavClick('#contact')}
              className="btn-primary mt-4"
            >
              Start a Project
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
