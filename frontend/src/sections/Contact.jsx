import { useState } from "react";
import Section from "../components/Section";
import { ArrowUpRightIcon, GitHubIcon, LinkedInIcon, MailIcon, MediumIcon, XIcon } from "../components/Icons";
import { profile, socials } from "../data/profile";

const EMPTY_FORM = { name: "", email: "", message: "" };

const SOCIAL_ROWS = [
    { ...socials.github, Icon: GitHubIcon },
    { ...socials.linkedin, Icon: LinkedInIcon },
    { ...socials.medium, Icon: MediumIcon },
    { ...socials.x, Icon: XIcon },
];

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
        <Section id="contact" title="socials">
            <ul className="plain-list social-list">
                <li>
                    <a href={`mailto:${profile.email}`}>
                        <MailIcon />
                        <span className="social-list__label">Email</span>
                        <span className="social-list__handle">{profile.email}</span>
                    </a>
                </li>
                {SOCIAL_ROWS.map(({ label, handle, href, ...row }) => {
                    const Icon = row.Icon;
                    return (
                    <li key={href}>
                        <a href={href} target="_blank" rel="noopener noreferrer">
                            <Icon />
                            <span className="social-list__label">{label}</span>
                            <span className="social-list__handle">
                                {handle}
                                <ArrowUpRightIcon />
                            </span>
                            <span className="visually-hidden"> (opens in a new tab)</span>
                        </a>
                    </li>
                    );
                })}
            </ul>

            <details className="disclosure">
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
                        className="button button--primary"
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
