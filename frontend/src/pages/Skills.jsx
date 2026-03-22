function Skills() {

    const skillGroups = [
        {
            title: "Frontend",
            skills: ["React", "HTML", "CSS", "JavaScript", "Responsive Design"],
        },
        {
            title: "Backend",
            skills: ["Node.js", "Express", "REST APIs", "MongoDB"],
        },
        {
            title: "Tools",
            skills: ["Git", "GitHub", "Figma", "VS Code"],
        },
    ];

    return (
        <section id="skills" onMouseEnter={(e) => {
            e.target.style.borderColor = "#00adb5";
            e.target.style.color = "#00adb5";
        }}
            onMouseLeave={(e) => {
                e.target.style.borderColor = "#222";
                e.target.style.color = "#fff";
            }} className="fade-in">
            <div className="container">

                <h2>Skills</h2>

                <div style={styles.wrapper}>
                    {skillGroups.map((group, index) => (
                        <div key={index} style={styles.group}>

                            <h3>{group.title}</h3>

                            <div style={styles.skills}>
                                {group.skills.map((skill, i) => (
                                    <span
                                        key={i}
                                        style={styles.skillTag}
                                        onMouseEnter={(e) => {
                                            e.target.style.borderColor = "#00adb5";
                                            e.target.style.color = "#00adb5";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.borderColor = "#222";
                                            e.target.style.color = "#fff";
                                        }}
                                    >
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
    wrapper: {
        display: "flex",
        gap: "30px",
        marginTop: "20px",
        flexWrap: "wrap",
    },
    group: {
        flex: "1",
        minWidth: "250px",
    },
    skills: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "10px",
    },
    skillTag: {
        padding: "8px 12px",
        border: "1px solid #222",
        borderRadius: "20px",
        backgroundColor: "#111",
        fontSize: "14px",
        transition: "0.3s",
        cursor: "default",
    },
};

export default Skills;