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
            onError={(e) => {
                const img = e.target as HTMLImageElement
                img.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNlMGUwZTAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9ImFyaWFsIiBmb250LXNpemU9IjQwIiBmaWxsPSIjY2NjIj5JbWFnZTwvdGV4dD48L3N2Zz4='
            }}
          />
        </div>
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
          <p className="text-primary text-lg font-semibold mb-4">{member.position}</p>
          <div className="text-gray-300 space-y-2" dangerouslySetInnerHTML={{ __html: member.description || 'No description available.' }} />
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
    { name: "Dr. J. Immanuel Johnraja", position: "HOD CSE", image: "images/board/Immanuel Johnraja - Head Of Division (CSE).jpeg", priority: 1, description: "As the Head of the Computer Science and Engineering department, Dr. J. Immanuel Johnraja inspires academic excellence and innovation. He leads the department's strategic vision, fostering a dynamic learning environment and mentoring faculty and students to advance the field of computing." },
    { name: "Dr. Naveen Sundar", position: "Faculty Counselor", image: "images/board/Dr.Naveen Sundar - Faculty Counselor.jpeg", priority: 2, description: "As Faculty Counselor, Dr. Naveen Sundar provides guidance and support to the IEEE student branch. He mentors student leaders, facilitates industry connections, and ensures the branch's activities align with the educational and professional development goals of the members." },
    
    // Executive Committee
    { name: "Mr. V Sremadukrishna", position: "President & Program Lead", image: "images/board/OUTREACH & CSR LEAD Mr. V SREMADUKRISHNA.jpg", priority: 3, description: "As President & Program Lead, Mr. V Sremadukrishna leads the IEEE Student Chapter, curating and organizing a diverse range of technical and professional development programs. He drives strategic initiatives, organizes workshops and hackathons, and mentors students to build technical skills, collaboration, and a thriving tech community on campus." },
    { name: "Ms. Nandana Nandakumar E N", position: "Chairman", image: "images/board/TRAINING AND WORKSHOP LEAD Ms. NANDANA NANDAKUMAR E N.PNG", priority: 4, description: "As Chairman, Ms. Nandana Nandakumar E N presides over the student branch, guiding its overall direction and initiatives. She fosters a collaborative environment, empowers committee members, and ensures that the branch delivers impactful programs and opportunities for all members." },
    { name: "Ms. Jenefa Jeromi J", position: "Secretary", image: "images/board/STUDENT ACTIVITIES COORDINATOR Ms. JENEFA JEROMI J.jpg", priority: 5, description: "As Secretary, Ms. Jenefa Jeromi J manages the administrative and organizational aspects of the student branch. She maintains records, facilitates communication, and ensures the smooth execution of meetings and events, playing a vital role in the branch's efficiency." },
    // TODO: Add the image for Ms. Shivali
    { name: "Ms. Shivali", position: "Special Advisor", image: "images/board/Ms. SHIVALI.jpeg", priority: 6, description: "As Special Advisor, Ms. Shivali provides strategic guidance and mentorship to the committee, drawing from her experience and expertise to support the chapter's growth and success." },
    { name: "Ms. Charunetra NR", position: "Vice Chair", image: "images/board/VICE CHAIR Ms. CHARUNETRA NR.jpeg", priority: 11, description: "As Past Vice Chair, Ms. Charunetra NR supported the Chair in leading the student branch and spearheaded key initiatives." },
    { name: "Mr. Siva Sankar B", position: "Treasurer", image: "images/board/TREASURER Mr. SIVA SANKAR B.jpg", priority: 12, description: "As Past Treasurer, Mr. Siva Sankar B oversaw the financial health of the student branch." },

    // Domain-Focused Leadership
    { name: "Mr. Fanisus R", position: "Lead for Product Development", image: "images/board/PRESIDENT_Mr_FANISUS_R.jpg", priority: 7, description: "As Lead for Product Development, Mr. Fanisus R spearheads initiatives focused on creating and developing innovative tech products, guiding teams from concept to launch." },
    { name: "Ms. D. Jerlin Seraphina", position: "Lead for Product Development", image: "images/board/CHAIR Ms. D. JERLIN SERAPHINA.jpg", priority: 8, description: "As Lead for Product Development, Ms. D. Jerlin Seraphina co-leads product development projects, fostering a culture of innovation and hands-on learning." },
    { name: "Ms. Trina Joan Lynus", position: "Lead for Research & Publications", image: "images/board/SECRETARY Ms. TRINA JOAN LYNUS.jpeg", priority: 9, description: "As Lead for Research & Publications, Ms. Trina Joan Lynus promotes a culture of academic inquiry, guiding members in research projects and scholarly publications." },
    { name: "Mr. Anto Melvin A", position: "Lead for Research & Publications", image: "images/board/PROGRAM LEAD Mr. ANTO MELVIN A.jpeg", priority: 10, description: "As Lead for Research & Publications, Mr. Anto Melvin A co-leads research initiatives, helping students to explore and contribute to the latest advancements in technology." },

    
    // Team Leads
    { name: "Mr. Madhan T", position: "Web Lead", image: "images/board/WEB LEAD Mr. MADHAN T.jpg", priority: 13, description: "As Web Lead, Mr. Madhan T drives the development and maintenance of the student branch's digital presence." },
    { name: "Ms. Mershiya", position: "Social Media Lead", image: "images/board/SOCIAL MEDIA LEAD Ms. MERSHIYA.jpg", priority: 14, description: "As Social Media Lead, Ms. Mershiya crafts and executes the student branch's social media strategy." },
    { name: "Mr. Rishi Jayanath A", position: "Innovation and Research Lead", image: "images/board/INNOVATION AND RESEARCH LEAD Mr. RISHI JAYANATH A.jpg", priority: 15, description: "As Innovation and Research Lead, Mr. Rishi Jayanath A champions a culture of innovation and inquiry within the student branch." },
    { name: "Mr. Johann Shoni George", position: "Sponsorship and Partnership Lead", image: "images/board/SPONSORSHIP AND PARTNERSHIP LEAD Mr. JOHANN SHONI GEORGE.jpeg", priority: 16, description: "As Sponsorship and Partnership Lead, Mr. Johann Shoni George builds and maintains relationships with industry partners and sponsors." },
    { name: "Mr. Febin K Renu", position: "Alumni and Industry Relation Lead", image: "images/board/ALUMNI AND INDUSTRY RELATION LEAD Mr. FEBIN K RENU.jpeg", priority: 17, description: "As Alumni and Industry Relation Lead, Mr. Febin K Renu fosters a strong network of alumni and industry professionals." },
    { name: "Mr. Adwaith Sajikumar", position: "Development Lead", image: "images/board/DEVELOPMENT LEAD Mr. ADWAITH SAJIKUMAR.jpg", priority: 18, description: "As Development Lead, Mr. Adwaith Sajikumar oversees the technical projects and software development initiatives of the student branch." },
    { name: "Mr. Harish R", position: "Membership Chair", image: "images/board/MEMBERSHIP CHAIR Mr. HARISH R.jpg", priority: 19, description: "As Membership Chair, Mr. Harish R is responsible for the recruitment, retention, and engagement of members." },
    { name: "Ms. Rebi Jael B", position: "Women in Engineering Lead", image: "images/board/WOMEN IN ENGINEERING LEAD Ms. REBI JAEL B.jpeg", priority: 20, description: "As Women in Engineering Lead, Ms. Rebi Jael B champions the inclusion and advancement of women in technology." },
    { name: "Ms. Saro Franzika C S", "position": "Technical Event Lead", image: "images/board/TECHNICAL EVENT LEAD Ms. SARO FRANZIKA C S.jpeg", priority: 21, description: "As Technical Event Lead, Ms. Saro Franzika C S plans and executes a wide range of technical events." },
    { name: "Mr. Kingston Y C", position: "Poster and Video Editor", image: "images/board/POSTER AND VIDEO EDITOR Mr. KINGSTON Y C.jpg", priority: 22, description: "As Poster and Video Editor, Mr. Kingston Y C is the creative force behind the student branch's visual communications." }
  ]

  const sortedMembers = boardMembers.sort((a, b) => (a.priority || 0) - (b.priority || 0))
  const facultyMembers = sortedMembers.filter((m) => m.position.includes('HOD') || m.position.includes('Counselor'))
  const executiveCommittee = sortedMembers.filter(
    (m) => (m.priority && m.priority >= 3 && m.priority <= 12 && ![7, 8, 9, 10].includes(m.priority)) 
  )
  const domainLeads = sortedMembers.filter((m) => m.priority && m.priority >= 7 && m.priority <= 10)
  const teamLeads = sortedMembers.filter((m) => m.priority && m.priority > 12 && !m.position.includes('Past'))


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
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            OUR LEADERSHIP TEAM
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
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

        {/* Executive Committee Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">EXECUTIVE COMMITTEE</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {executiveCommittee.map((member, index) => (
              <BoardMemberCard
                key={`executive-${index}`}
                member={member}
                index={index + facultyMembers.length}
                onClick={() => openPopup(member)}
              />
            ))}
          </div>
        </motion.div>

        {/* Domain-Focused Leadership Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">DOMAIN-FOCUSED LEADERSHIP</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {domainLeads.map((member, index) => (
              <BoardMemberCard
                key={`domain-${index}`}
                member={member}
                index={index + facultyMembers.length + executiveCommittee.length}
                onClick={() => openPopup(member)}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Team Leads Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <h3 className="text-3xl font-bold text-center mb-8 text-primary">TEAM LEADS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamLeads.map((member, index) => (
              <BoardMemberCard
                key={`team-lead-${index}`}
                member={member}
                index={index + facultyMembers.length + executiveCommittee.length + domainLeads.length}
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