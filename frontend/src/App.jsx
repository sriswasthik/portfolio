import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import useHashScroll from "./hooks/useHashScroll";

// Admin routes are split out of the main bundle. Gallery is small (~2 KB)
// and loads eagerly so it never flashes a loading placeholder.
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  useHashScroll();

  return (
    <>
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </main>

      <SiteFooter />
    </>
  );
}

export default App;
