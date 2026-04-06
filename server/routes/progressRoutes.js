const express = require("express");
const router = express.Router();

const { markCompleted, getProgress } = require("../controllers/progressController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, markCompleted);
router.get("/", authMiddleware, getProgress);

module.exports = router;