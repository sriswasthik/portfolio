import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDownIcon, GitHubIcon } from "./Icons";
import { socials } from "../data/profile";

const WORK_ITEMS = [
  { label: "projects", to: "/#work" },
  { label: "experience", to: "/#experience" },
  { label: "activity", to: "/#activity" },
];

// "work" disclosure menu: Escape or an outside click closes it,
// and Escape returns focus to the button.
function WorkMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e) => {
      if (!wrapperRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li className="nav__item--menu" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        className="nav__link"
        aria-expanded={open}
        aria-controls="work-menu"
        onClick={() => setOpen((value) => !value)}
      >
        work
        <ChevronDownIcon className="nav__chevron" />
      </button>

      {open && (
        <ul id="work-menu" className="nav__menu">
          {WORK_ITEMS.map((item) => (
            <li key={item.label}>
              <Link to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <nav aria-label="Primary">
          <ul className="nav">
            <li>
              <Link to="/" className="nav__link">
                home
              </Link>
            </li>
            <WorkMenu />
            <li>
              <Link to="/#stack" className="nav__link">
                stack
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="nav__link">
                contact
              </Link>
            </li>
          </ul>
        </nav>

        <a
          className="header-icon"
          href={socials.github.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
          <span className="visually-hidden">GitHub (opens in a new tab)</span>
        </a>
      </div>
    </header>
  );
}

export default SiteHeader;
