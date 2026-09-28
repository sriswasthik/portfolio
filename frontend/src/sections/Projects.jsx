import { useState } from "react";
import Section from "../components/Section";
import ExternalLink from "../components/ExternalLink";
import { GridIcon, ListIcon } from "../components/Icons";
import { projects } from "../data/projects";

const VIEW_KEY = "projects-view";

function readView() {
  try {
    return localStorage.getItem(VIEW_KEY) === "grid" ? "grid" : "list";
  } catch {
    return "list";
  }
}

function ViewToggle({ view, onChange }) {
  return (
    <div className="toggle" role="group" aria-label="Project layout">
      <button
        type="button"
        className="toggle__button"
        aria-pressed={view === "list"}
        onClick={() => onChange("list")}
      >
        <ListIcon />
        <span className="visually-hidden">List</span>
      </button>
      <button
        type="button"
        className="toggle__button"
        aria-pressed={view === "grid"}
        onClick={() => onChange("grid")}
      >
        <GridIcon />
        <span className="visually-hidden">Grid</span>
      </button>
    </div>
  );
}

function Projects() {
  const [view, setView] = useState(readView);

  const changeView = (next) => {
    setView(next);
    try {
      localStorage.setItem(VIEW_KEY, next);
    } catch {
      // Storage unavailable (private mode); the choice just isn't remembered.
    }
  };

  return (
    <Section
      id="work"
      title="projects"
      actions={<ViewToggle view={view} onChange={changeView} />}
    >
      <ul className={view === "grid" ? "plain-list project-grid" : "plain-list entry-list"}>
        {projects.map((project) => {
          const primary = project.links[0];
          return (
            <li key={project.title}>
              <div className="entry__top">
                <div className="entry__heading">
                  <h3 className="entry__title">
                    {primary ? (
                      <a href={primary.href} target="_blank" rel="noopener noreferrer">
                        {project.title}
                        <span className="visually-hidden"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <span className="entry__kind">· {project.category}</span>
                </div>

                {project.links.length > 0 && (
                  <ul className="plain-list entry__links">
                    {project.links.map((link) => (
                      <li key={link.href}>
                        <ExternalLink href={link.href} variant="quiet">
                          <span className="visually-hidden">{project.title} on </span>
                          {link.label}
                        </ExternalLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <p className="entry__body">{project.description}</p>

              {project.tech.length > 0 && (
                <ul className="dot-list entry__tech" aria-label="Built with">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

export default Projects;
