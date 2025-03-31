import express from "express"
import Appointment from "../models/Appointment.js"
import auth from "../middleware/auth.js"

const router = express.Router()

// Create a new appointment
router.post("/", auth, async (req, res) => {
  try {
    const { date } = req.body

    // Check if user already has an appointment in the current month
    const currentDate = new Date(date)
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const existingAppointment = await Appointment.findOne({
      user: req.userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: "cancelled" },
    })

    if (existingAppointment) {
      return res.status(400).json({
        message: "You already have an appointment scheduled this month",
      })
    }

    // Create new appointment
    const appointment = new Appointment({
      user: req.userId,
      date: currentDate,
    })

    await appointment.save()

    res.status(201).json(appointment)
  } catch (error) {
    console.error("Create appointment error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get upcoming appointment
router.get("/upcoming", auth, async (req, res) => {
  try {
    const currentDate = new Date()

    // Find upcoming appointment
    const appointment = await Appointment.findOne({
      user: req.userId,
      date: { $gte: currentDate },
      status: "scheduled",
    }).sort({ date: 1 })

    // Check if user can book a new appointment
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const existingAppointment = await Appointment.findOne({
      user: req.userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: "cancelled" },
    })

    res.json({
      appointment,
      canBook: !existingAppointment,
    })
  } catch (error) {
    console.error("Get upcoming appointment error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Check if user can book an appointment
router.get("/can-book", auth, async (req, res) => {
  try {
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const existingAppointment = await Appointment.findOne({
      user: req.userId,
      date: { $gte: startOfMonth, $lte: endOfMonth },
      status: { $ne: "cancelled" },
    })

    res.json({
      canBook: !existingAppointment,
    })
  } catch (error) {
    console.error("Check booking eligibility error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

// Get past appointments
router.get("/past", auth, async (req, res) => {
  try {
    const currentDate = new Date()

    const appointments = await Appointment.find({
      user: req.userId,
      $or: [{ date: { $lt: currentDate } }, { status: "completed" }],
    }).sort({ date: -1 })

    res.json(appointments)
  } catch (error) {
    console.error("Get past appointments error:", error)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

