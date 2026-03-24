import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-xda6.onrender.com/api/projects")
    // fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // ✅ Filter out dummy projects
  const validProjects = projects.filter(
    (p) => p.title && !p.title.includes("-")
  );

  const openGitHub = (url) => {
    if (!url || !/^https?:\/\//.test(url)) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="fade-in">
      <div className="container">

        {/* ✅ Heading */}
        <h2 style={styles.heading}>Projects</h2>

        {/* ✅ Subtitle */}
        <p style={styles.subtitle}>
          Selected work showcasing my UI design and full stack development skills
        </p>

        <div style={styles.grid}>
          {validProjects.map((project, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => openGitHub(project.github)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.borderColor = "#00adb5";
                e.currentTarget.style.boxShadow =
                  "0 10px 30px rgba(0,173,181,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#222";
                e.currentTarget.style.boxShadow = "none";
              }}
            >

              {/* <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
              /> */}

              {/* Title */}
              <h3 style={styles.title}>{project.title}</h3>

              {/* Description */}
              <p style={styles.desc}>{project.description}</p>

              {/* Footer */}
              <div style={styles.footer}>
                <span style={styles.link}>
                  {project.github ? "View Project" : "No link"}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const styles = {
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },

  subtitle: {
    color: "#aaa",
    marginBottom: "30px",
    maxWidth: "500px",
    lineHeight: "1.6",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px",
  },

  card: {
    padding: "22px",
    border: "1px solid #222",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(10px)",
    transition: "0.3s",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "180px",
  },

  title: {
    fontSize: "18px",
    fontWeight: "500",
  },

  desc: {
    color: "#aaa",
    marginTop: "10px",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  footer: {
    marginTop: "15px",
  },

  link: {
    color: "#00adb5",
    fontSize: "14px",
  },
};

export default Projects;