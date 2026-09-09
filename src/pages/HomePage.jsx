import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import './HomePage.css'

function HomePage() {
  return (
    <>
      <main>
        <div className="intro">
          <Hero />
          <About />
        </div>
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default HomePage
