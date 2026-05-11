import { useEffect, useState } from 'react'

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const percentage = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(percentage)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[9990] h-[2px] transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #00d4ff, #0066ff)',
        boxShadow: '0 0 10px rgba(0,212,255,0.5)',
      }}
    />
  )
}

export default ScrollProgress
