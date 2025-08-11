'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Membership', href: '/membership' },
    { name: 'Board', href: '/board' },
    { name: 'Contact', href: '/contact' }
  ]

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
            <Link href="/">
              <motion.div
                className="flex items-center cursor-pointer space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <img 
                  src="/IEEE LOGO.png" 
                  alt="IEEE Logo" 
                  className="h-10 w-10 object-contain"
                />
                <div className="text-2xl font-bold bg-primary-gradient bg-clip-text text-transparent">
                  IEEE CS KITS
                </div>
              </motion.div>
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item, index) => (
                  <Link key={item.name} href={item.href}>
                    <motion.div
                      className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 cursor-pointer ${
                        pathname === item.href 
                          ? 'text-primary' 
                          : 'text-white hover:text-primary'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.name}
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-primary-gradient"
                        initial={{ width: pathname === item.href ? '100%' : 0 }}
                        whileHover={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden">
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
                  <Link key={item.name} href={item.path}>
                    <motion.div
                      className={`block w-full text-left py-4 text-lg font-medium transition-colors cursor-pointer ${
                        pathname === item.path 
                          ? 'text-primary' 
                          : 'text-white hover:text-primary'
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </motion.div>
                  </Link>
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