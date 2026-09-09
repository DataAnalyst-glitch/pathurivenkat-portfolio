import './Hero.css'
import { useProfilePhoto } from '../hooks/useProfilePhoto'

function Hero() {
  const photoUrl = useProfilePhoto()

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-photo-frame">
          {photoUrl ? (
            <img
              className="hero-photo-img"
              src={photoUrl}
              alt="Pathuri Venkateswara Rao"
            />
          ) : (
            <div className="hero-photo-placeholder" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="8" r="4" fill="currentColor" />
                <path
                  d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          )}
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
