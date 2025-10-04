
'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EventsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const pastEvents = [
    {
      title: "Tech Summit 2024",
      date: "November 15, 2024",
      description: "A full day of talks and workshops on the future of AI and machine learning.",
      icon: "🚀"
    },
    {
      title: "Coders' Night 2024",
      date: "December 2, 2024",
      description: "An overnight hackathon to build innovative solutions for social good.",
      icon: "💻"
    },
    {
      title: "Guest Lecture: Quantum Computing",
      date: "January 10, 2025",
      description: "A special lecture by a renowned expert in the field of quantum computing.",
      icon: "⚛️"
    }
  ]

  return (
    <section id="events" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            OUR PAST EVENTS
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="text-4xl mb-4">{event.icon}</div>
              <h3 className="text-2xl font-bold text-primary mb-3">{event.title}</h3>
              <p className="text-gray-400 font-semibold mb-4">{event.date}</p>
              <p className="text-gray-300 flex-grow">{event.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsSection
