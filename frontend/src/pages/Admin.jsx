// if (localStorage.getItem("isAdmin") !== "true") {
//     window.location.href = "/login";
// }

import { useEffect, useState } from "react";

function Admin() {
    const API = "https://portfolio-xda6.onrender.com/api/projects"; // ⚠️ change after deploy
    // const API = "http://localhost:5000/api/projects"; // ⚠️ change after deploy

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
        <>
            <title>Admin — Sri Swasthik</title>
            <meta name="robots" content="noindex" />

            <header className="page-header page-header--row">
                <h1 className="page-title">Admin Panel</h1>

                <button
                    type="button"
                    className="button button--quiet"
                    onClick={() => {
                        localStorage.removeItem("isAdmin");
                        window.location.href = "/login";
                    }}
                >
                    Logout
                </button>
            </header>

            <div className="page-body">
                {/* ✅ FORM */}
                <form onSubmit={handleSubmit} className="form">
                    <div className="field">
                        <label htmlFor="project-title" className="field__label">Project title</label>
                        <input
                            id="project-title"
                            type="text"
                            value={form.title}
                            onChange={(e) =>
                                setForm({ ...form, title: e.target.value })
                            }
                            className="field__input"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="project-github" className="field__label">GitHub link</label>
                        <input
                            id="project-github"
                            type="text"
                            value={form.github}
                            onChange={(e) =>
                                setForm({ ...form, github: e.target.value })
                            }
                            className="field__input"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="project-description" className="field__label">Description</label>
                        <textarea
                            id="project-description"
                            value={form.description}
                            onChange={(e) =>
                                setForm({ ...form, description: e.target.value })
                            }
                            className="field__input"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="project-image" className="field__label">Image URL</label>
                        <input
                            id="project-image"
                            type="text"
                            value={form.image || ""}
                            onChange={(e) =>
                                setForm({ ...form, image: e.target.value })
                            }
                            className="field__input"
                        />
                    </div>

                    <button type="submit" className="button" disabled={loading}>
                        {loading ? "Adding..." : "Add Project"}
                    </button>
                </form>

                {/* ✅ PROJECT LIST */}
                <ul className="plain-list">
                    {projects.map((p) => (
                        <li key={p.id} className="entry">
                            <div className="entry__header">
                                <h2 className="entry__title">{p.title}</h2>
                                <button
                                    type="button"
                                    className="button button--quiet"
                                    onClick={() => deleteProject(p.id)}
                                >
                                    Delete<span className="visually-hidden"> {p.title}</span>
                                </button>
                            </div>

                            <p className="entry__body">{p.description}</p>

                            <p className="entry__links">
                                <a
                                    href={p.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="link"
                                >
                                    View<span className="visually-hidden"> {p.title} on GitHub</span>
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Admin;
