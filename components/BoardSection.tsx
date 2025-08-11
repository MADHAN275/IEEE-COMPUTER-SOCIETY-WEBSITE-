'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BoardCarousel3D from './3D/BoardCarousel3D'

interface BoardMember {
  name: string
  position: string
  image: string
  priority?: number
}

const BoardMemberCard = ({ 
  member, 
  index, 
  isActive, 
  onClick 
}: { 
  member: BoardMember
  index: number
  isActive: boolean
  onClick: () => void
}) => {
  return (
    <motion.div
      className={`glass p-6 rounded-3xl cursor-pointer transition-all duration-500 relative overflow-hidden ${
        isActive ? 'ring-2 ring-primary shadow-orange-glow' : ''
      }`}
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        rotateY: 5 
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden relative">
          <img 
            src={`/${member.image}`} 
            alt={member.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = 'none';
              const fallback = img.parentElement?.querySelector('.fallback-initials');
              if (fallback) {
                fallback.classList.remove('hidden');
              }
            }}
          />
          <div className="fallback-initials text-2xl font-bold text-primary hidden absolute inset-0 flex items-center justify-center">
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-white text-center mb-2 line-clamp-2">
          {member.name}
        </h3>
        
        <p className="text-primary text-sm text-center font-semibold mb-3 line-clamp-2">
          {member.position}
        </p>
        
        <motion.div
          className="absolute inset-0 bg-primary-gradient opacity-0 rounded-3xl"
          whileHover={{ opacity: 0.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  )
}

const BoardSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeIndex, setActiveIndex] = useState(0)

  const boardMembers: BoardMember[] = [
    // Faculty and Leadership
    { name: "Dr. J. Immanuel Johnraja", position: "HOD CSE", image: "Immanuel Johnraja - Head Of Division (CSE).jpeg", priority: 1 },
    { name: "Dr. Naveen Sundar", position: "Faculty Counselor", image: "Dr.Naveen Sundar - Faculty Counselor.jpeg", priority: 2 },
    
    // Executive Board
    { name: "Mr. Fanisus R", position: "President", image: "PRESIDENT_Mr_FANISUS_R.jpg", priority: 3 },
    { name: "Ms. D. Jerlin Seraphina", position: "Chair", image: "CHAIR Ms. D. JERLIN SERAPHINA.jpg", priority: 4 },
    { name: "Ms. Charunetra NR", position: "Vice Chair", image: "VICE CHAIR Ms. CHARUNETRA NR.jpeg", priority: 5 },
    { name: "Ms. Trina Joan Lynus", position: "Secretary", image: "SECRETARY Ms. TRINA JOAN LYNUS.jpg", priority: 6 },
    { name: "Mr. Siva Sankar B", position: "Treasurer", image: "TREASURER Mr. SIVA SANKAR B.jpg", priority: 7 },
    
    // Department Leads - In specified order
    { name: "Mr. Madhan T", position: "Web Lead", image: "WEB LEAD Mr. MADHAN T.jpg", priority: 8 },
    { name: "Mr. Anto Melvin A", position: "Program Lead", image: "PROGRAM LEAD Mr. ANTO MELVIN A.jpeg", priority: 9 },
    { name: "Ms. Mershiya", position: "Social Media Lead", image: "SOCIAL MEDIA LEAD Ms. MERSHIYA.jpg", priority: 10 },
    { name: "Ms. Lizania Dew K", position: "Documentation Lead", image: "DOCUMENTATION LEAD Ms. LIZANIA DEW K.jpg", priority: 11 },
    { name: "Ms. Priya Dharshini S", position: "IEEE Interface Lead", image: "IEEE INTERFACE LEAD Ms. PRIYA DHARSHINI S.jpg", priority: 12 },
    { name: "Ms. Jenefa Jeromi J", position: "Student Activities Coordinator", image: "STUDENT ACTIVITIES COORDINATOR Ms. JENEFA JEROMI J.jpg", priority: 13 },
    { name: "Mr. Joy James Swamy", position: "Volunteer Coordinator", image: "VOLUNTEER COORDINATOR Mr. JOY JAMES SWAMY.jpg", priority: 14 },
    { name: "Mr. Jason B", position: "Logistics Lead", image: "LOGISTICS LEAD Mr. JASON B.jpg", priority: 15 },
    { name: "Mr. V Sremadukrishna", position: "Outreach & CSR Lead", image: "OUTREACH & CSR LEAD Mr. V SREMADUKRISHNA.jpg", priority: 16 },
    { name: "Ms. Nandana Nandakumar E N", position: "Training and Workshop Lead", image: "TRAINING AND WORKSHOP LEAD Ms. NANDANA NANDAKUMAR E N.PNG", priority: 17 },
    { name: "Mr. Rishi Jayanath A", position: "Innovation and Research Lead", image: "INNOVATION AND RESEARCH LEAD Mr. RISHI JAYANATH A.jpg", priority: 18 },
    { name: "Mr. Johann Shoni George", position: "Sponsorship and Partnership Lead", image: "SPONSORSHIP AND PARTNERSHIP LEAD Mr. JOHANN SHONI GEORGE.jpeg", priority: 19 },
    { name: "Mr. Febin K Renu", position: "Alumni and Industry Relation Lead", image: "ALUMNI AND INDUSTRY RELATION LEAD Mr. FEBIN K RENU.jpeg", priority: 20 },
    { name: "Mr. Adwaith Sajikumar", position: "Development Lead", image: "DEVELOPMENT LEAD Mr. ADWAITH SAJIKUMAR.jpg", priority: 21 },
    { name: "Mr. Harish R", position: "Membership Chair", image: "MEMBERSHIP CHAIR Mr. HARISH R.jpg", priority: 22 },
    { name: "Ms. Rebi Jael B", position: "Women in Engineering Lead", image: "WOMEN IN ENGINEERING LEAD Ms. REBI JAEL B.jpeg", priority: 23 },
    { name: "Ms. Athira Arun", position: "Content Lead", image: "CONTENT LEAD Ms. ATHIRA ARUN.jpg", priority: 24 },
    { name: "Ms. Atishaya S I", position: "Newsletter and Magazine Lead", image: "NEWSLETTER AND MAGANIZE LEAD Ms. ATISHAYA S I.jpg", priority: 25 },
    { name: "Ms. Saro Franzika C S", position: "Technical Event Lead", image: "TECHNICAL EVENT LEAD Ms. SARO FRANZIKA C S.jpeg", priority: 26 },
    { name: "Mr. Kingston Y C", position: "Poster and Video Editor", image: "POSTER AND VIDEO EDITOR Mr. KINGSTON Y C.jpg", priority: 27 }
  ]

  // Separate faculty from students
  const sortedMembers = boardMembers.sort((a, b) => (a.priority || 0) - (b.priority || 0))
  const facultyMembers = sortedMembers.filter(m => m.priority && m.priority <= 2)
  const studentMembers = sortedMembers.filter(m => m.priority && m.priority > 2)

  return (
    <section id="board" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            Our Leadership Team
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Meet the dedicated professionals driving IEEE Computer Society KITS forward
          </p>
        </motion.div>

        {/* Faculty Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">Faculty Advisors</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {facultyMembers.map((member, index) => (
              <BoardMemberCard
                key={`faculty-${index}`}
                member={member}
                index={index}
                isActive={activeIndex === index}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Student Board Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">Student Board Members</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {studentMembers.map((member, index) => (
              <BoardMemberCard
                key={`student-${index}`}
                member={member}
                index={index + facultyMembers.length}
                isActive={activeIndex === index + facultyMembers.length}
                onClick={() => setActiveIndex(index + facultyMembers.length)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6">
            Interested in joining our leadership team?
          </p>
          <motion.button
            className="interactive px-8 py-3 bg-primary-gradient text-black font-semibold rounded-full hover:shadow-orange-glow transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Involved
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default BoardSection