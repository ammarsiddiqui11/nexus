import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX } from 'react-icons/fi'

/* ─── Content ─────────────────────────────────────────── */

const CONTENT = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Information We Collect',
        body: `When you contact us or use our services, we may collect personal information such as your name, email address, phone number, and business details. We also collect basic usage data (pages visited, time spent) through analytics tools to help us improve our website.`,
      },
      {
        heading: 'How We Use Your Information',
        body: `We use the information you provide solely to respond to your enquiries, deliver the services you have requested, send project updates, and occasionally share relevant offers or news about LeapUp Digital. We do not sell, rent, or trade your personal data to third parties.`,
      },
      {
        heading: 'Data Storage & Security',
        body: `Your data is stored securely and accessed only by authorised members of our team. We use industry-standard measures to protect your information, though no method of transmission over the internet is 100% secure. We retain your data only for as long as necessary to fulfil the purposes outlined here.`,
      },
      {
        heading: 'Cookies',
        body: `Our website may use cookies to improve your browsing experience and gather anonymous usage statistics. You can disable cookies in your browser settings at any time, though some features of the site may not function correctly as a result.`,
      },
      {
        heading: 'Third-Party Services',
        body: `We may use trusted third-party tools such as Google Analytics, Meta Ads Manager, and Razorpay to operate our services. These providers have their own privacy policies and we encourage you to review them. We are not responsible for their data practices.`,
      },
      {
        heading: 'Your Rights',
        body: `You have the right to request access to, correction of, or deletion of your personal data at any time. To exercise these rights, please contact us at leapupdigitals@gmail.com and we will respond within 7 business days.`,
      },
      {
        heading: 'Changes to This Policy',
        body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date. Continued use of our website after changes constitutes your acceptance of the updated policy.`,
      },
      {
        heading: 'Contact',
        body: `For any privacy-related questions, reach us at leapupdigitals@gmail.com or +91 8104244230.`,
      },
    ],
  },

  terms: {
    title: 'Terms of Service',
    updated: 'Last updated: May 2026',
    sections: [
      {
        heading: 'Acceptance of Terms',
        body: `By engaging LeapUp Digital for any service — whether through our website, email, WhatsApp, or direct communication — you agree to be bound by these Terms of Service. If you do not agree, please do not proceed with any engagement.`,
      },
      {
        heading: 'Services Provided',
        body: `LeapUp Digital offers web design, landing page development, e-commerce setup, social media management, digital marketing, product promotion, and related digital services. The scope of each project is agreed upon in writing before work begins. Any additions to the agreed scope may incur additional charges.`,
      },
      {
        heading: 'Payment Terms',
        body: `A non-refundable advance payment is required before work commences. The remaining balance is due upon project completion and before the final deliverable is handed over or made live. Payment plans, where offered, must be adhered to. Late payments may result in work being paused.`,
      },
      {
        heading: 'Refund Policy',
        body: `Advance payments are non-refundable once work has begun, as they cover time and resources already committed. If LeapUp Digital is unable to deliver the agreed service, a fair refund will be assessed on a case-by-case basis. We are committed to resolving any disputes fairly.`,
      },
      {
        heading: 'Client Responsibilities',
        body: `You agree to provide all required content (text, images, logos, brand guidelines) in a timely manner. Delays caused by late content delivery may push back project timelines. LeapUp Digital is not responsible for delays resulting from the client's failure to provide necessary materials.`,
      },
      {
        heading: 'Intellectual Property',
        body: `Upon full payment, you own the final delivered work. LeapUp Digital retains the right to display completed projects in our portfolio and marketing materials unless you explicitly request otherwise in writing. We retain ownership of all work until full payment is received.`,
      },
      {
        heading: 'Limitation of Liability',
        body: `LeapUp Digital is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. Our total liability in any case shall not exceed the amount paid by you for the specific service in question.`,
      },
      {
        heading: 'Termination',
        body: `Either party may terminate an ongoing engagement with reasonable written notice. Work completed up to the point of termination will be billed accordingly. LeapUp Digital reserves the right to terminate any project if the client engages in abusive, fraudulent, or unlawful behaviour.`,
      },
      {
        heading: 'Governing Law',
        body: `These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.`,
      },
      {
        heading: 'Contact',
        body: `For any questions regarding these terms, contact us at leapupdigitals@gmail.com or +91 8104244230.`,
      },
    ],
  },
}

/* ─── Component ───────────────────────────────────────── */

const LegalModal = ({ type, onClose }) => {
  const overlayRef = useRef(null)
  const content = CONTENT[type]

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!content) return null

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        ref={overlayRef}
        onClick={handleBackdropClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[9990] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ background: 'rgba(2, 4, 8, 0.85)', backdropFilter: 'blur(8px)' }}
      >
        {/* Modal panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full sm:max-w-2xl max-h-[92dvh] sm:max-h-[85vh] flex flex-col"
          style={{
            background: 'var(--color-bg-800)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-glow), var(--shadow-card)',
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent" />

          {/* Header */}
          <div
            className="flex items-start justify-between gap-4 px-8 py-6 shrink-0"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <div className="space-y-1">
              <span
                className="section-tag text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent-primary)' }}
              >
                Legal
              </span>
              <h2
                id="modal-title"
                className="font-display text-2xl font-700"
                style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}
              >
                {content.title}
              </h2>
              <p
                className="text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
              >
                {content.updated}
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="shrink-0 w-9 h-9 flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent-primary)'
                e.currentTarget.style.color = 'var(--color-accent-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text-muted)'
              }}
            >
              <FiX size={16} />
            </button>
          </div>

          {/* Scrollable body */}
          <div
            className="overflow-y-auto px-8 py-8 space-y-8 flex-1"
            style={{ scrollbarWidth: 'thin', scrollbarColor: 'var(--color-accent-primary) var(--color-bg-950)' }}
          >
            {content.sections.map((section, i) => (
              <div key={i} className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs shrink-0"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ background: 'var(--color-border)' }}
                  />
                  <h3
                    className="font-display text-sm font-600 shrink-0"
                    style={{ color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
                  >
                    {section.heading}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed pl-8"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-text-secondary)' }}
                >
                  {section.body}
                </p>
              </div>
            ))}

            {/* Bottom padding so last item isn't flush */}
            <div className="h-4" />
          </div>

          {/* Footer */}
          <div
            className="px-8 py-5 shrink-0 flex items-center justify-between gap-4"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <p
              className="text-xs"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)' }}
            >
              Questions? &nbsp;
              <a
                href="mailto:leapupdigitals@gmail.com"
                style={{ color: 'var(--color-accent-primary)' }}
              >
                leapupdigitals@gmail.com
              </a>
            </p>
            <button
              onClick={onClose}
              className="btn-outline text-xs px-5 py-2"
            >
              Close
            </button>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default LegalModal