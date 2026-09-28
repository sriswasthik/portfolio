import { useState } from "react";
import Section from "../components/Section";
import ExternalLink from "../components/ExternalLink";
import { profile, socials } from "../data/profile";

const EMPTY_FORM = { name: "", email: "", message: "" };

function Contact() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [status, setStatus] = useState("idle");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");

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

            setStatus("sent");
            setForm(EMPTY_FORM);
        } catch (error) {
            console.error("Error:", error);
            setStatus("error");
        }
    };

    return (
        <Section id="contact" title="Contact">
            <p className="muted">
                Email is the best way to reach me:{" "}
                <a className="link" href={`mailto:${profile.email}`}>
                    {profile.email}
                </a>
                . I'm based in {profile.location}.
            </p>

            <ul className="link-row block-gap">
                {Object.values(socials).map((social) => (
                    <li key={social.href}>
                        <ExternalLink href={social.href}>{social.label}</ExternalLink>
                    </li>
                ))}
            </ul>

            <details className="disclosure block-gap">
                <summary>Or send a message here</summary>

                <form onSubmit={handleSubmit} className="form disclosure__body">
                    <div className="field">
                        <label htmlFor="contact-name" className="field__label">Name</label>
                        <input
                            id="contact-name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={handleChange}
                            className="field__input"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="contact-email" className="field__label">Email</label>
                        <input
                            id="contact-email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={handleChange}
                            className="field__input"
                            required
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="contact-message" className="field__label">Message</label>
                        <textarea
                            id="contact-message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="field__input"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="button"
                        disabled={status === "sending"}
                    >
                        {status === "sending" ? "Sending..." : "Send Message"}
                    </button>

                    <p className="status-text" role="status">
                        {status === "sent" && "Message sent successfully ✓"}
                        {status === "error" && "Something went wrong. Please email me directly."}
                    </p>
                </form>
            </details>
        </Section>
    );
}

export default Contact;
