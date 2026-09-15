import './Hero.css'
import { useProfilePhoto } from '../hooks/useProfilePhoto'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const WHATSAPP_AUDIT_URL = buildWhatsAppUrl(
  "Hi, I'd like to book a free automation audit for my business.",
)

function Hero() {
  const photoUrl = useProfilePhoto()

  return (
    <section id="hero" className="hero" aria-label="Introduction">
      <div className="hero-inner">
        <div className="hero-photo-frame">
          <img
            className="hero-photo-img"
            src={photoUrl}
            alt="Pathuri Venkateswara Rao, founder of Willgrow AI"
          />
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">WILLGROW AI · AI AUTOMATION &amp; CUSTOM SOFTWARE</p>
          <h1 className="hero-headline">Turn repetitive business work into intelligent automation.</h1>
          <p className="hero-support">
            We build AI-powered workflows, agents, dashboards, and custom business software
            that help growing businesses reduce manual work, respond faster, and operate
            smarter.
          </p>

          <div className="hero-ctas">
            <a
              className="hero-cta-primary"
              href={WHATSAPP_AUDIT_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book a Free Automation Audit
            </a>
            <a className="hero-cta-secondary" href="#projects">
              See Our Work
            </a>
          </div>

          <p className="hero-proof">
            2+ real hostels using DigiHostel · Live products shipped · Paying client work
            delivered
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
