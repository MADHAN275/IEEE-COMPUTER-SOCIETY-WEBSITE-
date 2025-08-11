'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
  reducedMotion: boolean
  highContrast: boolean
  fontSize: 'normal' | 'large' | 'extra-large'
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void
}

const AccessibilityContext = createContext<AccessibilityContextType>({
  reducedMotion: false,
  highContrast: false,
  fontSize: 'normal',
  setFontSize: () => {}
})

export const useAccessibility = () => useContext(AccessibilityContext)

export const AccessibilityProvider = ({ children }: { children: React.ReactNode }) => {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    
    setReducedMotion(mediaQuery.matches)
    setHighContrast(contrastQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    const handleContrastChange = (e: MediaQueryListEvent) => setHighContrast(e.matches)
    
    mediaQuery.addEventListener('change', handleMotionChange)
    contrastQuery.addEventListener('change', handleContrastChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      contrastQuery.removeEventListener('change', handleContrastChange)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize)
  }, [fontSize])

  return (
    <AccessibilityContext.Provider value={{
      reducedMotion,
      highContrast,
      fontSize,
      setFontSize
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}