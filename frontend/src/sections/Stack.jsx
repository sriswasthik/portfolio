import Section from "../components/Section";
import { stack } from "../data/stack";

function Stack() {
  return (
    <Section id="stack" title="stack">
      <dl className="meta-list">
        {stack.map((row) => (
          <div key={row.group} className="meta-list__row">
            <dt>{row.group}</dt>
            <dd>
              <ul className="inline-list">
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export default Stack;
