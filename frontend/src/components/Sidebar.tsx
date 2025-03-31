"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { motion } from "framer-motion"

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Book Appointment", path: "/book-appointment" },
    { name: "Past Appointments", path: "/past-appointments" },
  ]

  return (
    <motion.div
      className="bg-blue-900 text-white h-screen w-64 p-6 flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-1">VaccineBook</h2>
        <div className="h-1 w-12 bg-blue-400 rounded"></div>
      </div>

      <div className="mb-8">
        <p className="text-blue-300 text-sm">Welcome,</p>
        <h3 className="text-xl font-semibold">{user?.name}</h3>
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(item.path)}
                className={`w-full text-left py-2 px-4 rounded-lg transition-colors ${
                  location.pathname === item.path ? "bg-blue-700 text-white" : "text-blue-200 hover:bg-blue-800"
                }`}
              >
                {item.name}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={logout}
        className="mt-auto py-2 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
      >
        Logout
      </motion.button>
    </motion.div>
  )
}

export default Sidebar

