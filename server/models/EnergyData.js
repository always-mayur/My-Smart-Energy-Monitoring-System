const mongoose = require("mongoose")

const EnergyDataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  electricity: {
    usage: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  gas: {
    usage: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  appliances: [
    {
      name: {
        type: String,
        required: true,
      },
      usage: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
      },
    },
  ],
  rooms: [
    {
      name: {
        type: String,
        required: true,
      },
      usage: {
        type: Number,
        required: true,
      },
      area: {
        type: Number,
        required: true,
      },
    },
  ],
})

module.exports = mongoose.model("EnergyData", EnergyDataSchema)

