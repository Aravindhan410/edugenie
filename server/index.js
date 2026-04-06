require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);

const lessonRoutes = require("./routes/lessonRoutes");
app.use("/api/lessons", lessonRoutes);

const progressRoutes = require("./routes/progressRoutes");
app.use("/api/progress", progressRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected ✅"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("API Running...");
});

// ✅ FIXED PART
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});