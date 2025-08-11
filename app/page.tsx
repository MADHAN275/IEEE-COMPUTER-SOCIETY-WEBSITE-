'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import CustomCursor from '@/components/CustomCursor'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor')
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const cursor = document.getElementById('custom-cursor')
      const target = e.target as HTMLElement
      
      if (cursor && target.matches('button, a, .interactive')) {
        cursor.classList.add('hover')
      }
    }

    const handleMouseOut = () => {
      const cursor = document.getElementById('custom-cursor')
      if (cursor) {
        cursor.classList.remove('hover')
      }
    }

    if (!isLoading) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseover', handleMouseOver)
      document.addEventListener('mouseout', handleMouseOut)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [isLoading])

  return (
    <PageTransition isLoading={isLoading}>
      <main className="min-h-screen bg-black text-white relative">
        <Navigation />
        <CustomCursor />
        
        <HeroSection />

        <footer className="py-8 px-4 border-t border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-gray-400 mb-4">
              © 2025 IEEE Computer Society KITS. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Empowering the People Who Drive Technology
            </p>
          </div>
        </footer>
      </main>
    </PageTransition>
  )
}