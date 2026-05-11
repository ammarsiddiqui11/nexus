import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiSend, FiMail, FiMapPin, FiClock, FiArrowUpRight } from 'react-icons/fi'
import axios from 'axios'

const BUDGET_OPTIONS = ['< $5k', '$5k–$15k', '$15k–$50k', '$50k+', 'Let\'s discuss']
const SERVICE_OPTIONS = ['Web Development', 'Web Application', 'UI/UX Design', 'Backend API', 'Full-Stack Project']

const Contact = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Invalid email'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setStatus('loading')
    try {
      await axios.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (field) => `
    w-full bg-[rgba(8,21,34,0.6)] border ${errors[field] ? 'border-red-500/60' : 'border-[var(--color-border)]'}
    text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]
    font-body text-sm px-4 py-3 outline-none
    focus:border-[var(--color-accent-primary)] focus:bg-[rgba(0,212,255,0.03)]
    transition-all duration-300
  `

  return (
    <section id="contact" className="relative py-32 bg-[var(--color-bg-950)] overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[var(--color-accent-primary)] opacity-[0.04] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={titleRef} className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="section-tag mb-6"
          >
            Get In Touch
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800"
            >
              Let's Build{' '}
              <span className="text-gradient">Together</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16">
          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <p className="font-body text-[var(--color-text-secondary)] leading-relaxed">
              Ready to build something exceptional? Tell us about your project and we'll get back to you within 24 hours with a thoughtful response — not a template.
            </p>

            <div className="space-y-4">
              {[
                { icon: FiMail, label: 'Email', value: 'hello@nexus.agency' },
                { icon: FiMapPin, label: 'Location', value: 'San Francisco, CA' },
                { icon: FiClock, label: 'Response Time', value: 'Within 24 hours' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent-primary)] transition-colors">
                    <Icon className="text-[var(--color-accent-primary)]" size={16} />
                  </div>
                  <div>
                    <span className="font-mono text-xs text-[var(--color-text-muted)] block">{label}</span>
                    <span className="font-body text-sm text-[var(--color-text-primary)]">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA card */}
            <div className="glass p-6 border-l-2 border-l-[var(--color-accent-primary)]">
              <p className="font-display text-sm font-600 text-[var(--color-text-primary)] mb-2">
                Prefer a quick call?
              </p>
              <p className="font-body text-xs text-[var(--color-text-secondary)] mb-4">
                Book a free 30-minute consultation and let's talk through your project.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-accent-primary)] hover:gap-3 transition-all"
              >
                Schedule a Call <FiArrowUpRight size={12} />
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {status === 'success' ? (
              <div className="glass p-12 text-center space-y-4 h-full flex flex-col items-center justify-center">
                <div className="w-16 h-16 flex items-center justify-center border-2 border-green-400 rounded-full text-green-400 text-2xl">✓</div>
                <h3 className="font-display text-2xl font-700 text-[var(--color-text-primary)]">Message Sent!</h3>
                <p className="font-body text-sm text-[var(--color-text-secondary)] max-w-sm">
                  Thanks for reaching out. We'll review your project and get back to you within 24 hours.
                </p>
                <button onClick={() => setStatus('idle')} className="btn-outline mt-4">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name *"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass('name')}
                    />
                    {errors.name && <p className="font-mono text-xs text-red-400 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email address *"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass('email')}
                    />
                    {errors.email && <p className="font-mono text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <input
                  type="text"
                  name="company"
                  placeholder="Company / Project name"
                  value={form.company}
                  onChange={handleChange}
                  className={inputClass('company')}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass('service')}
                  >
                    <option value="">Service needed</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>

                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className={inputClass('budget')}
                  >
                    <option value="">Budget range</option>
                    {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="Tell us about your project *"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && <p className="font-mono text-xs text-red-400 mt-1">{errors.message}</p>}
                </div>

                {status === 'error' && (
                  <p className="font-mono text-xs text-red-400">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message <FiSend size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
