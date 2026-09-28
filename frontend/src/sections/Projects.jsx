import Section from "../components/Section";
import ExternalLink from "../components/ExternalLink";
import { projects } from "../data/projects";

function Projects() {
  return (
    <Section id="work" title="Projects">
      <ul className="plain-list">
        {projects.map((project) => (
          <li key={project.title} className="entry project">
            <div className="entry__heading">
              <h3 className="entry__title">{project.title}</h3>
              <span className="entry__kind">{project.category}</span>
            </div>

            <p className="entry__body">{project.description}</p>

            {project.tech.length > 0 && (
              <ul className="inline-list entry__tech" aria-label="Built with">
                {project.tech.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            )}

            {project.links.length > 0 && (
              <ul className="link-row entry__links">
                {project.links.map((link) => (
                  <li key={link.href}>
                    <ExternalLink href={link.href}>
                      <span className="visually-hidden">{project.title} on </span>
                      {link.label}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Projects;
