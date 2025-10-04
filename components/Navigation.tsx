
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'membership', 'events', 'board', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Membership', href: '#membership' },
    { name: 'Events', href: '#events' },
    { name: 'Board', href: '#board' },
    { name: 'Contact', href: '#contact' }
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLDivElement>, href: string) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glass shadow-lg shadow-primary/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center cursor-pointer space-x-3"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              
              <motion.div
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/IEEE LOGO.png"
                  alt="IEEE Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
              </motion.div>
              <div className="text-2xl font-bold bg-primary-gradient bg-clip-text text-transparent">
                IEEE CS KITS
              </div>
            </div>

            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className={`relative px-3 py-2 text-sm font-bold uppercase transition-colors duration-300 cursor-pointer ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary-gradient bg-clip-text text-transparent' 
                        : 'text-white hover:text-primary'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-primary-gradient"
                      animate={{ width: activeSection === item.href.substring(1) ? '100%' : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="md:hidden ml-auto">
              <button
                className="text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="absolute right-0 top-0 h-full w-64 glass shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-20 px-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    className={`block w-full text-left py-4 text-lg font-bold uppercase transition-colors cursor-pointer ${
                      activeSection === item.href.substring(1)
                        ? 'bg-primary-gradient bg-clip-text text-transparent' 
                        : 'text-white hover:text-primary'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.name}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navigation
