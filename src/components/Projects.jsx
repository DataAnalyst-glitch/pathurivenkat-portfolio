import './Projects.css'
import { useProjects } from '../hooks/useProjects'
import { caseStudyProblems, defaultCaseStudyProblem } from '../data/caseStudyProblems'

function Projects() {
  const { projects, loading } = useProjects()

  if (loading || projects.length === 0) return null

  return (
    <section id="projects" className="projects" aria-label="Case studies">
      <div className="projects-inner">
        <h2 className="projects-heading">Real systems we&apos;ve built</h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article
              className="project-card"
              key={project.id}
              style={{ '--card-accent': project.accent }}
            >
              <h3 className="project-name">{project.name}</h3>

              <div className="project-case-block">
                <p className="project-case-label">The problem</p>
                <p className="project-case-text">
                  {caseStudyProblems[project.id] ?? defaultCaseStudyProblem}
                </p>
              </div>

              <div className="project-case-block">
                <p className="project-case-label">What we built</p>
                <p className="project-case-text">{project.description}</p>
              </div>

              {project.tech.length > 0 && (
                <ul className="project-tech">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}

              <div className="project-case-block">
                <p className="project-case-label">The outcome</p>
                {project.status && <p className="project-status">{project.status}</p>}
                <p className="project-proves">{project.proves}</p>
              </div>

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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
