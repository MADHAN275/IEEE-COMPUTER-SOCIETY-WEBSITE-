'use client'

import Navigation from '@/components/Navigation'
import ContactSection from '@/components/ContactSection'
import CustomCursor from '@/components/CustomCursor'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navigation />
      <CustomCursor />
      
      <div className="pt-20">
        <ContactSection />
      </div>

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
  )
}