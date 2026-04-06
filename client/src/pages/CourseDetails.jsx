import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import Layout from "../components/Layout";


function CourseDetails() {
  const { id } = useParams();

  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [completedLessons, setCompletedLessons] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [selectedLesson, setSelectedLesson] = useState(null);

  const fetchLessons = async () => {
    const res = await API.get(`/lessons/${id}`);
    setLessons(res.data);
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  const handleCreate = async () => {
    await API.post("/lessons", {
    title,
    content,
    videoUrl, // ✅ ADD
    courseId: id
    });

    setTitle("");
    setContent("");
    setVideoUrl(""); // ✅ reset
    };

    const fetchProgress = async () => {
        const res = await API.get("/progress");

        const completedIds = res.data.map(p => p.lesson);
        setCompletedLessons(completedIds);

  // ✅ Calculate %
    if (lessons.length > 0) {
        const percent = (completedIds.length / lessons.length) * 100;
        setProgressPercent(Math.round(percent));
        }
    };

    useEffect(() => {
        fetchLessons();
    }, []);

    useEffect(() => {
        if (lessons.length > 0) {
        fetchProgress();
        }
    }, [lessons]);

  const markComplete = async (lessonId) => {
  await API.post("/progress", { lessonId });
  fetchProgress();
};

  return (
  <Layout>
    <div style={{ display: "flex", gap: "20px" }}>

      {/* LEFT: Lessons List */}
      <div style={{
        width: "30%",
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        height: "80vh",
        overflowY: "auto"
      }}>
        <h3>Lessons</h3>

        {lessons.map((l) => (
          <div
            key={l._id}
            style={{
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              background: "#f1f5f9",
              cursor: "pointer"
            }}
            onClick={() => setSelectedLesson(l)}
          >
            {completedLessons.includes(l._id) ? "✅" : "▶️"} {l.title}
          </div>
        ))}
      </div>

      {/* RIGHT: Video Player */}
      <div style={{ flex: 1 }}>

        {/* Progress Bar */}
        <div style={{
          background: "#e2e8f0",
          borderRadius: "10px",
          marginBottom: "15px"
        }}>
          <div style={{
            width: `${progressPercent}%`,
            background: "#22c55e",
            padding: "5px",
            borderRadius: "10px",
            color: "#fff",
            textAlign: "center"
          }}>
            {progressPercent}% Completed
          </div>
        </div>

        {selectedLesson ? (
          <div>
            <h2>{selectedLesson.title}</h2>
            <p>{selectedLesson.content}</p>

            {selectedLesson.videoUrl && (
              <iframe
                width="100%"
                height="400"
                src={selectedLesson.videoUrl.replace("watch?v=", "embed/")}
                title="video"
              ></iframe>
            )}

            <button
              onClick={() => markComplete(selectedLesson._id)}
              style={{ marginTop: "10px" }}
            >
              {completedLessons.includes(selectedLesson._id)
                ? "✅ Completed"
                : "Mark as Complete"}
            </button>
          </div>
        ) : (
          <p>Select a lesson to start</p>
        )}

      </div>
    </div>
  </Layout>
);
}

export default CourseDetails;