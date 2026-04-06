import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../api";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/users/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);

      alert("Login success ✅");
setTimeout(() => {
  navigate("/dashboard");
}, 100);
    } catch (err) {
      console.error(err);
      alert("Login failed ❌");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
      <p>
      Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;