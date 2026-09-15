import './Contact.css'

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Z" />
      <path d="M9 8.5c.2-.5.5-.4.8-.4s.6 0 .8.5c.2.5.7 1.6.7 1.8s0 .3-.1.5c-.2.3-.4.4-.6.6-.2.2-.3.3-.1.6.2.4 1 1.5 2.1 2.1.3.2.5.1.7-.1l.5-.6c.2-.2.4-.2.6-.1.3.1 1.4.7 1.6.8.2.1.4.2.4.4 0 .2 0 1-.4 1.4-.4.5-1.5.9-2.7.5-1.1-.3-2.5-1-3.7-2.3-1.3-1.5-1.9-2.9-2-3.2-.1-.3-.7-1.2-.5-2 .1-.4.4-.6.6-.9Z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="4" />
      <circle cx="7.7" cy="8" r="0.9" fill="currentColor" stroke="none" />
      <path d="M7.7 11v6" />
      <path d="M12 17v-3.5c0-1.4.9-2.5 2.2-2.5s2.1 1.1 2.1 2.5V17" />
      <path d="M12 11v1" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.87 3.16 9 7.55 10.45.55.1.75-.24.75-.53 0-.26-.01-1.14-.02-2.06-3.07.55-3.87-.75-4.12-1.44-.14-.35-.73-1.44-1.25-1.73-.42-.23-1.03-.78-.02-.8.95-.02 1.63.87 1.86 1.24 1.09 1.83 2.82 1.32 3.51 1 .11-.79.42-1.32.76-1.62-2.66-.3-5.44-1.33-5.44-5.9 0-1.3.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.9 1.24 3.22 0 4.58-2.79 5.6-5.45 5.9.43.37.81 1.1.81 2.22 0 1.6-.02 2.89-.02 3.29 0 .29.2.64.76.53A10.99 10.99 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  )
}

const contactLinks = [
  { label: 'Email', href: 'mailto:survivepathuri@gmail.com', Icon: EmailIcon, external: false, brand: 'email' },
  { label: 'WhatsApp', href: 'https://wa.me/918522088696', Icon: WhatsAppIcon, external: true, brand: 'whatsapp' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/placeholder', Icon: LinkedInIcon, external: true, brand: 'linkedin' },
  { label: 'Instagram', href: 'https://instagram.com/placeholder', Icon: InstagramIcon, external: true, brand: 'instagram' },
  { label: 'GitHub', href: 'https://github.com/placeholder', Icon: GitHubIcon, external: true, brand: 'github' },
]

function Contact() {
  return (
    <section id="contact" className="contact" aria-label="Contact">
      <div className="contact-inner">
        <h2 className="contact-heading">Let's build something</h2>
        <p className="contact-subtext">Open to freelance work and full-time opportunities.</p>

        <div className="contact-links">
          {contactLinks.map(({ label, href, Icon, external, brand }) => (
            <a
              className={`contact-link contact-link--${brand}`}
              href={href}
              key={label}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              <span className="contact-link-icon">
                <Icon />
              </span>
              <span className="contact-link-label">{label}</span>
            </a>
          ))}
        </div>

        <a className="resume-button" href="#" aria-label="Download resume (placeholder)">
          <DownloadIcon />
          Download Resume
        </a>
      </div>
    </section>
  )
}

export default Contact
