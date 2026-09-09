import './Projects.css'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="projects" aria-label="Projects">
      <div className="projects-inner">
        <h2 className="projects-heading">Projects</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.id}
              style={{ '--card-accent': project.accent }}
            >
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>

              {project.tech.length > 0 && (
                <ul className="project-tech">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}

              {project.status && <p className="project-status">{project.status}</p>}

              {project.link ? (
                <a
                  className="project-link"
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.linkLabel} ↗
                </a>
              ) : (
                <span className="project-link project-link--label">{project.linkLabel}</span>
              )}

              <p className="project-proves">{project.proves}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
