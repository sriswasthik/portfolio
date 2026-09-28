import Intro from "../sections/Intro";
import Projects from "../sections/Projects";
import Experience from "../sections/Experience";
import Stack from "../sections/Stack";
import Activity from "../sections/Activity";
import Contact from "../sections/Contact";

function Home() {
  return (
    <>
      {/* React hoists these into <head>. */}
      <title>Sri Swasthik — Frontend Developer / UI/UX Designer</title>
      <link rel="canonical" href="https://sriswasthik.vercel.app/" />

      <Intro />
      <Projects />
      <Experience />
      <Stack />
      <Activity />
      <Contact />
    </>
  );
}

export default Home;
