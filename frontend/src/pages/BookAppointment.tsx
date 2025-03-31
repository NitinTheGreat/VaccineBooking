"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

interface TimeSlot {
  id: string
  time: string
  available: boolean
}

const BookAppointment = () => {
  const { token } = useAuth()
  const navigate = useNavigate()

  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [canBook, setCanBook] = useState(true)

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = []
    const today = new Date()

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split("T")[0],
          display: date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
        })
      }
    }

    return dates
  }

  const availableDates = generateDates()

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments/can-book", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setCanBook(response.data.canBook)

        if (!response.data.canBook) {
          setError("You already have an appointment scheduled this month.")
        }
      } catch (error) {
        console.error("Error checking eligibility:", error)
        setError("Failed to check booking eligibility.")
      }
    }

    checkEligibility()
  }, [token])

  useEffect(() => {
    if (selectedDate) {
      fetchTimeSlots()
    }
  }, [selectedDate])

  const fetchTimeSlots = async () => {
    setLoading(true)
    setError("")

    try {
      // In a real app, this would fetch from the backend
      // For demo purposes, we'll generate some time slots
      const slots: TimeSlot[] = [
        { id: "1", time: "9:00 AM", available: Math.random() > 0.3 },
        { id: "2", time: "10:00 AM", available: Math.random() > 0.3 },
        { id: "3", time: "11:00 AM", available: Math.random() > 0.3 },
        { id: "4", time: "1:00 PM", available: Math.random() > 0.3 },
        { id: "5", time: "2:00 PM", available: Math.random() > 0.3 },
        { id: "6", time: "3:00 PM", available: Math.random() > 0.3 },
      ]

      setTimeSlots(slots)
    } catch (error) {
      console.error("Error fetching time slots:", error)
      setError("Failed to load available time slots.")
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTimeSlot) {
      setError("Please select both a date and time slot.")
      return
    }

    setBookingLoading(true)
    setError("")

    try {
      const response = await axios.post(
        "http://localhost:5000/api/appointments",
        {
          date: `${selectedDate}T${selectedTimeSlot}`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      setSuccess(true)
      setTimeout(() => {
        navigate("/dashboard")
      }, 2000)
    } catch (error: any) {
      console.error("Error booking appointment:", error)
      setError(error.response?.data?.message || "Failed to book appointment.")
    } finally {
      setBookingLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Appointment</h1>

          {!canBook ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"
            >
              <p className="text-yellow-700">
                You already have an appointment scheduled this month. You can book your next appointment after your
                current appointment.
              </p>
              <button
                onClick={() => navigate("/dashboard")}
                className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                Return to Dashboard
              </button>
            </motion.div>
          ) : success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 border-l-4 border-green-400 p-4 mb-6"
            >
              <p className="text-green-700">
                Your appointment has been successfully booked! Redirecting to dashboard...
              </p>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="bg-blue-600 p-4 text-white">
                  <h2 className="text-xl font-semibold">Select Date</h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {availableDates.map((date) => (
                      <motion.button
                        key={date.date}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedDate(date.date)
                          setSelectedTimeSlot("")
                        }}
                        className={`p-3 rounded-lg border transition-colors ${
                          selectedDate === date.date
                            ? "bg-blue-100 border-blue-500 text-blue-800"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        {date.display}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden mb-6"
                >
                  <div className="bg-blue-600 p-4 text-white">
                    <h2 className="text-xl font-semibold">Select Time</h2>
                  </div>
                  <div className="p-6">
                    {loading ? (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((slot) => (
                          <motion.button
                            key={slot.id}
                            whileHover={slot.available ? { scale: 1.05 } : {}}
                            whileTap={slot.available ? { scale: 0.95 } : {}}
                            onClick={() => slot.available && setSelectedTimeSlot(slot.id)}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg border transition-colors ${
                              !slot.available
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : selectedTimeSlot === slot.id
                                  ? "bg-blue-100 border-blue-500 text-blue-800"
                                  : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            {slot.time}
                            {!slot.available && <span className="block text-xs mt-1">(Booked)</span>}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {selectedDate && selectedTimeSlot && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="bg-blue-600 p-4 text-white">
                    <h2 className="text-xl font-semibold">Confirm Appointment</h2>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-4">You are about to book an appointment for:</p>
                    <p className="text-lg font-medium text-blue-800 mb-1">
                      {availableDates.find((d) => d.date === selectedDate)?.display}
                    </p>
                    <p className="text-lg font-medium text-blue-800 mb-4">
                      {timeSlots.find((t) => t.id === selectedTimeSlot)?.time}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleBookAppointment}
                      disabled={bookingLoading}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-70"
                    >
                      {bookingLoading ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (
                        "Confirm Appointment"
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookAppointment

