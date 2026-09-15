import './Hero.css'
import { useProfilePhoto } from '../hooks/useProfilePhoto'

function Hero() {
  const photoUrl = useProfilePhoto()

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-photo-frame">
          <img className="hero-photo-img" src={photoUrl} alt="Pathuri Venkateswara Rao" />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Founder, Willgrow AI Automation Agency</p>
          <h1 className="hero-name">Pathuri Venkateswara Rao</h1>
          <p className="hero-tagline">I turn ideas into live, working products.</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
