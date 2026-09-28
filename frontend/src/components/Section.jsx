// A page section with a serif heading ("projects.") and optional controls
// on the right. tabIndex lets in-page navigation move focus here.
function Section({ id, title, actions, children }) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className="section"
      aria-labelledby={headingId}
      tabIndex={-1}
    >
      <div className="section__header">
        <h2 id={headingId} className="section__title">
          {title}.
        </h2>
        {actions}
      </div>
      {children}
    </section>
  );
}

export default Section;
