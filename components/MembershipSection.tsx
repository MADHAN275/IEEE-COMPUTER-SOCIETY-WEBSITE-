'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import BrainEmoji3D from './3D/BrainEmoji3D'
import NetworkEmoji3D from './3D/NetworkEmoji3D'
import ChartEmoji3D from './3D/ChartEmoji3D'
import BooksEmoji3D from './3D/BooksEmoji3D'

const BenefitCard = ({ 
  title, 
  description, 
  icon3D, 
  index 
}: { 
  title: string
  description: string
  icon3D: React.ComponentType
  index: number 
}) => {
  const Icon3DComponent = icon3D
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass p-8 rounded-3xl hover:shadow-orange-glow transition-all duration-500 group"
      whileHover={{ scale: 1.02, y: -10 }}
    >
      <div className="h-32 mb-4 group-hover:scale-110 transition-transform duration-300">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#F39019" />
          <Icon3DComponent />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={1}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  )
}

const StudentInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    registrationNumber: '',
    year: '',
    department: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Student info submitted:', formData)
    // Add form submission logic here
  }

  const years = ['1st Year', '2nd Year', '3rd Year', '4th Year']
  const departments = ['CSE', 'ECE', 'EEE', 'MECH', 'CIVIL', 'IT', 'AIDS', 'CSBS']

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="max-w-4xl mx-auto"
    >
      <div className="glass p-8 rounded-3xl">
        <h3 className="text-3xl font-bold text-primary mb-8 text-center">Student Information</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('firstName')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  focusedField === 'firstName' 
                    ? 'border-primary shadow-orange-glow' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('lastName')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  focusedField === 'lastName' 
                    ? 'border-primary shadow-orange-glow' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">KMail Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  focusedField === 'email' 
                    ? 'border-primary shadow-orange-glow' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  focusedField === 'phone' 
                    ? 'border-primary shadow-orange-glow' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Registration Number</label>
            <input
              type="text"
              name="registrationNumber"
              value={formData.registrationNumber}
              onChange={handleInputChange}
              onFocus={() => setFocusedField('registrationNumber')}
              onBlur={() => setFocusedField(null)}
              className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                focusedField === 'registrationNumber' 
                  ? 'border-primary shadow-orange-glow' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year of Study</label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('year')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-black border rounded-xl text-white transition-all duration-300 focus:outline-none ${
                  focusedField === 'year' 
                    ? 'border-primary shadow-orange-glow' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                required
              >
                <option value="">Select year</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                onFocus={() => setFocusedField('department')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-black border rounded-xl text-white transition-all duration-300 focus:outline-none ${
                  focusedField === 'department' 
                    ? 'border-primary shadow-orange-glow' 
                    : 'border-gray-600 hover:border-gray-500'
                }`}
                required
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <motion.button
            type="submit"
            className="w-full py-4 bg-primary-gradient text-black font-bold text-lg rounded-xl hover:shadow-orange-glow transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Submit Registration</span>
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
            />
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}

const MembershipSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const benefits = [
    {
      title: "Professional Development",
      description: "Access to cutting-edge research, conferences, and educational resources",
      icon3D: BrainEmoji3D
    },
    {
      title: "Networking Opportunities", 
      description: "Connect with 375,000+ professionals worldwide",
      icon3D: NetworkEmoji3D
    },
    {
      title: "Career Resources",
      description: "Job board, career center, and professional certifications",
      icon3D: ChartEmoji3D
    },
    {
      title: "Publications Access",
      description: "Computer magazine, ComputingEdge, and digital library",
      icon3D: BooksEmoji3D
    }
  ]


  return (
    <section id="join-ieee" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            Join IEEE Computer Society KITS
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Unlock your potential and advance your career with the world's premier computing professional organization
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              icon3D={benefit.icon3D}
              index={index}
            />
          ))}
        </div>

        <StudentInfoForm />

      </div>
    </section>
  )
}

export default MembershipSection