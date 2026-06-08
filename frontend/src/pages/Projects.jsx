// import { useEffect, useState } from "react";

// function Projects() {
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetch("https://portfolio-xda6.onrender.com/api/projects")
//     // fetch("http://localhost:5000/api/projects")
//       .then((res) => res.json())
//       .then((data) => setProjects(data))
//       .catch((err) => console.error("Error fetching projects:", err));
//   }, []);

//   // ✅ Filter out dummy projects
//   const validProjects = projects.filter(
//     (p) => p.title && !p.title.includes("-")
//   );

//   const openGitHub = (url) => {
//     if (!url || !/^https?:\/\//.test(url)) return;
//     window.open(url, "_blank", "noopener,noreferrer");
//   };

//   return (
//     <section id="projects" className="fade-in">
//       <div className="container">

//         {/* ✅ Heading */}
//         <h2 style={styles.heading}>Projects</h2>

//         {/* ✅ Subtitle */}
//         <p style={styles.subtitle}>
//           Selected work showcasing my UI design and full stack development skills
//         </p>

//         <div style={styles.grid}>
//           {validProjects.map((project, index) => (
//             <div
//               key={index}
//               style={styles.card}
//               onClick={() => openGitHub(project.github)}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-8px)";
//                 e.currentTarget.style.borderColor = "#00adb5";
//                 e.currentTarget.style.boxShadow =
//                   "0 10px 30px rgba(0,173,181,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.borderColor = "#222";
//                 e.currentTarget.style.boxShadow = "none";
//               }}
//             >

//               {/* <img
//                 src={project.image}
//                 alt={project.title}
//                 style={{
//                   width: "100%",
//                   height: "180px",
//                   objectFit: "cover",
//                   borderRadius: "10px",
//                   marginBottom: "10px"
//                 }}
//               /> */}

//               {/* Title */}
//               <h3 style={styles.title}>{project.title}</h3>

//               {/* Description */}
//               <p style={styles.desc}>{project.description}</p>

//               {/* Footer */}
//               <div style={styles.footer}>
//                 <span style={styles.link}>
//                   {project.github ? "View Project" : "No link"}
//                 </span>
//               </div>

//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }

// const styles = {
//   heading: {
//     fontSize: "32px",
//     marginBottom: "10px",
//   },

//   subtitle: {
//     color: "#aaa",
//     marginBottom: "30px",
//     maxWidth: "500px",
//     lineHeight: "1.6",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//     gap: "25px",
//   },

//   card: {
//     padding: "22px",
//     border: "1px solid #222",
//     borderRadius: "16px",
//     background: "rgba(255,255,255,0.02)",
//     backdropFilter: "blur(10px)",
//     transition: "0.3s",
//     cursor: "pointer",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//     minHeight: "180px",
//   },

//   title: {
//     fontSize: "18px",
//     fontWeight: "500",
//   },

//   desc: {
//     color: "#aaa",
//     marginTop: "10px",
//     lineHeight: "1.6",
//     fontSize: "14px",
//   },

//   footer: {
//     marginTop: "15px",
//   },

//   link: {
//     color: "#00adb5",
//     fontSize: "14px",
//   },
// };

// export default Projects;


import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://portfolio-xda6.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const validProjects = projects.filter(
    (p) => p.title && !p.title.includes("-")
  );

  const openGitHub = (url) => {
    if (!url || !/^https?:\/\//.test(url)) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" style={styles.section}>
      <div className="container">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 style={styles.heading}>Projects</h2>
          <p style={styles.subtitle}>
            Clean UI. Smooth UX. Scalable Systems.
          </p>
        </motion.div>

        {/* SOCIAL ICONS */}
        {/* <motion.div
          style={styles.socials}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <IconBtn href="https://linkedin.com/in/sriswasthik">
            <FaLinkedin />
          </IconBtn>

          <IconBtn href="https://github.com/sriswasthik">
            <FaGithub />
          </IconBtn>

          <IconBtn href="/resume.pdf">
            <HiOutlineDocumentText />
          </IconBtn>
        </motion.div> */}

        {/* LOADING */}
        {loading ? (
          <p style={{ color: "#aaa" }}>Loading...</p>
        ) : (
          <div style={styles.grid}>
            {validProjects.map((project, index) => (
              <motion.div
                key={index}
                style={styles.card}
                onClick={() => openGitHub(project.github)}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -12,
                  scale: 1.04,
                }}
              >
                {/* Glow Border */}
                <div style={styles.glow}></div>

                <h3 style={styles.title}>{project.title}</h3>

                <p style={styles.desc}>{project.description}</p>

                <span style={styles.link}>
                  {project.github ? "View Project →" : "No link"}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* 🔥 ICON COMPONENT */
function IconBtn({ children, href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={styles.iconBtn}
      whileHover={{
        scale: 1.2,
        rotate: 8,
        boxShadow: "0 0 20px rgba(0,173,181,0.6)",
      }}
      whileTap={{ scale: 0.9 }}
    >
      {children}
    </motion.a>
  );
}

const styles = {
  section: {
    padding: "100px 20px",
  },

  heading: {
    fontSize: "40px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
  },

  socials: {
    display: "flex",
    gap: "15px",
    marginBottom: "40px",
  },

  iconBtn: {
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "12px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    fontSize: "20px",
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },

  card: {
    position: "relative",
    padding: "26px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(15px)",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    cursor: "pointer",
  },

  glow: {
    position: "absolute",
    width: "150%",
    height: "150%",
    background:
      "radial-gradient(circle, rgba(0,173,181,0.25), transparent 60%)",
    top: "-50%",
    left: "-50%",
    opacity: 0,
    transition: "0.4s",
  },

  title: {
    fontSize: "20px",
    fontWeight: "600",
  },

  desc: {
    marginTop: "10px",
    color: "#aaa",
    fontSize: "14px",
  },

  link: {
    marginTop: "20px",
    display: "inline-block",
    color: "#00adb5",
  },
};

export default Projects;