import { Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

import {
  motion,
  AnimatePresence,
  useScroll,
} from "framer-motion";

import Navbar from "./components/Navbar";
import Cursor from "./components/Cursor";
import Education from "./components/Education";

import useScrollReveal from "./hooks/useScrollReveal";
import useLenis from "./hooks/useLenis";

// Lazy load pages
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
  useLenis();

  const location = useLocation();
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <motion.div
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "3px",
          background: "#00adb5",
          transformOrigin: "0%",
          zIndex: 9999,
        }}
      />

      <Navbar />
      <Cursor />

      {/* PAGE LOADER */}
      <Suspense
        fallback={
          <div
            style={{
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#0f0f0f",
              color: "#00adb5",
              fontSize: "18px",
            }}
          >
            Loading...
          </div>
        }
      >
        {/* ROUTE ANIMATIONS */}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<MainPage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </>
  );
}

export default App;