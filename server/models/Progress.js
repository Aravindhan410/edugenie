const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lesson"
  },
  completed: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);