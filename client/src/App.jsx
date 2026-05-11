import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Home from './pages/Home.jsx'
import CustomCursor from './components/ui/CustomCursor.jsx'
import ScrollProgress from './components/ui/ScrollProgress.jsx'
import NoisOverlay from './components/ui/NoiseOverlay.jsx'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const gsapTick = gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(gsapTick)
    }
  }, [])

  return (
    <Router>
      <NoisOverlay />
      <CustomCursor />
      <ScrollProgress />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </Router>
  )
}

export default App
