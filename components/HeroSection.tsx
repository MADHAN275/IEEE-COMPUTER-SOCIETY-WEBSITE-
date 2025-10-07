'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import MorphingSphere from './3D/MorphingSphere'
import ParticleSystem from './3D/ParticleSystem'

const HeroSection = () => {
  const router = useRouter()
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative flex items-center justify-center h-screen">
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          className="w-full h-full"
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <MorphingSphere />
            <ParticleSystem />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent"
        >
          IEEE COMPUTER SOCIETY KITS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-white"
        >
          EMPOWERING THE PEOPLE WHO DRIVE TECHNOLOGY
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="interactive w-auto px-6 py-4 bg-primary-gradient text-black font-semibold rounded-full text-lg shadow-orange-glow hover:shadow-orange-intense transform transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('membership')}
          >
            Join Now
            <motion.div
              className="absolute inset-0 bg-white opacity-0 rounded-full"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="interactive w-auto px-6 py-4 border-2 border-primary text-primary font-semibold rounded-full text-lg hover:bg-primary hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('about')}
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection