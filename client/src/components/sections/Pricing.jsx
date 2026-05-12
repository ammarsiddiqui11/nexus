import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiCheck, FiArrowUpRight, FiZap } from 'react-icons/fi'

const PLANS = [
  {
    number: '01',
    badge: 'Starter',
    name: 'Digital Presence',
    tagline: 'Get online fast. Look professional from day one.',
    oneTime: '8,000',
    retainer: '2,500',
    accent: 'var(--color-accent-primary)',
    featured: false,
    features: [
      '3–4 page website (Home, About, Services, Contact)',
      'Mobile-first responsive design',
      'WhatsApp floating button',
      'Google Business Profile setup',
      '1 year domain + hosting managed by us',
      'Retainer: hosting upkeep + 2 content edits/mo',
    ],
    infra: '~₹3,500/yr',
    profit: '₹26,500/yr retainer profit',
  },
  {
    number: '02',
    badge: 'Most Popular',
    name: 'Business Growth',
    tagline: 'Website + social media — the full package that delivers real results.',
    oneTime: '15,000',
    retainer: '4,500',
    accent: 'var(--color-accent-primary)',
    featured: true,
    features: [
      'Everything in Digital Presence',
      '5–7 page website with gallery / portfolio section',
      'Basic SEO — meta tags, sitemap, speed optimised',
      'Instagram + Facebook page setup',
      '8 social media posts/month designed by us',
      'Monthly performance report (1-page PDF)',
    ],
    infra: '~₹4,500/yr',
    profit: '₹49,500/yr retainer profit',
  },
  {
    number: '03',
    badge: 'E-Commerce',
    name: 'Online Store',
    tagline: 'Your full online dukan — products, payments, orders in one place.',
    oneTime: '25,000',
    retainer: '6,000',
    accent: 'var(--color-accent-primary)',
    featured: false,
    features: [
      'Full e-commerce site (up to 50 products)',
      'Razorpay / Cashfree payment integration',
      'Order management dashboard for you',
      'Product image upload + management',
      'WhatsApp order notifications',
      'Retainer: store updates, new products, tech support',
    ],
    infra: '~₹12,000/yr',
    profit: '₹60,000/yr retainer profit',
  },
  {
    number: '04',
    badge: 'Full Stack',
    name: 'Scale Up',
    tagline: 'Website + store + marketing — one team, everything handled.',
    oneTime: '40,000',
    retainer: '10,000',
    accent: 'var(--color-accent-primary)',
    featured: false,
    features: [
      'Everything in Online Store',
      'Meta Ads setup + ₹3,000/mo ad budget managed',
      'Google Business + Google Ads (basic)',
      '12 social posts + 2 reels/month',
      'Monthly analytics report + strategy call',
      'Priority WhatsApp support — same-day response',
    ],
    infra: '~₹15,000/yr',
    profit: '₹1,05,000/yr retainer profit',
  },
]

const PlanCard = ({ plan, index }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col glass glass-hover overflow-hidden group transition-all duration-300
        ${plan.featured ? 'border border-[var(--color-accent-primary)]/60 shadow-[0_0_40px_rgba(0,212,255,0.08)]' : ''}
      `}
    >
      {/* Featured glow line */}
      {plan.featured && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent" />
      )}

      {/* Hover bottom line */}
      <div className="absolute bottom-0 left-0 h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#00d4ff] to-[#0066ff] transition-all duration-500" />

      <div className="p-8 flex flex-col gap-6 h-full">

        {/* Top row */}
        <div className="flex items-start justify-between">
          <span className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1 border
            ${plan.featured
              ? 'border-[var(--color-accent-primary)]/50 text-[var(--color-accent-primary)] bg-[var(--color-accent-glow)]'
              : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
            }`}
          >
            {plan.badge}
          </span>
          <span className="font-mono text-xs text-[var(--color-text-muted)]">{plan.number}</span>
        </div>

        {/* Name + tagline */}
        <div className="space-y-2">
          <h3 className="font-display text-2xl font-700 text-[var(--color-text-primary)] leading-tight">
            {plan.name}
          </h3>
          <p className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {plan.tagline}
          </p>
        </div>

        {/* Pricing */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-xs text-[var(--color-text-muted)]">₹</span>
            <span className="font-display text-3xl font-800 text-[var(--color-text-primary)]">{plan.oneTime}</span>
            <span className="font-body text-xs text-[var(--color-text-muted)]">one-time</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-[var(--color-accent-primary)]">+ ₹{plan.retainer}</span>
            <span className="font-body text-xs text-[var(--color-text-muted)]">/month retainer</span>
          </div>
        </div>

        <div className="h-px bg-[var(--color-border)]" />

        {/* Features */}
        <ul className="space-y-3 flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 w-4 h-4 flex items-center justify-center border border-[var(--color-accent-primary)]/30 bg-[var(--color-accent-glow)]">
                <FiCheck size={10} className="text-[var(--color-accent-primary)]" />
              </span>
              <span className="font-body text-xs text-[var(--color-text-secondary)] leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Infra cost box */}
        <div className="bg-[rgba(8,21,34,0.6)] border border-[var(--color-border)] px-4 py-3 space-y-0.5">
          <p className="font-mono text-[10px] text-[var(--color-text-muted)] uppercase tracking-widest">Your yearly infra cost</p>
          <p className="font-body text-xs text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-text-primary)] font-500">{plan.infra}</span>
            <span className="mx-2 text-[var(--color-text-muted)]">→</span>
            <span className="text-[var(--color-accent-primary)]">{plan.profit}</span>
          </p>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className={`flex items-center justify-center gap-2 font-mono text-xs px-6 py-3 border transition-all duration-300
            ${plan.featured
              ? 'btn-primary'
              : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent-primary)] hover:text-[var(--color-accent-primary)]'
            }`}
        >
          Get Started <FiArrowUpRight size={12} />
        </a>

      </div>
    </motion.div>
  )
}

const Pricing = () => {
  const { ref: titleRef, inView: titleInView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="pricing" className="relative py-32 bg-[var(--color-bg-900)] overflow-hidden">

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/20 to-transparent" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--color-accent-primary)] opacity-[0.03] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={titleRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-tag mb-6"
          >
            Pricing
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-800 leading-tight max-w-xl"
            >
              Simple,{' '}
              <span className="text-gradient">Transparent</span>{' '}
              Pricing
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[var(--color-text-secondary)] max-w-sm text-sm leading-relaxed"
            >
              One-time build fee + a small monthly retainer.
              No hidden charges, no surprises — just results.
            </motion.p>
          </div>
        </div>

        {/* Yearly discount callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center gap-3 mb-12 glass border-l-2 border-l-[var(--color-accent-primary)] px-6 py-4 w-fit"
        >
          <FiZap size={14} className="text-[var(--color-accent-primary)] shrink-0" />
          <p className="font-body text-sm text-[var(--color-text-secondary)]">
            Pay retainer <span className="text-[var(--color-text-primary)] font-500">yearly upfront</span> and get{' '}
            <span className="text-[var(--color-accent-primary)] font-500">2 months free</span> — the smartest way to save.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--color-border)]">
          {PLANS.map((plan, index) => (
            <div key={plan.name} className="bg-[var(--color-bg-900)] h-full">
              <PlanCard plan={plan} index={index} />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="font-mono text-xs text-[var(--color-text-muted)] text-center mt-10"
        >
          All plans include free consultation. Not sure which plan fits?{' '}
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[var(--color-accent-primary)] hover:underline underline-offset-4 transition-all"
          >
            Let's talk →
          </button>
        </motion.p>

      </div>
    </section>
  )
}

export default Pricing