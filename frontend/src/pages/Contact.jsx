import { useState } from "react";

function Contact() {

    // const sheet = SpreadsheetApp.openById("https://docs.google.com/spreadsheets/d/1EmiO7-Ic0YVShDG6Ix_ywl3wwMMVlwfWLp9TAiL_ZA4/edit?gid=0#gid=0").getSheetByName("Sheet1");
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    // ✅ THIS WAS MISSING
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("name", form.name);
    //     formData.append("email", form.email);
    //     formData.append("message", form.message);

    //     try {
    //         await fetch("https://script.google.com/macros/s/AKfycbydBVTfBFpjGrHr6TQkx9wggY7QT_AaHBTMWOrTY6bgY3RGbVPWPbgOmtcGUruDeHsX/exec", {
    //             method: "POST",
    //             mode: "no-cors",
    //             body: formData,
    //         });

    //         alert("Message saved successfully!");

    //         setForm({
    //             name: "",
    //             email: "",
    //             message: "",
    //         });

    //     } catch (error) {
    //         console.error("Error:", error);
    //         alert("Something went wrong");
    //     }
    // };

    const handleSubmit = async (e) => {
  e.preventDefault();

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

    alert("Message sent successfully!");

    setForm({
      name: "",
      email: "",
      message: "",
    });

  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong");
  }
};

    return (
        <section id="contact" className="fade-in">
            <div className="container">

                <h2>Contact Me</h2>



                <form onSubmit={handleSubmit} style={styles.form}>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={form.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
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
                        onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
                        onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                        Send Message
                    </button>

                </form>

            </div>
        </section>
    );
}

const styles = {
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "20px",
        maxWidth: "500px",
    },
    input: {
        padding: "12px",
        border: "1px solid #222",
        borderRadius: "6px",
        backgroundColor: "#111",
        color: "#fff",
        outline: "none",
    },
    textarea: {
        padding: "12px",
        border: "1px solid #222",
        borderRadius: "6px",
        backgroundColor: "#111",
        color: "#fff",
        minHeight: "120px",
        outline: "none",
    },
    button: {
        padding: "12px",
        backgroundColor: "#00adb5",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        borderRadius: "6px",
        transition: "0.3s",
    },
};

export default Contact;