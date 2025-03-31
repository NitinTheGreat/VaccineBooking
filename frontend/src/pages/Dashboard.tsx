"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import Sidebar from "../components/Sidebar"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

interface Appointment {
  _id: string
  date: string
  status: string
}

const Dashboard = () => {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [upcomingAppointment, setUpcomingAppointment] = useState<Appointment | null>(null)
  const [loading, setLoading] = useState(true)
  const [canBook, setCanBook] = useState(false)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/appointments/upcoming", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUpcomingAppointment(response.data.appointment || null)
        setCanBook(response.data.canBook)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching appointments:", error)
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [token])

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 p-4 text-white">
                  <h2 className="text-xl font-semibold">Vaccination Status</h2>
                </div>
                <div className="p-6">
                  {upcomingAppointment ? (
                    <div>
                      <p className="text-gray-700 mb-2">You have an upcoming appointment:</p>
                      <p className="text-lg font-medium text-blue-800">
                        {new Date(upcomingAppointment.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Status:{" "}
                        <span className="font-medium text-green-600 capitalize">{upcomingAppointment.status}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-gray-700">You don't have any upcoming appointments.</p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-blue-600 p-4 text-white">
                  <h2 className="text-xl font-semibold">Book Appointment</h2>
                </div>
                <div className="p-6">
                  {canBook ? (
                    <div>
                      <p className="text-gray-700 mb-4">Ready to get vaccinated? Book your appointment now.</p>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate("/book-appointment")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                      >
                        Book Appointment
                      </motion.button>
                    </div>
                  ) : (
                    <p className="text-gray-700">
                      You already have an appointment scheduled this month. You can book your next appointment after
                      your current appointment.
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md overflow-hidden md:col-span-2"
              >
                <div className="bg-blue-600 p-4 text-white">
                  <h2 className="text-xl font-semibold">Vaccination Information</h2>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Why Get Vaccinated?</h3>
                  <p className="text-gray-700 mb-4">
                    Vaccines are one of the most effective ways to prevent diseases. They work with your body's natural
                    defenses to build protection against specific infections.
                  </p>

                  <h3 className="text-lg font-medium text-gray-800 mb-2">What to Expect</h3>
                  <p className="text-gray-700">
                    After vaccination, you might experience some mild side effects, which are signs that your body is
                    building protection. These may include pain at the injection site, fever, fatigue, headache, muscle
                    pain, chills, or joint pain.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

