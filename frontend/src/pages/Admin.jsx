import { useEffect, useState } from "react";

function Admin() {
    const API = "http://localhost:5000/api/projects"; // ⚠️ change after deploy

    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        github: "",
    });
    const [loading, setLoading] = useState(false);

    // ✅ FETCH PROJECTS
    const fetchProjects = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error("Error fetching:", err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    // ✅ ADD PROJECT
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.description || !form.github) {
            alert("Fill all fields");
            return;
        }

        try {
            setLoading(true);

            await fetch(API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            setForm({
                title: "",
                description: "",
                github: "",
            });

            fetchProjects(); // 🔥 refresh instantly
        } catch (err) {
            console.error("Error adding:", err);
        }

        setLoading(false);
    };

    // ✅ DELETE PROJECT
    const deleteProject = async (id) => {
        try {
            await fetch(`${API}/${id}`, {
                method: "DELETE",
            });

            fetchProjects(); // 🔥 refresh instantly
        } catch (err) {
            console.error("Delete error:", err);
        }
    };

    return (
        <section style={styles.container}>
            <div className="container">

                <h2 style={styles.heading}>Admin Panel</h2>

                {/* ✅ FORM */}
                <form onSubmit={handleSubmit} style={styles.form}>

                    <input
                        type="text"
                        placeholder="Project Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        style={styles.input}
                    />

                    <input
                        type="text"
                        placeholder="GitHub Link"
                        value={form.github}
                        onChange={(e) =>
                            setForm({ ...form, github: e.target.value })
                        }
                        style={styles.input}
                    />

                    <textarea
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        style={styles.textarea}
                    />
                    <input
                        placeholder="Image URL"
                        value={form.image || ""}
                        onChange={(e) =>
                            setForm({ ...form, image: e.target.value })
                        }
                    />

                    

                    <button type="submit" style={styles.button}>
                        {loading ? "Adding..." : "Add Project"}
                    </button>
                </form>

                {/* ✅ PROJECT LIST */}
                <div style={styles.grid}>
                    {projects.map((p) => (
                        <div key={p.id} style={styles.card}>

                            <h3>{p.title}</h3>
                            <p style={styles.desc}>{p.description}</p>

                            <div style={styles.actions}>
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={styles.link}
                                >
                                    View
                                </a>

                                <button
                                    style={styles.deleteBtn}
                                    onClick={() => deleteProject(p.id)}
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

const styles = {
    container: {
        paddingTop: "80px",
    },

    heading: {
        fontSize: "32px",
        marginBottom: "30px",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        maxWidth: "500px",
        marginBottom: "40px",
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #222",
        background: "#111",
        color: "#fff",
        outline: "none",
    },

    textarea: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #222",
        background: "#111",
        color: "#fff",
        minHeight: "120px",
        outline: "none",
    },

    button: {
        padding: "12px",
        background: "#00adb5",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },

    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
    },

    card: {
        padding: "20px",
        border: "1px solid #222",
        borderRadius: "12px",
        background: "#111",
    },

    desc: {
        color: "#aaa",
        marginTop: "10px",
    },

    actions: {
        marginTop: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    link: {
        color: "#00adb5",
    },

    deleteBtn: {
        background: "#ff4d4d",
        border: "none",
        padding: "6px 10px",
        borderRadius: "6px",
        cursor: "pointer",
        color: "#fff",
    },
};

export default Admin;