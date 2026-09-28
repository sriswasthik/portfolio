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
    <>
      <title>Admin Login — Sri Swasthik</title>
      <meta name="robots" content="noindex" />

      <header className="page-header">
        <h1 className="page-title">Admin Login</h1>
      </header>

      <div className="page-body">
        <form onSubmit={handleLogin} className="form narrow">
          <div className="field">
            <label htmlFor="admin-password" className="field__label">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="field__input"
            />
          </div>

          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
