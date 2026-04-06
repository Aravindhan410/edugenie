import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

function App() {
  const isAuth = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/profile"
          element={isAuth ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuth ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={isAuth ? <Profile /> : <Navigate to="/" />} />  
        <Route
          path="/courses"
          element={isAuth ? <Courses /> : <Navigate to="/" />}
        />
        <Route
          path="/courses/:id"
          element={isAuth ? <CourseDetails /> : <Navigate to="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;