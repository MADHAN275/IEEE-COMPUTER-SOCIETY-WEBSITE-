'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import FloatingIcons from './3D/FloatingIcons'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [counters, setCounters] = useState({
    members: 0,
    countries: 0,
    journals: 0,
    conferences: 0,
  })

  const finalCounts = {
    members: 375000,
    countries: 150,
    journals: 23,
    conferences: 200,
  }

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = duration / steps

      Object.keys(finalCounts).forEach((key) => {
        let current = 0
        const target = finalCounts[key as keyof typeof finalCounts]
        const stepValue = target / steps

        const timer = setInterval(() => {
          current += stepValue
          if (current >= target) {
            current = target
            clearInterval(timer)
          }
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }))
        }, increment)
      })
    }
  }, [isInView])

  const keyPoints = [
    "World's largest organization of computing professionals",
    "Over 375,000 members in 150+ countries",
    "Publisher of 23 peer-reviewed journals",
    "Sponsor of 200+ technical conferences annually",
    "Leader in computing standards development"
  ]

  return (
    <section id="about" className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.3} />
          <FloatingIcons />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            About IEEE Computer Society KITS
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-primary">Our Mission</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              To be the leading provider of technical information, community services, and personalized services to the world's computing professionals.
            </p>

            <h3 className="text-2xl font-semibold mb-4 text-primary">Our Vision</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Be essential to the global technical community and computer professionals everywhere and be universally recognized for the contributions of technical professionals in developing and applying technology to improve global conditions.
            </p>

            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="w-2 h-2 bg-primary rounded-full mr-4 flex-shrink-0" />
                  <p className="text-gray-300">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <motion.div
              className="glass p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {counters.members.toLocaleString()}+
              </div>
              <div className="text-gray-300">Members Worldwide</div>
            </motion.div>

            <motion.div
              className="glass p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {counters.countries}+
              </div>
              <div className="text-gray-300">Countries</div>
            </motion.div>

            <motion.div
              className="glass p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {counters.journals}
              </div>
              <div className="text-gray-300">Peer-reviewed Journals</div>
            </motion.div>

            <motion.div
              className="glass p-6 rounded-2xl text-center"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {counters.conferences}+
              </div>
              <div className="text-gray-300">Technical Conferences</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection