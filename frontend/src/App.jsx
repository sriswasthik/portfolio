import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Education from "./components/Education";

import useScrollReveal from "./hooks/useScrollReveal";
import useLenis from "./hooks/useLenis";

// Lazy load pages (performance optimization)
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Admin = lazy(() => import("./pages/Admin"));
const Login = lazy(() => import("./pages/Login"));

function MainPage() {
  useScrollReveal();

  return (
    <>
      <Home />
      <About />
      <Projects />
      <Skills />
      <Education />
      <Contact />
    </>
  );
}

function App() {
  useLenis(); // smooth scroll

  return (
    <>
      <Navbar />
      <Cursor />

      {/* Suspense for lazy loading */}
      <Suspense
        fallback={
          <div style={{ color: "white", textAlign: "center", marginTop: "20%" }}>
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;