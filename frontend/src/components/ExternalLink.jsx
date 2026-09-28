import { ArrowUpRightIcon } from "./Icons";

// A link that opens in a new tab, marked with a small arrow and announced
// as such to screen readers. `variant="quiet"` drops the underline.
function ExternalLink({ href, children, variant = "underline", className = "" }) {
  const base = variant === "quiet" ? "quiet-link" : "link";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${className}`.trim()}
    >
      {children}
      <ArrowUpRightIcon />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

export default ExternalLink;
