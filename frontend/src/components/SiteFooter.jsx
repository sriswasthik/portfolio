import { NavLink } from "react-router-dom";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__inner">
          <p>© {new Date().getFullYear()} Sri Swasthik</p>
          {/* NavLink sets aria-current="page" while on /gallery. */}
          <NavLink to="/gallery" className="link">
            Gallery
          </NavLink>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
