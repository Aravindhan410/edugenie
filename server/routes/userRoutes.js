const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const User = require("../models/User");

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("-password");
    const user = await User.findById(req.user.id).select("-password -__v");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, async (req, res) => {
  res.json({
    msg: "Protected route working",
    userId: req.user.id
  });
});

module.exports = router;