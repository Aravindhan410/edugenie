const Course = require("../models/Course");

// Create Course
exports.createCourse = async (req, res) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      createdBy: req.user.id
    });

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Courses
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("createdBy", "name");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};