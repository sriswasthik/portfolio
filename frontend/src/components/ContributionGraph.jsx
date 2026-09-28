import { useEffect, useMemo, useRef, useState } from "react";
import ExternalLink from "./ExternalLink";

// Public, unauthenticated mirror of GitHub's contribution calendar.
const API = "https://github-contributions-api.jogruber.de/v4";
const WEEKS = 53;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Pads the first week so each column is Sunday → Saturday.
function toWeeks(days) {
  const padded = [...Array(new Date(days[0].date).getUTCDay()).fill(null), ...days];
  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7));
  return weeks;
}

// A month label over the first week of each month, skipping any that would collide.
function monthLabels(weeks) {
  const labels = [];
  let lastMonth = -1;
  let lastIndex = -3;
  weeks.forEach((week, i) => {
    const first = week.find(Boolean);
    if (!first) return;
    const month = new Date(first.date).getUTCMonth();
    if (month !== lastMonth && i - lastIndex >= 3) {
      labels.push({ index: i, text: MONTHS[month] });
      lastIndex = i;
    }
    lastMonth = month;
  });
  return labels;
}

function ContributionGraph({ user, profileUrl }) {
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${API}/${user}?y=last`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then(setData)
      .catch((err) => {
        if (err?.name !== "AbortError") setFailed(true);
      });
    return () => controller.abort();
  }, [user]);

  const weeks = useMemo(
    () => (data ? toWeeks(data.contributions) : Array(WEEKS).fill(Array(7).fill(null))),
    [data]
  );
  const labels = useMemo(() => (data ? monthLabels(weeks) : []), [data, weeks]);

  // Show the most recent weeks first on narrow screens.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  const total = data?.total?.lastYear;

  return (
    <figure className="graph" aria-labelledby="graph-caption">
      <div className="graph__header">
        <span className="graph__label" id="graph-caption">
          GitHub contributions
        </span>
        <ExternalLink href={profileUrl} variant="quiet">
          @{user}
        </ExternalLink>
      </div>

      {failed ? (
        <p className="status-text" style={{ marginTop: "var(--space-3)" }}>
          Couldn't load the contribution graph. It's on my GitHub profile.
        </p>
      ) : (
        <div
          className="graph__scroll"
          ref={scrollRef}
          aria-hidden="true"
          style={{ "--weeks": weeks.length, "--cell": "0.5625rem", "--gap": "3px" }}
        >
          <div className="graph__months">
            {labels.map((label) => (
              <span key={label.index} style={{ gridColumn: label.index + 1 }}>
                {label.text}
              </span>
            ))}
          </div>
          <div className="graph__grid">
            {weeks.flatMap((week, w) =>
              week.map((day, d) => (
                <span
                  key={`${w}-${d}`}
                  className="graph__cell"
                  data-level={day?.level ?? 0}
                  style={day ? undefined : { visibility: data ? "hidden" : "visible" }}
                  title={day ? `${day.count} on ${day.date}` : undefined}
                />
              ))
            )}
          </div>
        </div>
      )}

      <figcaption className="graph__footer">
        <span>
          {total != null
            ? `${total.toLocaleString()} contributions in the last year`
            : failed
              ? "Contributions unavailable"
              : "Loading contributions…"}
        </span>
        <span className="graph__legend" aria-hidden="true">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} className="graph__cell" data-level={level} />
          ))}
          <span>More</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default ContributionGraph;
