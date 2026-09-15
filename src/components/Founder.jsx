import './Founder.css'
import { useProfilePhoto } from '../hooks/useProfilePhoto'

function Founder() {
  const photoUrl = useProfilePhoto()

  return (
    <section id="founder" className="founder" aria-label="Founder">
      <div className="founder-card">
        <div className="founder-photo-frame">
          <img
            className="founder-photo-img"
            src={photoUrl}
            alt="Pathuri Venkateswara Rao, founder of Willgrow AI"
          />
        </div>

        <div className="founder-content">
          <h2 className="founder-heading">Built by a founder who ships.</h2>
          <p className="founder-text">
            I'm Pathuri Venkateswara Rao, founder of Willgrow AI. I design and build
            AI-powered automation systems, custom business software, dashboards, and digital
            products. My focus is simple: understand the business problem first, then build
            the smallest reliable system that solves it.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Founder
