import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://portfolio-xda6.onrender.com/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // ✅ Safe open function (fixes blank page issue)
  const openGitHub = (url) => {
    if (!url) {
      alert("No GitHub link available");
      return;
    }

    // ensure valid URL
    if (!/^https?:\/\//.test(url)) {
      alert("Invalid GitHub link");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="projects" className="fade-in">
      <div className="container">

        <div style={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={index}
              style={styles.card}
              onClick={() => openGitHub(project.github)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#00adb5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#222";
              }}
            >
              <h3>{project.title}</h3>
              <p style={styles.desc}>{project.description}</p>

              {/* ✅ clickable hint */}
              <p style={styles.link}>
                {project.github ? "View on GitHub" : "No link available"}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    padding: "20px",
    border: "1px solid #222",
    borderRadius: "12px",
    backgroundColor: "#111",
    transition: "0.3s",
    cursor: "pointer",
  },

  desc: {
    color: "#aaa",
    marginTop: "10px",
    lineHeight: "1.6",
  },

  link: {
    marginTop: "12px",
    color: "#00adb5",
    fontSize: "14px",
  },
};

export default Projects;