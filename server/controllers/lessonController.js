const Lesson = require("../models/Lesson");

// Create Lesson
exports.createLesson = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;

    const lesson = await Lesson.create({
      title,
      content,
      videoUrl,
      course: courseId
    });

    res.json(lesson);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Lessons by Course
exports.getLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find({
      course: req.params.courseId
    });

    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};