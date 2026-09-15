import Hero from '../components/Hero'
import ProofStrip from '../components/ProofStrip'
import ProblemSection from '../components/ProblemSection'
import Projects from '../components/Projects'
import ProcessSection from '../components/ProcessSection'
import Founder from '../components/Founder'
import Skills from '../components/Skills'
import FaqSection from '../components/FaqSection'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import './HomePage.css'

function HomePage() {
  return (
    <>
      <main>
        <div className="intro">
          <Hero />
        </div>
        <ProofStrip />
        <ProblemSection />
        <Projects />
        <ProcessSection />
        <Founder />
        <Skills />
        <FaqSection />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
