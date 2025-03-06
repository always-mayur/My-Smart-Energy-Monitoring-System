const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const cors = require("cors")
const path = require("path")
require("dotenv").config()

// Import routes
const authRoutes = require("./routes/auth")
const energyRoutes = require("./routes/energy")
const budgetRoutes = require("./routes/budget")

// Initialize Express app
const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Passport middleware
app.use(passport.initialize())
require("./config/passport")(passport)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/energy", energyRoutes)
app.use("/api/budget", budgetRoutes)

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
  })
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: "Server error" })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

