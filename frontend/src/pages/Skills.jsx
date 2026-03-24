function Skills() {

    const skillGroups = [
        {
            title: "Frontend",
            icon: "design-tool",
            skills: ["React", "HTML", "CSS", "JavaScript", "Responsive Design"],
        },
        {
            title: "Backend",
            icon: "server",
            skills: ["Node.js", "Express", "REST APIs", "MongoDB"],
        },
        {
            title: "Tools",
            icon: "settings",
            skills: ["Git", "GitHub", "Figma", "VS Code"],
        },
    ];

    return (
        <section id="skills" className="fade-in" style={styles.section}>
            <div className="container">

                <h2 style={styles.heading}>Skills</h2>

                <div style={styles.wrapper}>
                    {skillGroups.map((group, index) => (
                        <div
                            key={index}
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

                            {/* ICON */}
                            <div style={styles.icon}>
                                <gradient-icon name={group.icon}></gradient-icon>
                            </div>

                            {/* TITLE */}
                            <h3 style={styles.title}>{group.title}</h3>

                            {/* SKILLS */}
                            <div style={styles.skills}>
                                {group.skills.map((skill, i) => (
                                    <span key={i} style={styles.skillTag}>
                                        {skill}
                                    </span>
                                ))}
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
        marginBottom: "30px",
    },

    wrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
    },

    card: {
        padding: "25px",
        borderRadius: "16px",
        background: "rgba(255,255,255,0.02)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.05)",
        transition: "0.3s",
        cursor: "default",
    },

    icon: {
        marginBottom: "15px",
    },

    title: {
        marginBottom: "15px",
        fontSize: "20px",
    },

    skills: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },

    skillTag: {
        padding: "6px 10px",
        border: "1px solid #222",
        borderRadius: "20px",
        backgroundColor: "#111",
        fontSize: "13px",
        opacity: 0.9,
    },
};

export default Skills;