const Progress = require("../models/Progress");

// Mark as completed
exports.markCompleted = async (req, res) => {
  try {
    const { lessonId } = req.body;

    const progress = await Progress.findOneAndUpdate(
      {
        user: req.user.id,
        lesson: lessonId
      },
      { completed: true },
      { upsert: true, new: true }
    );

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user progress
exports.getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user.id
    });

    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};