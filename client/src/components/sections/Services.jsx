import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiLayout,
  FiZap,
  FiShoppingBag,
  FiInstagram,
  FiTrendingUp,
  FiMapPin,
} from 'react-icons/fi'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    icon: FiLayout,
    title: 'Landing Pages',
    description:
      'Your first impression online. We build clean, fast, mobile-ready landing pages that tell your story and turn visitors into customers — no fluff, just results.',
    tags: ['Business Websites', 'Portfolio', 'Mobile-First'],
    number: '01',
  },
  {
    icon: FiShoppingBag,
    title: 'E-Commerce Stores',
    description:
      'Sell online without the headache. We set up your full online store with product listings, secure payments via Razorpay, and order management — ready to go live fast.',
    tags: ['Online Store', 'Razorpay', 'Product Management'],
    number: '02',
  },
  {
    icon: FiInstagram,
    title: 'Social Media Ads',
    description:
      'Reach the right people on Instagram and Facebook. We create and manage targeted ad campaigns that drive real traffic to your business — not just likes.',
    tags: ['Instagram Ads', 'Facebook Ads', 'Meta Business'],
    number: '03',
  },
  {
    icon: FiTrendingUp,
    title: 'Digital Marketing',
    description:
      'From content strategy to monthly social posts, we handle your online presence so you can focus on running your business. Consistent, professional, and on-brand.',
    tags: ['Social Media', 'Content Strategy', 'Monthly Plans'],
    number: '04',
  },
  {
    icon: FiMapPin,
    title: 'Local Business Setup',
    description:
      'Get found on Google Maps and local searches. We set up and optimise your Google Business Profile so customers nearby can find you, call you, and visit you.',
    tags: ['Google Business', 'Local SEO', 'Google Maps'],
    number: '05',
  },
  {
    icon: FiZap,
    title: 'Website Revamp',
    description:
      'Already have a website that feels outdated or slow? We audit, redesign, and optimise it — better speed, better look, better conversions.',
    tags: ['Redesign', 'Performance', 'Core Web Vitals'],
    number: '06',
  },
]

const ServiceCard = ({ service, index }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative glass glass-hover p-8 flex flex-col gap-6 cursor-default h-full min-h-[420px] transition-all duration-300"
    >
      {/* Number */}
      <span className="font-mono text-xs text-[var(--color-text-muted)] absolute top-6 right-6">
        {service.number}
      </span>

      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center border border-[var(--color-border)] group-hover:border-[var(--color-accent-primary)] group-hover:bg-[var(--color-accent-glow)] transition-all duration-300 shrink-0">
        <Icon
          className="text-[var(--color-accent-primary)]"
          size={20}
        />
      </div>

      {/* Content */}
      <div className="space-y-3 flex-1">
        <h3 className="font-display text-xl font-700 text-[var(--color-text-primary)] leading-snug">
          {service.title}
        </h3>

        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 pt-2 mt-auto">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs px-3 py-1 border border-[var(--color-border)] text-[var(--color-text-muted)] whitespace-nowrap group-hover:border-[var(--color-accent-primary)]/30 group-hover:text-[var(--color-accent-primary)] transition-all duration-300"
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

  const {
    ref: titleRef,
    inView: titleInView,
  } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

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
              <span className="text-gradient">
                Services
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={titleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body text-[var(--color-text-secondary)] max-w-sm text-sm leading-relaxed"
            >
              End-to-end digital solutions from concept
              to launch. Every service designed to deliver
              measurable results.
            </motion.p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border)] auto-rows-fr">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="bg-[var(--color-bg-900)] h-full"
            >
              <ServiceCard
                service={service}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services