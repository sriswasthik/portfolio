import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

function Home() {
    return (
        <section id="home" className="fade-in" style={{ paddingTop: "80px" }}>
            <div style={styles.heroWrapper}>
                <div className="container" style={styles.hero}>

                    <div style={styles.leftCard}>
                        <h1 style={styles.title}>
                            Hi, I'm <span style={styles.highlight}>Sri Swasthik</span>
                        </h1>

                        <p style={styles.subtitle}>
                            UI Designer & Full Stack Developer crafting clean and functional digital experiences.
                        </p>

                        <div style={styles.buttons}>
                            <button
                                style={styles.primaryBtn}
                                onClick={() => scrollToSection("projects")}
                                onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                                onMouseLeave={(e) => (e.target.style.opacity = "1")}
                            >
                                View Projects
                            </button>

                            <button
                                style={styles.secondaryBtn}
                                onClick={() => scrollToSection("contact")}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#00adb5";
                                    e.target.style.color = "#fff";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "transparent";
                                    e.target.style.color = "#00adb5";
                                }}
                            >
                                Contact Me
                            </button>


                        </div>

                        <div style={styles.divider}></div>

                        <div style={styles.socials}>

                            <a
                                href="https://linkedin.com/in/sriswasthik"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.iconBtn}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#00adb5";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#111";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <FaLinkedin />
                            </a>

                            <a
                                href="https://github.com/sriswasthik"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={styles.iconBtn}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#00adb5";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#111";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <FaGithub />
                            </a>

                            <a
                                href="/resume.pdf"
                                target="_blank"
                                style={styles.iconBtn}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#00adb5";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.transform = "translateY(-3px)";
                                }}

                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "#111";
                                    e.currentTarget.style.color = "#fff";
                                    e.currentTarget.style.transform = "translateY(0)";
                                }}
                            >
                                <HiOutlineDocumentText />
                            </a>

                        </div>
                    </div>

                    <div style={styles.right}>
                        <img
                            src="/profile.png"
                            alt="profile"
                            style={styles.image}
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}

const location = useLocation();

useEffect(() => {
  if (location.state?.section) {
    const section = document.getElementById(location.state.section);

    if (section) {
      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
}, [location]);

const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
};

const styles = {
    hero: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "60px",
        flexWrap: "wrap",
        minHeight: "85vh",
    },
    leftCard: {
        flex: "1 1 400px",
        padding: "30px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.05)",
    },

    right: {
        flex: "1 1 300px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
    },
    highlight: {
        background: "linear-gradient(90deg, #00adb5, #00ffcc)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    subtitle: {
        marginTop: "15px",
        color: "#aaa",
        lineHeight: "1.7",
        fontSize: "16px",
        maxWidth: "500px",
    },
    buttons: {
        marginTop: "20px",
        display: "flex",
        gap: "15px",
    },
    primaryBtn: {
        padding: "12px 24px",
        backgroundColor: "#00adb5",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        borderRadius: "8px",
        fontWeight: "500",
        transition: "0.3s",
    },
    secondaryBtn: {
        padding: "10px 20px",
        backgroundColor: "transparent",
        border: "1px solid #00adb5",
        color: "#00adb5",
        cursor: "pointer",
        borderRadius: "5px",
    },
    image: {
        width: "100%",
        maxWidth: "320px",
        height: "auto",
        borderRadius: "16px",
        boxShadow: "0 20px 80px rgba(0, 173, 181, 0.25)",
    },

    socials: {
        marginTop: "25px",
        display: "flex",
        gap: "15px",
    },

    iconBtn: {
        width: "45px",
        height: "45px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid #222",
        borderRadius: "10px",
        backgroundColor: "#111",
        fontSize: "20px",
        color: "#fff",
        transition: "0.3s",
        cursor: "pointer",
    },

    heroWrapper: {
        background: "radial-gradient(circle at 70% 30%, rgba(0,173,181,0.15), transparent 60%)",
    },

    title: {
        fontSize: "clamp(28px, 5vw, 48px)",
        lineHeight: "1.2",
        fontWeight: "600",
    },

    divider: {
        marginTop: "25px",
        height: "1px",
        width: "60px",
        backgroundColor: "#00adb5",
        opacity: 0.4,
    },

    buttons: {
        marginTop: "20px",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
    },

    buttons: {
        marginTop: "20px",
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
    },
};

export default Home;