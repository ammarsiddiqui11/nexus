import { FiArrowUpRight, FiGithub, FiTwitter, FiLinkedin, FiInstagram } from 'react-icons/fi'

const FOOTER_LINKS = {
  Services: ['Web Development', 'Web Applications', 'UI/UX Design', 'Backend Systems', 'SEO Optimization'],
  Company: ['About Us', 'Our Work', 'Process', 'Blog', 'Careers'],
  Contact: ['hello@nexus.agency', '+1 (555) 000-0000', 'San Francisco, CA'],
}

const SOCIALS = [
  { icon: FiGithub, href: 'https://github.com', label: 'GitHub' },
  { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
]

const Footer = () => {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg-950)]">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-16 border-b border-[var(--color-border)]">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="font-display text-3xl font-800">
              <span className="text-gradient">NEXUS</span>
              <span className="text-[var(--color-text-muted)]">.</span>
            </div>
            <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
              We craft premium digital experiences for ambitious businesses. Your vision, engineered to perfection.
            </p>
            <div className="flex items-center gap-4">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 glass rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:border-[var(--color-accent-primary)] transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-mono text-xs tracking-widest uppercase text-[var(--color-accent-primary)]">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 flex items-center gap-1 group"
                    >
                      {link}
                      <FiArrowUpRight
                        size={12}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
          <p className="font-mono text-xs text-[var(--color-text-muted)]">
            © {new Date().getFullYear()} NEXUS Agency. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-mono text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors">
              Terms of Service
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-[var(--color-text-muted)]">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
