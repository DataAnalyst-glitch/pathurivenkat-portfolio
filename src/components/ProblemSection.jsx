import './ProblemSection.css'
import { buildWhatsAppUrl } from '../lib/whatsapp'

const WHATSAPP_OPPORTUNITIES_URL = buildWhatsAppUrl(
  "Hi, I'd like to find automation opportunities for my business.",
)

const painPoints = [
  'Leads are not followed up consistently',
  'Employees copy data between systems',
  'Reports are created manually',
  'Customers wait too long for responses',
  'Admin teams repeat the same tasks every day',
  'Important information is scattered across tools',
]

function ProblemSection() {
  return (
    <section id="problem" className="problem-section" aria-label="The problem">
      <div className="problem-inner">
        <h2 className="problem-heading">Still doing work manually that software could handle?</h2>
        <p className="problem-intro">
          Repetitive work quietly costs businesses hours every week. We identify the
          workflows that slow your team down and turn them into reliable automated systems.
        </p>

        <div className="problem-grid">
          {painPoints.map((point) => (
            <div className="problem-card" key={point}>
              <p className="problem-card-text">{point}</p>
            </div>
          ))}
        </div>

        <div className="problem-cta-wrap">
          <a
            className="problem-cta"
            href={WHATSAPP_OPPORTUNITIES_URL}
            target="_blank"
            rel="noreferrer"
          >
            Find My Automation Opportunities
          </a>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
