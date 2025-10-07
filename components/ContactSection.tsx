'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import ContactParticleField from './3D/ContactParticleField'

const ContactSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add form submission logic here
    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://in.linkedin.com/in/karunya-ieee-computer-society' },
    { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/karunya_comp_soc?igsh=MXpsdTc2OXBybnV6' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com/@karunyaieeecomputersociety?feature=shared' }
  ]

  return (
    <section id="contact" className="py-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ContactParticleField />
        </Canvas>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to join the IEEE Computer Society KITS community? We&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-3xl font-bold text-primary mb-8 text-center">SEND US A MESSAGE</h3>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-xl mb-6 text-center"
                >
                  <p>Your message has been sent successfully!</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                        focusedField === 'name' 
                          ? 'border-primary shadow-orange-glow' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      required
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
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
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                      focusedField === 'subject' 
                        ? 'border-primary shadow-orange-glow' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    required
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full px-4 py-3 bg-transparent border rounded-xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none resize-none ${
                      focusedField === 'message' 
                        ? 'border-primary shadow-orange-glow' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    required
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="interactive w-full py-4 bg-primary-gradient text-black font-bold text-lg rounded-xl hover:shadow-orange-glow transition-all duration-300 relative overflow-hidden group"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <span className="relative z-10">Send Message</span>
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  />
                </motion.button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-primary mb-6">FACULTY COUNSELOR</h3>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-white font-semibold text-lg">Dr. Naveen Sundar</p>
                  <p className="text-gray-300">FACULTY COUNSELOR</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">📧</span>
                  </div>
                  <p className="text-gray-300">naveensundhar@karunya.edu.in</p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                    <span className="text-xl">📞</span>
                  </div>
                  <p className="text-gray-300">+91 9843166880</p>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl mt-8">
              <h3 className="text-2xl font-bold text-primary mb-6">STUDENT COORDINATORS</h3>
              
              <div className="space-y-6">
                <div className="border-b border-gray-700 pb-4">
                  <p className="text-white font-semibold">Ms. Fanisus R</p>
                  <p className="text-primary text-sm mb-2">President</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">📧</span>
                    <p className="text-gray-300 text-sm">fanisusr@karunya.edu.in</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📞</span>
                    <p className="text-gray-300 text-sm">+91 6382468758</p>
                  </div>
                </div>

                <div className="border-b border-gray-700 pb-4">
                  <p className="text-white font-semibold">Ms. D Jerlin Seraphina</p>
                  <p className="text-primary text-sm mb-2">Chair</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">📧</span>
                    <p className="text-gray-300 text-sm">djerlin@karunya.edu.in</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📞</span>
                    <p className="text-gray-300 text-sm">+91 9384423577</p>
                  </div>
                </div>

                <div>
                  <p className="text-white font-semibold">Mr. Madhan T</p>
                  <p className="text-primary text-sm mb-2">Web Lead</p>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm">📧</span>
                    <p className="text-gray-300 text-sm">madhant@karunya.edu.in</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">📞</span>
                    <p className="text-gray-300 text-sm">+91 9080688119</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl">
              <h3 className="text-2xl font-bold text-primary mb-6">FOLLOW US</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="interactive flex items-center p-4 glass rounded-xl hover:shadow-orange-glow transition-all duration-300 group"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </span>
                    <span className="text-white font-medium">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection