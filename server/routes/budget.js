const express = require("express")
const router = express.Router()
const passport = require("passport")
const User = require("../models/User")

// @route   POST api/budget/set
// @desc    Set user's energy budget
// @access  Private
router.post("/set", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { budget, alertThreshold } = req.body

    // Validate input
    if (!budget || !alertThreshold) {
      return res.status(400).json({ message: "Budget and alert threshold are required" })
    }

    // Update user's budget settings
    const user = await User.findById(req.user.id)

    user.budget = {
      amount: budget,
      alertThreshold: alertThreshold,
    }

    await user.save()

    res.json({ message: "Budget settings updated successfully", budget: user.budget })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   GET api/budget
// @desc    Get user's energy budget
// @access  Private
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json(user.budget)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router

