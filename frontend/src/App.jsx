import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Cursor from "./components/Cursor";
import Education from "./components/Education";
import Admin from "./pages/Admin";



import useScrollReveal from "./hooks/useScrollReveal";

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
  return (
    <>
      <Navbar />
      <Cursor />

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;