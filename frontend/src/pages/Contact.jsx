import { useState } from "react";

function Contact() {

    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("message", form.message);

        try {
            await fetch("https://script.google.com/macros/s/AKfycbzwSBaQMGlC3FjttFyPM9OJJ7LilYTbmDC7X2Ww22ZPajlRrb6oCeIKVk4-ntdhH-Fg/exec", {
                method: "POST",
                mode: "no-cors",
                body: formData,
            });

            setSuccess(true);
            setForm({
                name: "",
                email: "",
                message: "",
            });

        } catch (error) {
            console.error("Error:", error);
        }

        setLoading(false);
    };

    return (
        <section id="contact" style={styles.section} className="fade-in">
            <div className="container">

                <h2 style={styles.heading}>Contact Me</h2>

                <div style={styles.wrapper}>

                    {/* LEFT SIDE */}
                    <div style={styles.left}>
                        <h3 style={styles.subheading}>Let’s work together</h3>

                        <p style={styles.text}>
                            Have a project idea or collaboration in mind?
                            Feel free to reach out. I’m open to building
                            meaningful digital experiences.
                        </p>

                        <div style={styles.info}>
                            <p>Email: padmasriswasthik@gmail.com</p>
                            <p>Location: Hyderabad, Telangana</p>
                        </div>
                    </div>

                    {/* RIGHT SIDE FORM */}
                    <form onSubmit={handleSubmit} style={styles.form}>

                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            onFocus={(e) => e.target.style.borderColor = "#00adb5"}
                            onBlur={(e) => e.target.style.borderColor = "#222"}
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                            onFocus={(e) => e.target.style.borderColor = "#00adb5"}
                            onBlur={(e) => e.target.style.borderColor = "#222"}
                        />

                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            style={styles.textarea}
                            required
                        />

                        <button
                            type="submit"
                            style={styles.button}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Message"}
                        </button>

                        {/* ✅ Success Message */}
                        {success && (
                            <p style={styles.success}>
                                Message sent successfully ✓
                            </p>
                        )}

                    </form>

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
        gridTemplateColumns: "1fr 1fr",
        gap: "40px",
        alignItems: "start",
    },

    left: {
        maxWidth: "400px",
    },

    text: {
        color: "#aaa",
        marginTop: "10px",
        lineHeight: "1.6",
    },

    info: {
        marginTop: "20px",
        fontSize: "14px",
        color: "#ccc",
    },

    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },

    input: {
        padding: "14px",
        border: "1px solid #222",
        borderRadius: "10px",
        backgroundColor: "#111",
        color: "#fff",
        outline: "none",
        fontSize: "14px",
        transition: "0.3s",
    },

    textarea: {
        padding: "12px",
        border: "1px solid #222",
        borderRadius: "8px",
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "120px",
        outline: "none",
    },

    button: {
        padding: "14px",
        background: "linear-gradient(90deg, #00adb5, #00ffcc)",
        border: "none",
        color: "#000",
        fontWeight: "500",
        cursor: "pointer",
        borderRadius: "10px",
        transition: "0.3s",
    },
    success: {
        color: "#00adb5",
        fontSize: "14px",
        marginTop: "10px",
    },

    heading: {
        fontSize: "34px",
        fontWeight: "600",
        letterSpacing: "0.5px",
    },

    subheading: {
        fontSize: "22px",
        fontWeight: "500",
        marginBottom: "10px",
    },

    text: {
        color: "#aaa",
        lineHeight: "1.8",
        fontSize: "15px",
    },
};

export default Contact;