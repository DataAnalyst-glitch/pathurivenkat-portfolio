import './ProofStrip.css'

const proofItems = [
  {
    id: 'digihostel',
    name: 'DigiHostel',
    line: 'Live on Play Store · Used by 2 hostels',
    link: 'https://play.google.com/store/apps/details?id=com.pathurivenkat.digihostel',
  },
  {
    id: 'srdevelopers',
    name: 'srdevelopers.live',
    line: 'Delivered to a paying client · Live in production',
    link: 'https://srdevelopers.live',
  },
  {
    id: 'hostelos',
    name: 'HostelOS',
    line: 'Live system used by a real hostel',
    link: 'https://karthikeyahostel.in',
  },
  {
    id: 'review-pulse-ai',
    name: 'Review Pulse AI',
    line: 'Working AI/data analysis product',
    link: null,
  },
]

function ProofStrip() {
  return (
    <section id="proof" className="proof-strip" aria-label="Proof of work">
      <div className="proof-strip-inner">
        <h2 className="proof-strip-heading">Built for real-world use — not just demos.</h2>

        <div className="proof-strip-grid">
          {proofItems.map((item) => {
            const content = (
              <>
                <p className="proof-card-name">{item.name}</p>
                <p className="proof-card-line">{item.line}</p>
              </>
            )

            return item.link ? (
              <a
                className="proof-card"
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                {content}
              </a>
            ) : (
              <div className="proof-card" key={item.id}>
                {content}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProofStrip
