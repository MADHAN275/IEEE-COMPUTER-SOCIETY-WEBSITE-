'use client'

import Navigation from '@/components/Navigation'
import BoardSection from '@/components/BoardSection'

export default function BoardPage() {
  return (
    <main className="min-h-screen bg-black text-white relative">
      <Navigation />
      
      <div className="pt-20">
        <BoardSection />
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