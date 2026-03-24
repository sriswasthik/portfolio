function About() {
  return (
    <section id="about" className="fade-in">
      <div className="container" style={styles.wrapper}>

        {/* Title */}
        <h2>About Me</h2>

        {/* Content */}
        <div style={styles.content}>

          {/* Left */}
          <div style={styles.left}>
            <p style={styles.text}>
              I'm Sri Swasthik, a UI designer and full stack developer focused on building clean,
              functional, and user-centered digital experiences. I enjoy transforming ideas into
              real-world applications that are both visually appealing and technically strong.
            </p>

            <p style={styles.text}>
              My approach combines minimal design principles with scalable backend architecture,
              allowing me to create products that are not only beautiful but also practical and efficient.
            </p>
          </div>

          {/* Right Highlights */}
          <div style={styles.right}>
            <div style={styles.card}>
              <h3>Frontend</h3>
              <p>React, UI Design, Responsive Layouts</p>
            </div>

            <div style={styles.card}>
              <h3>Backend</h3>
              <p>Node.js, Express, Database Integration</p>
            </div>

            <div style={styles.card}>
              <h3>Focus</h3>
              <p>Performance, Clean UI, Real-world Projects</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

const styles = {
  wrapper: {
    marginTop: "40px",
  },
  content: {
    display: "flex",
    gap: "40px",
    marginTop: "20px",
    flexWrap: "wrap",
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  text: {
    color: "#aaa",
    lineHeight: "1.7",
    marginBottom: "15px",
  },
  card: {
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.02)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.05)"
  },
};

export default About;