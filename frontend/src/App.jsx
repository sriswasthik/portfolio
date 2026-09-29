import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useCallback, useState } from "react";

import Splash from "./components/Splash";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import useHashScroll from "./hooks/useHashScroll";
import { prefersReducedMotion } from "./lib/scroll";

// Admin routes (and Clerk with them) are split out of the main bundle.
// Gallery is small (~2 KB) and loads eagerly so it never flashes a loading placeholder.
const AdminLayout = lazy(() => import("./admin/AdminLayout"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));

// Decided once per page load: App never remounts on in-app navigation,
// so returning to home via the nav doesn't replay the greeting.
function shouldShowSplash() {
  return window.location.pathname === "/" && !prefersReducedMotion();
}

function App() {
  useHashScroll();
  const [showSplash, setShowSplash] = useState(shouldShowSplash);
  const hideSplash = useCallback(() => setShowSplash(false), []);

  return (
    <>
      {showSplash && <Splash onDone={hideSplash} />}

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main" className="container" tabIndex={-1}>
        <Suspense
          fallback={
            <p className="page-header status-text" role="status">
              Loading…
            </p>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Admin />} />
              {/* Clerk's sign-in steps live under /login/... */}
              <Route path="/login/*" element={<Login />} />
            </Route>
          </Routes>
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
