
'use client'

import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import BoardSection from '@/components/BoardSection'
import MembershipSection from '@/components/MembershipSection'
import EventsSection from '@/components/EventsSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative w-full">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <MembershipSection />
      <EventsSection />
      <BoardSection />
      <ContactSection />

      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 mb-4">
            © 2025 KITS. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            EMPOWERING THE PEOPLE WHO DRIVE TECHNOLOGY
          </p>
        </div>
      </footer>
    </main>
  )
}
