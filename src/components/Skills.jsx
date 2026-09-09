import './Skills.css'
import { skillGroups } from '../data/skills'

function Skills() {
  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div className="skills-inner">
        <h2 className="skills-heading">Skills</h2>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.id}>
              <p className="skill-group-label">{group.label}</p>
              <div className="skill-pills">
                {group.items.map((item) => (
                  <span className="skill-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
