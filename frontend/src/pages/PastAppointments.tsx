"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

interface Appointment {
  _id: string
  date: string
  status: string
  notes?: string
}

const PastAppointments = () => {
  const { token } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchPastAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments/past", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setAppointments(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching past appointments:", error)
        setError("Failed to load past appointments.")
        setLoading(false)
      }
    }

    fetchPastAppointments()
  }, [token])

  // For demo purposes, generate some past appointments if none are returned
  useEffect(() => {
    if (!loading && appointments.length === 0 && !error) {
      const demoAppointments: Appointment[] = [
        {
          _id: "1",
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
          status: "completed",
          notes: "First dose administered. Patient reported no immediate side effects.",
        },
        {
          _id: "2",
          date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
          status: "completed",
          notes: "Booster shot administered. Patient was advised to monitor for any side effects.",
        },
      ]

      setAppointments(demoAppointments)
    }
  }, [loading, appointments, error])

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Past Appointments</h1>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <p className="text-red-700">{error}</p>
            </div>
          ) : appointments.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6 text-center"
            >
              <p className="text-gray-700">You don't have any past appointments.</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              {appointments.map((appointment, index) => (
                <motion.div
                  key={appointment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="bg-blue-600 p-4 text-white">
                    <h2 className="text-xl font-semibold">
                      {new Date(appointment.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-gray-700 font-medium capitalize">{appointment.status}</p>
                    </div>

                    <div className="text-gray-700">
                      <p className="mb-2">
                        <span className="font-medium">Time:</span>{" "}
                        {new Date(appointment.date).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })}
                      </p>

                      {appointment.notes && (
                        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">Notes:</p>
                          <p className="text-sm text-gray-600">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PastAppointments

