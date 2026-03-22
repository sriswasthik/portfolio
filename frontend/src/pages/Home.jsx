import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

function Home() {

    // ✅ MUST be inside component
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
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                            >
                                View Projects
                            </button>

                            <button
                                style={styles.secondaryBtn}
                                onClick={() => scrollToSection("contact")}
                            >
                                Contact Me
                            </button>
                        </div>

                        <div style={styles.divider}></div>

                        <div style={styles.socials}>
                            <a href="https://linkedin.com/in/sriswasthik" target="_blank" rel="noopener noreferrer" style={styles.iconBtn}>
                                <FaLinkedin />
                            </a>

                            <a href="https://github.com/sriswasthik" target="_blank" rel="noopener noreferrer" style={styles.iconBtn}>
                                <FaGithub />
                            </a>

                            <a href="/resume.pdf" target="_blank" style={styles.iconBtn}>
                                <HiOutlineDocumentText />
                            </a>
                        </div>
                    </div>

                    <div style={styles.right}>
                        <img src="/profile.png" alt="profile" style={styles.image} />
                    </div>

                </div>
            </div>
        </section>
    );
}

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
        flexWrap: "wrap",
    },
    primaryBtn: {
        padding: "12px 24px",
        backgroundColor: "#00adb5",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        borderRadius: "8px",
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
};

export default Home;