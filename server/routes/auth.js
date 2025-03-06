const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log("Register request body:", req.body); // Debugging line

    // Trim input fields to avoid whitespace issues
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: trimmedEmail });
    if (existingUser) {
      console.log("User already exists:", existingUser); // Debugging line
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(trimmedPassword, salt);
    console.log("Hashed password:", hashedPassword); // Debugging line

    // Create new user
    const newUser = new User({
      name,
      email: trimmedEmail,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("New user created:", newUser); // Debugging line

    // Create JWT token
    const payload = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error("Registration error:", err); // Debugging line
    res.status(500).json({ message: "Server error" });
  }
});

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Password during login:', password)

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Find user by email
    const user = await User.findOne({ email: trimmedEmail });
    if (!user) {
      console.log("User not found:", trimmedEmail); // Debugging line
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Debugging: Log stored and incoming password
    console.log("Stored password:", user.password);
    console.log("Incoming password:", password);
    console.log("Incoming password:", trimmedPassword);
    
    // Check password
    const isMatch = await bcrypt.compare(trimmedPassword, user.password);
    console.log("Password match result:", isMatch); // Debugging line

    if (!isMatch) {
      console.log("Password does not match"); // Debugging line
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error("Login error:", err); // Debugging line
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    budget: req.user.budget,
  });
});

module.exports = router;
