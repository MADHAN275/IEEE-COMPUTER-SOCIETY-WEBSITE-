'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

interface BoardMember {
  name: string
  position: string
  image: string
  priority?: number
  description?: string
}

const BoardMemberCard = ({
  member,
  index,
  onClick,
}: {
  member: BoardMember
  index: number
  onClick: () => void
}) => {
  return (
    <motion.div
      className="glass p-6 rounded-3xl cursor-pointer transition-all duration-500 relative overflow-hidden"
      whileHover={{
        scale: 1.03,
        y: -5,
        boxShadow: '0 10px 30px rgba(255, 107, 0, 0.3)',
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden relative">
          <Image
            src={`/${member.image}`}
            alt={member.name}
            width={96}
            height={96}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              const img = e.target as HTMLImageElement
              img.style.display = 'none'
              const fallback = img.parentElement?.querySelector('.fallback-initials')
              if (fallback) {
                fallback.classList.remove('hidden')
              }
            }}
          />
          <div className="fallback-initials text-2xl font-bold text-primary hidden absolute inset-0 flex items-center justify-center">
            {member.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)}
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

const MemberPopup = ({
  member,
  onClose,
}: {
  member: BoardMember
  onClose: () => void
}) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass p-8 rounded-3xl max-w-4xl w-full flex flex-col md:flex-row items-start gap-8 relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Image
            src={`/${member.image}`}
            alt={member.name}
            width={300}
            height={300}
            className="w-full h-auto object-cover rounded-2xl shadow-lg"
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
          <p className="text-primary text-lg font-semibold mb-4">{member.position}</p>
          <div className="text-gray-300 space-y-2">
            <p>{member.description || 'No description available.'}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const BoardSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedMember, setSelectedMember] = useState<BoardMember | null>(null)

  const boardMembers: BoardMember[] = [
    // Faculty and Leadership
    { name: "Dr. J. Immanuel Johnraja", position: "HOD CSE", image: "Immanuel Johnraja - Head Of Division (CSE).jpeg", priority: 1, description: "Leads the Computer Science and Engineering department with a vision for academic excellence and innovation." },
    { name: "Dr. Naveen Sundar", position: "Faculty Counselor", image: "Dr.Naveen Sundar - Faculty Counselor.jpeg", priority: 2, description: "Guides and mentors the student branch, fostering a supportive environment for growth and learning." },
    
    // Executive Board
    { name: "Mr. Fanisus R", position: "President", image: "PRESIDENT_Mr_FANISUS_R.jpg", priority: 3, description: "Oversees all activities of the IEEE Computer Society student branch, ensuring alignment with IEEE goals." },
    { name: "Ms. D. Jerlin Seraphina", position: "Chair", image: "CHAIR Ms. D. JERLIN SERAPHINA.jpg", priority: 4, description: "Presides over meetings and works closely with the executive committee to manage student branch operations." },
    { name: "Ms. Charunetra NR", position: "Vice Chair", image: "VICE CHAIR Ms. CHARUNETRA NR.jpeg", priority: 5, description: "Assists the Chair in their duties and steps in to lead when necessary, focusing on member engagement." },
    { name: "Ms. Trina Joan Lynus", position: "Secretary", image: "SECRETARY Ms. TRINA JOAN LYNUS.jpg", priority: 6, description: "Maintains records of all meetings and handles official correspondence for the student branch." },
    { name: "Mr. Siva Sankar B", position: "Treasurer", image: "TREASURER Mr. SIVA SANKAR B.jpg", priority: 7, description: "Manages the financial accounts, budget, and expenditures of the student branch." },
    
    // Department Leads
    { name: "Mr. Madhan T", position: "Web Lead", image: "WEB LEAD Mr. MADHAN T.jpg", priority: 8, description: "Leads the development and maintenance of the student branch's web presence." },
    { name: "Mr. Anto Melvin A", position: "Program Lead", image: "PROGRAM LEAD Mr. ANTO MELVIN A.jpeg", priority: 9, description: "Organizes and coordinates technical and non-technical programs and events." },
    { name: "Ms. Mershiya", position: "Social Media Lead", image: "SOCIAL MEDIA LEAD Ms. MERSHIYA.jpg", priority: 10, description: "Manages the student branch's social media channels to promote events and engage with the community." },
    { name: "Ms. Lizania Dew K", position: "Documentation Lead", image: "DOCUMENTATION LEAD Ms. LIZANIA DEW K.jpg", priority: 11, description: "Responsible for creating and managing all official documentation for the student branch." },
    { name: "Ms. Priya Dharshini S", position: "IEEE Interface Lead", image: "IEEE INTERFACE LEAD Ms. PRIYA DHARSHINI S.jpg", priority: 12, description: "Acts as the primary liaison between the student branch and the main IEEE organization." },
    { name: "Ms. Jenefa Jeromi J", position: "Student Activities Coordinator", image: "STUDENT ACTIVITIES COORDINATOR Ms. JENEFA JEROMI J.jpg", priority: 13, description: "Coordinates various student-focused activities and initiatives to enhance member experience." },
    { name: "Mr. V Sremadukrishna", position: "Outreach & CSR Lead", image: "OUTREACH & CSR LEAD Mr. V SREMADUKRISHNA.jpg", priority: 16, description: "Leads community outreach programs and corporate social responsibility initiatives." },
    { name: "Ms. Nandana Nandakumar E N", position: "Training and Workshop Lead", image: "TRAINING AND WORKSHOP LEAD Ms. NANDANA NANDAKUMAR E N.PNG", priority: 17, description: "Organizes workshops and training sessions to enhance the technical skills of members." },
    { name: "Mr. Rishi Jayanath A", position: "Innovation and Research Lead", image: "INNOVATION AND RESEARCH LEAD Mr. RISHI JAYANATH A.jpg", priority: 18, description: "Promotes a culture of innovation and research among members through projects and competitions." },
    { name: "Mr. Johann Shoni George", position: "Sponsorship and Partnership Lead", image: "SPONSORSHIP AND PARTNERSHIP LEAD Mr. JOHANN SHONI GEORGE.jpeg", priority: 19, description: "Secures sponsorships and builds partnerships with industry to support student branch activities." },
    { name: "Mr. Febin K Renu", position: "Alumni and Industry Relation Lead", image: "ALUMNI AND INDUSTRY RELATION LEAD Mr. FEBIN K RENU.jpeg", priority: 20, description: "Manages relationships with alumni and industry professionals to create networking opportunities." },
    { name: "Mr. Adwaith Sajikumar", position: "Development Lead", image: "DEVELOPMENT LEAD Mr. ADWAITH SAJIKUMAR.jpg", priority: 21, description: "Leads software development projects and technical initiatives within the student branch." },
    { name: "Mr. Harish R", position: "Membership Chair", image: "MEMBERSHIP CHAIR Mr. HARISH R.jpg", priority: 22, description: "Manages the recruitment and retention of members, ensuring a vibrant and active community." },
    { name: "Ms. Rebi Jael B", position: "Women in Engineering Lead", image: "WOMEN IN ENGINEERING LEAD Ms. REBI JAEL B.jpeg", priority: 23, description: "Leads initiatives to promote women in engineering and technology fields." },
    { name: "Ms. Saro Franzika C S", position: "Technical Event Lead", image: "TECHNICAL EVENT LEAD Ms. SARO FRANZIKA C S.jpeg", priority: 26, description: "Focuses on organizing and executing high-quality technical events and competitions." },
    { name: "Mr. Kingston Y C", position: "Poster and Video Editor", image: "POSTER AND VIDEO EDITOR Mr. KINGSTON Y C.jpg", priority: 27, description: "Creates engaging visual content, including posters and videos, to promote student branch activities." }
  ]

  const sortedMembers = boardMembers.sort((a, b) => (a.priority || 0) - (b.priority || 0))
  const facultyMembers = sortedMembers.filter((m) => m.priority && m.priority <= 2)
  const studentMembers = sortedMembers.filter((m) => m.priority && m.priority > 2)
  const executiveMembers = studentMembers.slice(0, 5)
  const teamLeadMembers = studentMembers.slice(5)

  const openPopup = (member: BoardMember) => {
    setSelectedMember(member)
  }

  const closePopup = () => {
    setSelectedMember(null)
  }

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
            OUR LEADERSHIP TEAM
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
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">FACULTY ADVISORS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {facultyMembers.map((member, index) => (
              <BoardMemberCard
                key={`faculty-${index}`}
                member={member}
                index={index}
                onClick={() => openPopup(member)}
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
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">EXECUTIVE BOARD</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {executiveMembers.map((member, index) => (
              <BoardMemberCard
                key={`executive-${index}`}
                member={member}
                index={index + facultyMembers.length}
                onClick={() => openPopup(member)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">TEAM LEADS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamLeadMembers.map((member, index) => (
              <BoardMemberCard
                key={`team-lead-${index}`}
                member={member}
                index={index + facultyMembers.length + executiveMembers.length}
                onClick={() => openPopup(member)}
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
          <Link href="#contact">
            <motion.button
              className="interactive px-8 py-3 bg-primary-gradient text-black font-semibold rounded-full hover:shadow-orange-glow transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Involved
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMember && (
          <MemberPopup member={selectedMember} onClose={closePopup} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default BoardSection
