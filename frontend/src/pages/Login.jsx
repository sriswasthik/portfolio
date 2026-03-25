import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 🔐 change this password
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      alert("Wrong password");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "radial-gradient(circle at center, #00adb533, #0f0f0f)",
  },

  card: {
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.03)",
    backdropFilter: "blur(10px)",
    border: "1px solid #222",
    boxShadow: "0 0 40px rgba(0,173,181,0.15)",
    width: "320px",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #222",
    background: "#111",
    color: "#fff",
    outline: "none",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #00adb5, #00cfc8)",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },
};

export default Login;