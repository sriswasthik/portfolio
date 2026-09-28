import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { prefersReducedMotion, scrollToId } from "../lib/scroll";

// Scrolls to the section named in the URL hash on every navigation,
// including repeat clicks on the same nav link (each navigation has a new key).
export default function useHashScroll() {
  const location = useLocation();
  const previousPath = useRef(null);

  useEffect(() => {
    const isInitialLoad = previousPath.current === null;
    const samePage = previousPath.current === location.pathname;
    previousPath.current = location.pathname;

    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      // Wait a frame so the target exists after a route change.
      const frame = requestAnimationFrame(() =>
        scrollToId(id, { smooth: samePage })
      );
      return () => cancelAnimationFrame(frame);
    }

    // Leave the browser's own scroll restoration alone on first load.
    if (isInitialLoad) return;

    window.scrollTo({
      top: 0,
      behavior: samePage && !prefersReducedMotion() ? "smooth" : "auto",
    });
  }, [location]);
}
