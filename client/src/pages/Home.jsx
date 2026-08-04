import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'
import Hero from '../components/sections/Hero.jsx'
import Services from '../components/sections/Services.jsx'
import Projects from '../components/sections/Projects.jsx'
import About from '../components/sections/About.jsx'
import WhyUs from '../components/sections/WhyUs.jsx'
import Testimonials from '../components/sections/Testimonials.jsx'
import Process from '../components/sections/Process.jsx'
import Contact from '../components/sections/Contact.jsx'
import LoadingScreen from '../components/ui/LoadingScreen.jsx'
import Pricing from '../components/sections/Pricing.jsx'
const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        {/* <Pricing /> */}
        <WhyUs />
        <Testimonials />
        <Process />
        <Contact />
      </main>
      <Footer />
    </motion.div>
  )
}

export default Home
