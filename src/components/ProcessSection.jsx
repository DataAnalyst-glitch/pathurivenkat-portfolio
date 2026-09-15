import './ProcessSection.css'

const steps = [
  { name: 'Discover', description: 'We learn how your business actually works' },
  { name: 'Audit', description: 'We identify what can be automated and estimate impact' },
  { name: 'Design', description: 'We plan the system around your real workflow' },
  { name: 'Build', description: 'We build and test the automation or software' },
  { name: 'Launch', description: 'We deploy it into your live operations' },
  { name: 'Improve', description: 'We refine based on real usage' },
]

function ProcessSection() {
  return (
    <section id="process" className="process-section" aria-label="Our process">
      <div className="process-inner">
        <h2 className="process-heading">From messy workflow to working system.</h2>

        <ol className="process-flow">
          {steps.map((step, index) => (
            <li className="process-step" key={step.name}>
              <div className="process-step-card">
                <span className="process-step-number">{String(index + 1).padStart(2, '0')}</span>
                <p className="process-step-name">{step.name}</p>
                <p className="process-step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <span className="process-arrow" aria-hidden="true" />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ProcessSection
