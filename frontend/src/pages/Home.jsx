// import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

// import { FaLinkedin, FaGithub } from "react-icons/fa";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { motion } from 'framer-motion'
// import { fadeUp, stagger } from '../utils/animations'
// import HeroCanvas from '../components/3d/HeroCanvas'

// <div style={{ height: "400px" }}>
//   <HeroCanvas />
// </div>

// <motion.div
//   variants={stagger}
//   initial="hidden"
//   animate="show"
// >
//   <motion.h1 variants={fadeUp}>
//     Hi, I'm Sri Swasthik
//   </motion.h1>
// </motion.div>


// function Home() {

//     // ✅ MUST be inside component
//     const location = useLocation();

//     useEffect(() => {
//         if (location.state?.section) {
//             const section = document.getElementById(location.state.section);

//             if (section) {
//                 setTimeout(() => {
//                     section.scrollIntoView({ behavior: "smooth" });
//                 }, 100);
//             }
//         }
//     }, [location]);

//     const scrollToSection = (id) => {
//         const section = document.getElementById(id);
//         if (section) {
//             section.scrollIntoView({ behavior: "smooth" });
//         }
//     };

//     return (
//         <section id="home" className="fade-in" style={{ paddingTop: "80px" }}>
//             <div style={styles.heroWrapper}>
//                 <div className="container" style={styles.hero}>

//                     <div style={{ ...styles.leftCard, animation: "fadeUp 1s ease" }}>
//                         {/* <h1 style={styles.title}>
//                             Hi, I'm <span style={styles.highlight}>Sri Swasthik</span>
//                         </h1>

//                         <p style={styles.subtitle}>
//                             UI Designer & Full Stack Developer crafting clean and functional digital experiences.
//                         </p> */}

//                         <h1 style={{ fontSize: "48px", fontWeight: "700" }}>
//                             Sri Swasthik
//                         </h1>

//                         <h2 style={{
//                             fontWeight: "400",
//                             marginTop: "10px",
//                             color: "#00adb5"
//                         }}>
//                             UI Designer & Full Stack Developer
//                         </h2>

//                         <p style={{ opacity: 0.8 }}>
//                             Building minimal, scalable digital products with strong backend systems.
//                         </p>

//                         <div style={styles.buttons}>
//                             <button
//                                 style={styles.primaryBtn}
//                                 onClick={() => scrollToSection("projects")}
//                             >
//                                 View Projects
//                             </button>

//                             <button
//                                 style={styles.secondaryBtn}
//                                 onClick={() => scrollToSection("contact")}
//                             >
//                                 Contact Me
//                             </button>
//                         </div>

//                         <div style={styles.divider}></div>

//                         <div style={styles.socials}>
//                             <a href="https://linkedin.com/in/sriswasthik" target="_blank" rel="noopener noreferrer" style={styles.iconBtn}>
//                                 <FaLinkedin />
//                             </a>

//                             <a href="https://github.com/sriswasthik" target="_blank" rel="noopener noreferrer" style={styles.iconBtn}>
//                                 <FaGithub />
//                             </a>

//                             <a href="/resume.pdf" target="_blank" style={styles.iconBtn}>
//                                 <HiOutlineDocumentText />
//                             </a>
//                         </div>
//                     </div>

//                     {/* <div style={styles.right}>
//                         <img src="/profile.png" alt="profile" style={styles.image} /> 
//                     </div> */}

//                     {/* <div style={styles.left}>
//                         <h1>
//                             Sri Swasthik
//                         </h1>

//                         <h2 style={styles.role}>
//                             UI Designer • Full Stack Developer
//                         </h2>

//                         <p style={styles.subtitle}>
//                             Designing clean, scalable digital experiences with functional backend systems.
//                         </p>
//                     </div> */}

//                 </div>
//             </div>

//             <section className="what-i-do">
//                 <h2>What I Do</h2>

//                 <div className="grid">
//                     <div className="card">
//                         <gradient-icon name="design-tool"></gradient-icon>
//                         <h3>UI Design</h3>
//                     </div>
//                     <div className="card">
//                         <gradient-icon name="frontend"></gradient-icon>
//                         <h3>Frontend Development</h3>
//                     </div>
//                     <div className="card">
//                         <gradient-icon name="backend"></gradient-icon>
//                         <h3>Backend Integration</h3>
//                     </div>
//                 </div>
//             </section>
//         </section>
//     );
// }

// const styles = {
//     hero: {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "space-between",
//         gap: "60px",
//         flexWrap: "wrap",
//         minHeight: "85vh",
//     },
//     leftCard: {
//         flex: "1 1 400px",
//         padding: "30px",
//         borderRadius: "16px",
//         background: "rgba(255,255,255,0.03)",
//         backdropFilter: "blur(10px)",
//         border: "1px solid rgba(255,255,255,0.05)",
//     },
//     // right: {
//     //     flex: "1 1 300px",
//     //     display: "flex",
//     //     justifyContent: "center",
//     //     alignItems: "flex-end",
//     // },
//     highlight: {
//         background: "linear-gradient(90deg, #00adb5, #00ffcc)",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent",
//     },
//     subtitle: {
//         marginTop: "15px",
//         color: "#aaa",
//         lineHeight: "1.7",
//         fontSize: "16px",
//         maxWidth: "500px",
//     },
//     buttons: {
//         marginTop: "20px",
//         display: "flex",
//         gap: "15px",
//         flexWrap: "wrap",
//     },
//     primaryBtn: {
//         padding: "12px 24px",
//         backgroundColor: "#00adb5",
//         border: "none",
//         color: "#fff",
//         cursor: "pointer",
//         borderRadius: "8px",
//     },
//     secondaryBtn: {
//         padding: "10px 20px",
//         backgroundColor: "transparent",
//         border: "1px solid #00adb5",
//         color: "#00adb5",
//         cursor: "pointer",
//         borderRadius: "5px",
//     },
//     image: {
//         width: "100%",
//         maxWidth: "320px",
//         borderRadius: "16px",
//         boxShadow: "0 20px 80px rgba(0, 173, 181, 0.25)",
//     },
//     socials: {
//         marginTop: "25px",
//         display: "flex",
//         gap: "15px",
//     },
//     iconBtn: {
//         width: "45px",
//         height: "45px",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         border: "1px solid #222",
//         borderRadius: "10px",
//         backgroundColor: "#111",
//         fontSize: "20px",
//         color: "#fff",
//         cursor: "pointer",
//     },
//     heroWrapper: {
//         background: "radial-gradient(circle at 70% 30%, rgba(0,173,181,0.15), transparent 60%)",
//     },
//     title: {
//         fontSize: "clamp(28px, 5vw, 48px)",
//         lineHeight: "1.2",
//         fontWeight: "600",
//     },
//     divider: {
//         marginTop: "25px",
//         height: "1px",
//         width: "60px",
//         backgroundColor: "#00adb5",
//         opacity: 0.4,
//     },
// };

// export default Home;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import { FaLinkedin, FaGithub, FaMedium } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../utils/animations";

import HeroCanvas from "../components/3d/HeroCanvas";
import MediumIcon from "../components/ui/MediumIcon";

function HeroIcon({ children, href }) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            style={styles.iconBtn}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
                // scale: [1, 1.1, 1],
                opacity: 1,
            }}
            transition={{
                duration: 0.2,
                // repeat: Infinity,
                ease: "easeInOut",
            }}
            whileHover={{
                scale: 1,
                rotate: 0,
                boxShadow: "0 0 25px rgba(0, 172, 181, 0.23)",
            }}
            whileTap={{ scale: 0.9 }}
        >
            {/* ✅ ADD GLOW HERE */}
            <span style={styles.iconGlow}></span>

            {/* ICON */}
            {children}
        </motion.a>
    );
}

function Home() {
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
        <section id="home" style={{ paddingTop: "80px" }}>

            {/* HERO SECTION */}
            <div style={styles.heroWrapper}>
                <div className="container" style={styles.hero}>

                    {/* LEFT CONTENT */}
                    <motion.div
                        style={styles.left}
                        variants={stagger}
                        initial="hidden"
                        animate="show"
                    >
                        <motion.h1 variants={fadeUp} style={styles.title}>
                            Hi, I'm <span style={styles.highlight}>Sri Swasthik</span>
                        </motion.h1>

                        <motion.h2 variants={fadeUp} style={styles.role}>
                            UI Designer & Full Stack Developer
                        </motion.h2>

                        <motion.p variants={fadeUp} style={styles.subtitle}>
                            Building minimal, scalable digital products with strong backend systems.
                        </motion.p>

                        <motion.div variants={fadeUp} style={styles.buttons}>
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
                        </motion.div>

                        {/* <motion.div variants={fadeUp} style={styles.socials}>
                            <a href="https://linkedin.com/in/sriswasthik" target="_blank" rel="noreferrer" style={styles.iconBtn}>
                                <FaLinkedin />
                            </a>
                            <a href="https://github.com/sriswasthik" target="_blank" rel="noreferrer" style={styles.iconBtn}>
                                <FaGithub />
                            </a>
                            <a href="/resume.pdf" target="_blank" style={styles.iconBtn}>
                                <HiOutlineDocumentText />
                            </a>
                        </motion.div> */}

                        <motion.div style={styles.socials}>
                            <HeroIcon href="https://linkedin.com/in/sriswasthik">
                                <FaLinkedin />
                            </HeroIcon>

                            <HeroIcon href="https://github.com/sriswasthik">
                                <FaGithub />
                            </HeroIcon>
                            <HeroIcon href="https://medium.com/@sriswasthik006">
                                <MediumIcon />
                            </HeroIcon>

                            <HeroIcon href="/resume.pdf">
                                <HiOutlineDocumentText />
                            </HeroIcon>

                            {/* ✅ NEW MEDIUM ICON */}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT 3D */}
                    <div style={styles.right}>
                        <HeroCanvas />
                    </div>

                </div>
            </div>

            {/* WHAT I DO SECTION */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>What I Do</h2>

                <div style={styles.grid}>
                    <div style={styles.card}>
                        <h3>UI Design</h3>
                    </div>
                    <div style={styles.card}>
                        <h3>Frontend Development</h3>
                    </div>
                    <div style={styles.card}>
                        <h3>Backend Integration</h3>
                    </div>
                </div>
            </div>
        </section>
    );
}

const styles = {
    heroWrapper: {
        background: "radial-gradient(circle at 70% 30%, rgba(0,173,181,0.15), transparent 60%)",
    },
    hero: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        minHeight: "90vh",
        flexWrap: "wrap",
    },
    left: {
        flex: "1 1 500px",
    },
    right: {
        flex: "1 1 400px",
        height: "400px",
    },
    title: {
        fontSize: "clamp(32px, 5vw, 56px)",
        fontWeight: "700",
    },
    role: {
        marginTop: "10px",
        color: "#00adb5",
        fontWeight: "400",
    },
    subtitle: {
        marginTop: "15px",
        color: "#aaa",
        maxWidth: "500px",
    },
    highlight: {
        background: "linear-gradient(90deg, #00adb5, #00ffcc)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    buttons: {
        marginTop: "25px",
        display: "flex",
        gap: "15px",
    },
    primaryBtn: {
        padding: "12px 24px",
        background: "#00adb5",
        border: "none",
        color: "#fff",
        borderRadius: "8px",
        cursor: "pointer",
    },
    secondaryBtn: {
        padding: "12px 24px",
        border: "1px solid #00adb5",
        background: "transparent",
        color: "#00adb5",
        borderRadius: "8px",
        cursor: "pointer",
    },
    socials: {
        marginTop: "25px",
        display: "flex",
        gap: "15px",
    },
    //   iconBtn: {
    //     width: "45px",
    //     height: "45px",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     borderRadius: "10px",
    //     background: "#111",
    //     border: "1px solid #222",
    //     color: "#fff",
    //     fontSize: "18px",
    //   },

    iconBtn: {
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "14px",
        background: "linear-gradient(145deg, #0f0f0f, #1a1a1a)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        fontSize: "20px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
    },
    iconGlow: {
        position: "absolute",
        width: "120%",
        height: "120%",
        background:
            "radial-gradient(circle, rgba(0,173,181,0.4), transparent 60%)",
        zIndex: -1,
        opacity: 0.6,
        filter: "blur(10px)",
    },
    section: {
        padding: "80px 20px",
        textAlign: "center",
    },
    sectionTitle: {
        fontSize: "28px",
        marginBottom: "40px",
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        flexWrap: "wrap",
    },
    card: {
        padding: "30px",
        borderRadius: "12px",
        background: "#111",
        border: "1px solid #222",
        minWidth: "200px",
        transition: "0.3s",
    },
};

export default Home;