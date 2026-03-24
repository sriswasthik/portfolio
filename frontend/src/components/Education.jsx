function Education() {
  const educationData = [
    {
      title: "B.Tech - Computer Science Engineering",
      college: "Malla Reddy College of Engineering, Hyderabad",
      duration: "2025 - 2028",
      desc: "Focused on full stack development, UI/UX design, and building real-world applications.",
    },
    {
      title: "Diploma - Mechanical Engineering",
      college: "Govt. Polytechnic College, Nizamabad",
      duration: "2022 - 2025",
      desc: "A technical foundation in systems thinking and structural logic, now applied to digital design.",
    },
  ];

  return (
    <section id="education" style={styles.section} className="fade-in">
      <div className="container">

        <h2 style={styles.heading}>Education</h2>

        <div style={styles.timeline}>

          <div style={styles.line}></div>

          {educationData.map((item, index) => (
            <div key={index} style={styles.item}>

              <div style={styles.dot}></div>

              <div
                style={styles.card}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.borderColor = "#00adb5";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >

                <div style={{ marginBottom: "10px" }}>
                  <gradient-icon name="education"></gradient-icon>
                </div>

                <h3 style={styles.title}>{item.title}</h3>

                {/* ✅ College Name */}
                <p style={styles.college}>{item.college}</p>

                <p style={styles.duration}>{item.duration}</p>

                <p style={styles.desc}>{item.desc}</p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

const styles = {
  section: {
    paddingTop: "80px",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "40px",
  },

  timeline: {
    position: "relative",
    marginLeft: "20px",
  },

  line: {
    position: "absolute",
    left: "10px",
    top: 0,
    bottom: 0,
    width: "2px",
    background: "linear-gradient(to bottom, #00adb5, transparent)",
  },

  item: {
    position: "relative",
    marginBottom: "40px",
    paddingLeft: "40px",
  },

  dot: {
    position: "absolute",
    left: "2px",
    top: "10px",
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "#00adb5",
    boxShadow: "0 0 10px rgba(0,173,181,0.6)",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "0.3s",
  },

  title: {
    fontSize: "18px",
    marginBottom: "5px",
  },

  college: {
    fontSize: "14px",
    color: "#ccc",
    marginBottom: "5px",
  },

  duration: {
    fontSize: "13px",
    color: "#00adb5",
    marginBottom: "10px",
  },

  desc: {
    color: "#aaa",
    fontSize: "14px",
    lineHeight: "1.6",
  },
};

export default Education;