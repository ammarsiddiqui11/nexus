import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => setVisible(false), 400)
          return 100
        }
        return p + Math.random() * 15
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[var(--color-bg-950)] flex flex-col items-center justify-center"
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Content */}
          <div className="relative z-10 text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-display text-6xl font-800 text-gradient"
            >
              NEXUS
            </motion.div>

            <div className="w-64 mx-auto space-y-3">
              <div className="h-px bg-[var(--color-border)] overflow-hidden">
                <motion.div
                  className="h-full"
                  style={{ background: 'var(--gradient-accent)' }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="flex justify-between">
                <span className="font-mono text-xs text-[var(--color-text-muted)]">Initializing</span>
                <span className="font-mono text-xs text-[var(--color-accent-primary)]">
                  {Math.floor(Math.min(progress, 100))}%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingScreen
