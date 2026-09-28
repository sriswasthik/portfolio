import Section from "../components/Section";
import { work, education } from "../data/experience";

// Role (or degree) leads; "at, organisation" and dates stay secondary.
function Timeline({ items }) {
  return (
    <ul className="plain-list entry-list">
      {items.map((item) => (
        <li key={item.title}>
          <div className="entry__top">
            <div>
              <h3 className="entry__title">{item.title}</h3>
              {item.organization && (
                <p className="entry__org">
                  at <span className="muted">{item.organization}</span>
                </p>
              )}
            </div>
            {item.period && <p className="entry__meta">{item.period}</p>}
          </div>
          {item.description && <p className="entry__body">{item.description}</p>}
          {item.tech?.length > 0 && (
            <ul className="dot-list entry__tech" aria-label="Technologies">
              {item.tech.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Experience() {
  return (
    <Section id="experience" title="experience">
      <Timeline items={work} />
    </Section>
  );
}

export function Education() {
  return (
    <Section id="education" title="education">
      <Timeline items={education} />
    </Section>
  );
}
