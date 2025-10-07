'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import FloatingIcons from './3D/FloatingIcons'

const AboutSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            ABOUT IEEE COMPUTER SOCIETY
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              The IEEE Computer Society is a global leader in advancing computing technology, research, and innovation. Since its establishment in 1946, it has been the trusted voice and community for computer scientists, engineers, and technology professionals worldwide. Through its vast network, technical publications, conferences, and educational resources, IEEE CS continues to shape the evolution of computing and inspire technological excellence across disciplines.
            </p>
            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              Driven by the mission to empower professionals and students alike, IEEE CS focuses on fostering innovation in areas such as Artificial Intelligence, Data Science, Software Engineering, and Cybersecurity. It provides a platform for knowledge exchange, professional development, and collaboration to solve real-world technological challenges.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
                ABOUT IEEE COMPUTER SOCIETY KITS
              </h2>
            </motion.div>

            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              The IEEE Computer Society at Karunya Institute of Technology and Sciences is a vibrant platform dedicated to nurturing innovation, creativity, and research in the field of computing and technology. Established with the vision of promoting technical excellence and global exposure, IEEE CS KITS encourages students and faculty to engage in continuous learning, collaborative projects, and emerging technological trends.
            </p>
            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              By organizing technical sessions, coding challenges, expert lectures, and innovation-driven events, IEEE CS KITS creates opportunities for members to expand their skills and contribute to impactful technological advancements. The society serves as a bridge between academia and industry, fostering a spirit of inquiry, collaboration, and professional growth.
            </p>
            <p className="text-gray-300 text-base mb-8 leading-relaxed">
              Guided by the principles of the IEEE and the mission of KITS, the IEEE Computer Society KITS stands as a hub of knowledge, innovation, and leadership — empowering the KITS community to shape the future of technology with purpose and excellence.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection