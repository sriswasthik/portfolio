import { Link } from "react-router-dom";
import Section from "../components/Section";
import ExternalLink from "../components/ExternalLink";
import { socials } from "../data/profile";
import { events } from "../data/activity";

function Activity() {
  return (
    <Section id="activity" title="Writing & Activity">
      <div className="group">
        <h3 className="group-title">Writing</h3>
        <p>
          <ExternalLink href={socials.medium.href}>Writing on Medium</ExternalLink>
        </p>
      </div>

      <div className="group">
        <h3 className="group-title">Hackathons &amp; events</h3>
        <ul className="plain-list compact-list">
          {events.map((event) => (
            <li key={event.title}>
              <div className="entry__header">
                <p>
                  {event.title}
                  {event.host && <span className="muted"> · {event.host}</span>}
                </p>
                {event.year && <p className="entry__meta">{event.year}</p>}
              </div>
              {event.note && <p className="entry__body">{event.note}</p>}
            </li>
          ))}
        </ul>
        <p className="link-row block-gap">
          <Link to="/gallery" className="link">
            Photos from these events
          </Link>
        </p>
      </div>
    </Section>
  );
}

export default Activity;
