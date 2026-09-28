import Section from "../components/Section";
import { work, education } from "../data/experience";

// Role (or degree) leads; organisation and dates stay secondary.
function EntryList({ items }) {
  return (
    <ul className="plain-list">
      {items.map((item) => (
        <li key={item.title} className="entry role">
          <h4 className="entry__title">{item.title}</h4>
          {item.organization && <p className="entry__org">{item.organization}</p>}
          {item.period && <p className="entry__meta">{item.period}</p>}
          {item.description && <p className="entry__body">{item.description}</p>}
        </li>
      ))}
    </ul>
  );
}

function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div className="group">
        <h3 className="group-title">Work</h3>
        <EntryList items={work} />
      </div>

      <div className="group">
        <h3 className="group-title">Education</h3>
        <EntryList items={education} />
      </div>
    </Section>
  );
}

export default Experience;
