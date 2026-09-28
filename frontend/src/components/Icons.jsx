// Small inline icons. All are decorative (aria-hidden); links carry their own text.
const base = {
  className: "icon",
  "aria-hidden": "true",
  focusable: "false",
};

const stroke = {
  ...base,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function GitHubIcon() {
  return (
    <svg {...base} viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg {...stroke} viewBox="0 0 16 16">
      <rect x="1.5" y="1.5" width="13" height="13" rx="2" />
      <path d="M5 7v4.5M5 4.75v.01M8 11.5V7m0 2c0-1.2.8-2 1.75-2S11.5 7.8 11.5 9v2.5" />
    </svg>
  );
}

export function MediumIcon() {
  return (
    <svg {...base} viewBox="0 0 16 16" fill="currentColor">
      <ellipse cx="4.6" cy="8" rx="4.1" ry="4.1" />
      <ellipse cx="11.1" cy="8" rx="2.1" ry="3.9" />
      <ellipse cx="14.5" cy="8" rx="0.9" ry="3.6" />
    </svg>
  );
}

export function XIcon() {
  return (
    <svg {...stroke} viewBox="0 0 16 16">
      <path d="M2.5 2.5l11 11M13.5 2.5l-11 11" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg {...stroke} viewBox="0 0 16 16">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" />
      <path d="M2 4l6 4.5L14 4" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "icon" }) {
  return (
    <svg {...stroke} className={className} viewBox="0 0 16 16">
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function ListIcon() {
  return (
    <svg {...stroke} viewBox="0 0 16 16">
      <path d="M2.5 4h11M2.5 8h11M2.5 12h11" />
    </svg>
  );
}

export function GridIcon() {
  return (
    <svg {...stroke} viewBox="0 0 16 16">
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="9" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="9" width="5" height="5" rx="1" />
      <rect x="9" y="9" width="5" height="5" rx="1" />
    </svg>
  );
}

export function ArrowUpRightIcon() {
  return (
    <svg
      className="link__icon"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
    </svg>
  );
}
