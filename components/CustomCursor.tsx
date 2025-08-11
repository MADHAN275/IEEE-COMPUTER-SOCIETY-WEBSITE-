'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.matches('button, a, .interactive')) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <motion.div
      className={`fixed pointer-events-none z-[9999] mix-blend-difference ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      animate={{
        x: mousePosition.x - 10,
        y: mousePosition.y - 10,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        scale: { duration: 0.2 }
      }}
    >
      <div className="w-5 h-5 bg-primary rounded-full opacity-80" />
      <motion.div
        className="absolute inset-0 bg-primary rounded-full opacity-20"
        animate={{
          scale: isHovering ? 2 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default CustomCursor