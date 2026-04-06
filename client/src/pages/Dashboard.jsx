import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import API from "../api";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        navigate("/");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const cardStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
};

const numberStyle = {
  fontSize: "24px",
  fontWeight: "bold"
};

  return (
  <Layout>
    <h1 style={{ marginBottom: "20px" }}>Dashboard</h1>

    {user && (
      <h3 style={{ marginBottom: "20px" }}>
        Welcome, {user.name} 👋
      </h3>
    )}

    {/* Cards */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px"
    }}>
      
      <div style={cardStyle}>
        <h3>Courses</h3>
        <p style={numberStyle}>5</p>
      </div>

      <div style={cardStyle}>
        <h3>Assignments</h3>
        <p style={numberStyle}>12</p>
      </div>

      <div style={cardStyle}>
        <h3>Progress</h3>
        <p style={numberStyle}>70%</p>
      </div>

    </div>
  </Layout>
);
}

export default Dashboard;