import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [active, setActive] = useState("home");
    const navigate = useNavigate();


    const scrollToSection = (id) => {
        if (window.location.pathname !== "/") {
            navigate("/", { state: { section: id } });
        } else {
            const section = document.getElementById(id);

            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav style={scrolled ? styles.navScrolled : styles.nav}>

            {/* Logo */}
            <h2 style={styles.logo}>SriSwasthik</h2>

            {/* Desktop Menu */}
            <ul style={styles.menu}>
                {["home", "about", "projects", "skills", "gallery", "contact"].map((item) => (
                    <li
                        key={item}
                        style={{
                            ...styles.link,
                            color: active === item ? "#00adb5" : "#ccc",
                        }}
                        onClick={() => {
                            setActive(item);

                            if (item === "gallery") {
                                navigate("/gallery");   // 🔥 route change
                            } else {
                                navigate("/");          // go back home
                                setTimeout(() => {
                                    scrollToSection(item);
                                }, 100);
                            }
                        }}
                    >
                        {item}

                        <span
                            style={{
                                ...styles.underline,
                                width: active === item ? "100%" : "0%",
                            }}
                        ></span>
                    </li>
                ))}
            </ul>

            {/* Mobile Button */}
            <div className="hamburger" style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
                ☰
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div style={styles.mobileMenu}>
                    {["home", "about", "projects", "skills", "gallery", "contact"].map((item) => (
                        <div
                            key={item}
                            style={styles.mobileItem}
                            onClick={() => {
                                setActive(item);

                                if (item === "gallery") {
                                    navigate("/gallery");
                                } else {
                                    scrollToSection(item);
                                }

                                setMenuOpen(false); // for mobile
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            )}
        </nav>
    );
}

const styles = {
    nav: {
        position: "fixed",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",   // ✅ added
        padding: "20px 40px",
        zIndex: 1000,
        transition: "0.3s",
    },

    navScrolled: {
        position: "fixed",
        top: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",   // ✅ added
        padding: "15px 40px",
        background: "rgba(15,15,15,0.7)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #222",
        zIndex: 1000,
        transition: "0.3s",
    },

    logo: {
        fontWeight: "600",
        letterSpacing: "1px",

    },

    menu: {
        display: "flex",
        gap: "25px",
        listStyle: "none",
        alignItems: "center",
    },

    link: {
        position: "relative",
        cursor: "pointer",
        textTransform: "capitalize",
    },

    hamburger: {
        fontSize: "24px",
        cursor: "pointer",
    },

    mobileMenu: {
        position: "absolute",
        top: "70px",
        right: "20px",
        background: "#111",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
    },

    mobileItem: {
        cursor: "pointer",
    },

    underline: {
        position: "absolute",
        bottom: "-6px",
        left: 0,
        height: "2px",
        width: "0%",
        backgroundColor: "#00adb5",
        transition: "width 0.3s ease",
    },

    link: {
        position: "relative",   // 🔥 REQUIRED
        cursor: "pointer",
        lineHeight: "1",
    },
};

export default Navbar;