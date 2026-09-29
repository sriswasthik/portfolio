import { Link } from "react-router-dom";
import Section from "../components/Section";
import { useContent } from "../content/context";

function Activity() {
  const events = useContent("activity");

  return (
    <Section
      id="activity"
      title="activity"
      actions={
        <Link to="/gallery" className="quiet-link section__link">
          photos →
        </Link>
      }
    >
      <ul className="plain-list entry-list entry-list--tight">
        {events.map((event) => (
          <li key={event.title}>
            <div className="entry__top">
              <h3 className="entry__title entry__title--sm">
                {event.title}
                {event.host && <span className="entry__org"> · {event.host}</span>}
              </h3>
              {event.year && <p className="entry__meta">{event.year}</p>}
            </div>
            {event.note && <p className="entry__body">{event.note}</p>}
          </li>
        ))}
      </ul>
    </Section>
  );
}

export default Activity;
