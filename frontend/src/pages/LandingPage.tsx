"use client"

import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-blue-900"
        >
          VaccineBook
        </motion.div>
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onClick={() => navigate("/auth")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
        >
          Get Started
        </motion.button>
      </header>

      <main className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">Vaccination Made Simple</h1>
          <p className="text-lg text-blue-800 mb-8">
            Book your vaccination appointment with ease. Our platform helps you stay protected with just a few clicks.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/auth")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Book Now
          </motion.button>
        </motion.div>

        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/hero.avif"
            alt="Vaccination illustration"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </motion.div>
      </main>

      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-3xl font-bold text-center text-blue-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose VaccineBook?
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy Booking",
                description: "Book your vaccination appointment in less than a minute with our simple interface.",
              },
              {
                title: "Reminders",
                description: "Get timely reminders about your upcoming appointments so you never miss one.",
              },
              {
                title: "Health Records",
                description: "Keep track of your vaccination history in one secure place.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold text-blue-800 mb-3">{feature.title}</h3>
                <p className="text-blue-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© 2025 VaccineBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

