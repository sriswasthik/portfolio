import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/#work" },
  { label: "Stack", to: "/#stack" },
  { label: "Contact", to: "/#contact" },
];

function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <nav aria-label="Primary">
          <ul className="nav">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="nav__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default SiteHeader;
