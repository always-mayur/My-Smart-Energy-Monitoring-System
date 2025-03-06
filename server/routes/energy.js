const express = require("express")
const router = express.Router()
const passport = require("passport")
const EnergyData = require("../models/EnergyData")

// @route   GET api/energy/data
// @desc    Get energy data based on period
// @access  Private
router.get("/data", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const { period } = req.query
    const userId = req.user.id

    let startDate
    const now = new Date()

    // Determine date range based on period
    switch (period) {
      case "today":
        startDate = new Date(now.setHours(0, 0, 0, 0))
        break
      case "month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case "year":
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      default:
        startDate = new Date(now.setHours(0, 0, 0, 0))
    }

    // Get energy data for the specified period
    const energyData = await EnergyData.find({
      user: userId,
      date: { $gte: startDate },
    }).sort({ date: 1 })

    // If no data exists, generate mock data for demo purposes
    if (energyData.length === 0) {
      return res.json(generateMockData(period, userId))
    }

    res.json(energyData)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// Helper function to generate mock data for demo
function generateMockData(period, userId) {
  const now = new Date()
  const data = []

  switch (period) {
    case "today":
      // Generate hourly data for today
      for (let i = 0; i < 24; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), i)
        data.push(createMockEntry(date, userId, i))
      }
      break
    case "month":
      // Generate daily data for current month
      const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
      for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), i)
        data.push(createMockEntry(date, userId, i))
      }
      break
    case "year":
      // Generate monthly data for current year
      for (let i = 0; i < 12; i++) {
        const date = new Date(now.getFullYear(), i, 15)
        data.push(createMockEntry(date, userId, i))
      }
      break
    default:
      // Default to today's data
      for (let i = 0; i < 24; i++) {
        const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), i)
        data.push(createMockEntry(date, userId, i))
      }
  }

  return data
}

function createMockEntry(date, userId, factor) {
  // Base values with some randomization
  const electricityUsage = 1.5 + Math.random() * 0.5 + factor * 0.2
  const electricityCost = electricityUsage * 8 // ₹8 per kWh

  const gasUsage = 0.5 + Math.random() * 0.3 + factor * 0.1
  const gasCost = gasUsage * 6 // ₹6 per unit

  return {
    _id: `mock_${date.getTime()}`,
    user: userId,
    date: date,
    electricity: {
      usage: Number.parseFloat(electricityUsage.toFixed(2)),
      cost: Number.parseFloat(electricityCost.toFixed(2)),
    },
    gas: {
      usage: Number.parseFloat(gasUsage.toFixed(2)),
      cost: Number.parseFloat(gasCost.toFixed(2)),
    },
    appliances: [
      {
        name: "Television",
        usage: Number.parseFloat((0.1 + Math.random() * 0.1).toFixed(2)),
        status: Math.random() > 0.3 ? "active" : "inactive",
      },
      {
        name: "Refrigerator",
        usage: Number.parseFloat((0.5 + Math.random() * 0.2).toFixed(2)),
        status: "active",
      },
      {
        name: "Air Conditioner",
        usage: Number.parseFloat((0.8 + Math.random() * 0.4).toFixed(2)),
        status: Math.random() > 0.5 ? "active" : "inactive",
      },
      {
        name: "Washing Machine",
        usage: Number.parseFloat((0.3 + Math.random() * 0.3).toFixed(2)),
        status: Math.random() > 0.7 ? "active" : "inactive",
      },
      {
        name: "Lights",
        usage: Number.parseFloat((0.2 + Math.random() * 0.1).toFixed(2)),
        status: "active",
      },
    ],
    rooms: [
      {
        name: "Living Room",
        usage: Number.parseFloat((0.8 + Math.random() * 0.4).toFixed(2)),
        area: 20,
      },
      {
        name: "Kitchen",
        usage: Number.parseFloat((1.2 + Math.random() * 0.5).toFixed(2)),
        area: 15,
      },
      {
        name: "Bedroom",
        usage: Number.parseFloat((0.6 + Math.random() * 0.3).toFixed(2)),
        area: 18,
      },
      {
        name: "Bathroom",
        usage: Number.parseFloat((0.3 + Math.random() * 0.2).toFixed(2)),
        area: 8,
      },
      {
        name: "Office",
        usage: Number.parseFloat((0.7 + Math.random() * 0.3).toFixed(2)),
        area: 12,
      },
    ],
  }
}

module.exports = router

