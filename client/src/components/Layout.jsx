import { Link, useNavigate, useLocation } from "react-router-dom";


function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const linkStyle = (path) => ({
    display: "block",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    textDecoration: "none",
    color: location.pathname === path ? "#fff" : "#cbd5e1",
    background: location.pathname === path ? "#3b82f6" : "transparent"
  });

  return (
    
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#0f172a",
        color: "#fff",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>EduGenie</h2>

        <Link to="/dashboard" style={linkStyle("/dashboard")}>
          📊 Dashboard
        </Link>

        <Link to="/profile" style={linkStyle("/profile")}>
          👤 Profile
        </Link>

        <Link to="/courses" style={linkStyle("/courses")}>
            📚 Courses
        </Link>

        <button 
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "10px",
            width: "100%",
            borderRadius: "8px",
            border: "none",
            background: "#ef4444",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div style={{
        flex: 1,
        background: "#f1f5f9",
        padding: "20px"
      }}>
        {children}
      </div>

    </div>
  );
}

export default Layout;