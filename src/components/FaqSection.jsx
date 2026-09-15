import './FaqSection.css'

const faqs = [
  {
    question: 'How much does this cost?',
    answer:
      "It depends on the complexity of what you need automated. Book a free audit and I'll give you a clear estimate before any commitment.",
  },
  {
    question: 'How long does a project take?',
    answer:
      "It depends on the complexity — a simple automation might take days, a custom system could take weeks. I'll give you an honest, specific timeline after understanding your actual requirement, not a generic estimate upfront.",
  },
  {
    question: "I've never worked with a small agency before — is that risky?",
    answer:
      "I understand the concern. That's why I show real, live projects instead of just promises — you can see exactly what I've built and verify it yourself before deciding.",
  },
  {
    question: "What if I'm not sure what to automate?",
    answer:
      "That's exactly what the free automation audit is for — tell me about one repetitive process and I'll tell you honestly whether it's worth automating.",
  },
]

function FaqSection() {
  return (
    <section id="faq" className="faq-section" aria-label="Frequently asked questions">
      <div className="faq-inner">
        <h2 className="faq-heading">Common questions</h2>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary className="faq-question">
                {faq.question}
                <span className="faq-toggle-icon" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqSection
