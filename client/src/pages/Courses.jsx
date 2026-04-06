import { useEffect, useState } from "react";
import API from "../api";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = async () => {
    await API.post("/courses", { title, description });
    setTitle("");
    setDescription("");
    fetchCourses();
  };

  return (
    <Layout>
      <h2>Courses</h2>

      {/* Create Course */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={handleCreate}>Create</button>
      </div>

      {/* Course List */}
      <div>
        {courses.map((c) => (
          <div key={c._id} style={{
            background: "#fff",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}>
            <Link to={`/courses/${c._id}`}>
            <h3>{c.title}</h3>
            </Link>
            <p>{c.description}</p>
            <small>By: {c.createdBy?.name}</small>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Courses;