const express = require("express");
const router = express.Router();

const { createCourse, getCourses } = require("../controllers/courseController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createCourse);
router.get("/", authMiddleware, getCourses);

module.exports = router;