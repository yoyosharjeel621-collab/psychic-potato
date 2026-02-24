const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  const { username, email, password, walletAddress } = req.body;

  try {
    const user = new User({
      username,
      email,
      password,
      walletAddress
    });

    await user.save();

    res.json({
      message: "User Registered",
      user
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    res.json({
      message: "Login Successful",
      user
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
