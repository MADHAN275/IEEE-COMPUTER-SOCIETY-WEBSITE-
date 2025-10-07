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
    { name: "Dr. J. Immanuel Johnraja", position: "HOD CSE", image: "Immanuel Johnraja - Head Of Division (CSE).jpeg", priority: 1, description: "As the Head of the Computer Science and Engineering department, Dr. J. Immanuel Johnraja inspires academic excellence and innovation. He leads the department's strategic vision, fostering a dynamic learning environment and mentoring faculty and students to advance the field of computing." },
    { name: "Dr. Naveen Sundar", position: "Faculty Counselor", image: "Dr.Naveen Sundar - Faculty Counselor.jpeg", priority: 2, description: "As Faculty Counselor, Dr. Naveen Sundar provides guidance and support to the IEEE student branch. He mentors student leaders, facilitates industry connections, and ensures the branch's activities align with the educational and professional development goals of the members." },
    
    // Executive Board
    { name: "Mr. Fanisus R", position: "President", image: "PRESIDENT_Mr_FANISUS_R.jpg", priority: 3, description: "As President, Mr. Fanisus R leads the IEEE Student Chapter, inspiring members to explore computing and emerging technologies. He drives strategic initiatives, organizes workshops and hackathons, and mentors students to build technical skills, collaboration, and a thriving tech community on campus.<br><br>IEEE ID - 100105414" },
    { name: "Ms. D. Jerlin Seraphina", position: "Chair", image: "CHAIR Ms. D. JERLIN SERAPHINA.jpg", priority: 4, description: "As Chair, Ms. D. Jerlin Seraphina presides over the student branch, guiding its overall direction and initiatives. She fosters a collaborative environment, empowers committee members, and ensures that the branch delivers impactful programs and opportunities for all members.<br><br>IEEE ID - 100131873" },
    { name: "Ms. Charunetra NR", position: "Vice Chair", image: "VICE CHAIR Ms. CHARUNETRA NR.jpeg", priority: 5, description: "As Vice Chair, Ms. Charunetra NR supports the Chair in leading the student branch and spearheads key initiatives. She focuses on member engagement, program development, and building a vibrant and inclusive community of aspiring engineers and innovators.<br><br>IEEE ID - 101044802" },
    { name: "Ms. Trina Joan Lynus", position: "Secretary", image: "SECRETARY Ms. TRINA JOAN LYNUS.jpg", priority: 6, description: "As Secretary, Ms. Trina Joan Lynus manages the administrative and organizational aspects of the student branch. She maintains records, facilitates communication, and ensures the smooth execution of meetings and events, playing a vital role in the branch's efficiency.<br><br>IEEE ID - 100036936" },
    { name: "Mr. Siva Sankar B", position: "Treasurer", image: "TREASURER Mr. SIVA SANKAR B.jpg", priority: 7, description: "As Treasurer, Mr. Siva Sankar B oversees the financial health of the student branch. He manages the budget, tracks expenses, and ensures financial transparency, enabling the branch to fund its various activities and initiatives responsibly.<br><br>IEEE ID - 101508717" },
    
    // Department Leads
    { name: "Mr. Madhan T", position: "Web Lead", image: "WEB LEAD Mr. MADHAN T.jpg", priority: 8, description: "As Web Lead, Mr. Madhan T drives the development and maintenance of the student branch's digital presence. He leads the web team to create a user-friendly and informative website, ensuring that the online platform effectively serves the needs of the members and the community.<br><br>IEEE ID - 101511633" },
    { name: "Mr. Anto Melvin A", position: "Program Lead", image: "PROGRAM LEAD Mr. ANTO MELVIN A.jpeg", priority: 9, description: "As Program Lead, Mr. Anto Melvin A curates and organizes a diverse range of technical and professional development programs. He identifies relevant topics, secures speakers, and designs engaging events that provide valuable learning experiences for members.<br><br>IEEE ID - 101508103" },
    { name: "Ms. Mershiya", position: "Social Media Lead", image: "SOCIAL MEDIA LEAD Ms. MERSHIYA.jpg", priority: 10, description: "As Social Media Lead, Ms. Mershiya crafts and executes the student branch's social media strategy. She creates engaging content, manages online campaigns, and interacts with the community to build a strong and active presence on various platforms.<br><br>IEEE ID - 101527393" },
    { name: "Ms. Lizania Dew K", position: "Documentation Lead", image: "DOCUMENTATION LEAD Ms. LIZANIA DEW K.jpg", priority: 11, description: "As Documentation Lead, Ms. Lizania Dew K is responsible for capturing and archiving the student branch's activities and achievements. She ensures that all events, projects, and meetings are well-documented, creating a valuable historical record for the branch.<br><br>IEEE ID - 101523419" },
    { name: "Ms. Priya Dharshini S", position: "IEEE Interface Lead", image: "IEEE INTERFACE LEAD Ms. PRIYA DHARSHINI S.jpg", priority: 12, description: "As IEEE Interface Lead, Ms. Priya Dharshini S serves as the primary link between the student branch and the broader IEEE organization. She facilitates communication, ensures compliance with IEEE standards, and connects members with global resources and opportunities.<br><br>IEEE ID - 101523479" },
    { name: "Ms. Jenefa Jeromi J", position: "Student Activities Coordinator", image: "STUDENT ACTIVITIES COORDINATOR Ms. JENEFA JEROMI J.jpg", priority: 13, description: "As Student Activities Coordinator, Ms. Jenefa Jeromi J plans and executes a variety of engaging activities for members. She works to create a vibrant campus community by organizing social events, networking sessions, and other initiatives that enhance the student experience.<br><br>IEEE ID - 101523308" },
    { name: "Mr. V Sremadukrishna", position: "Outreach & CSR Lead", image: "OUTREACH & CSR LEAD Mr. V SREMADUKRISHNA.jpg", priority: 16, description: "As Outreach & CSR Lead, Mr. V Sremadukrishna spearheads the student branch's community engagement and social responsibility initiatives. He develops and implements programs that leverage technology for social good, fostering a sense of civic duty among members.<br><br>IEEE ID - 100713549" },
    { name: "Ms. Nandana Nandakumar E N", position: "Training and Workshop Lead", image: "TRAINING AND WORKSHOP LEAD Ms. NANDANA NANDAKUMAR E N.PNG", priority: 17, description: "As Training and Workshop Lead, Ms. Nandana Nandakumar E N designs and delivers hands-on training sessions and workshops. She identifies skill gaps, develops relevant curriculum, and empowers members with practical knowledge and technical expertise.<br><br>IEEE ID - 101537877" },
    { name: "Mr. Rishi Jayanath A", position: "Innovation and Research Lead", image: "INNOVATION AND RESEARCH LEAD Mr. RISHI JAYANATH A.jpg", priority: 18, description: "As Innovation and Research Lead, Mr. Rishi Jayanath A champions a culture of innovation and inquiry within the student branch. He encourages members to pursue research projects, participate in competitions, and explore emerging technologies to solve real-world problems.<br><br>IEEE ID - 101545539" },
    { name: "Mr. Johann Shoni George", position: "Sponsorship and Partnership Lead", image: "SPONSORSHIP AND PARTNERSHIP LEAD Mr. JOHANN SHONI GEORGE.jpeg", priority: 19, description: "As Sponsorship and Partnership Lead, Mr. Johann Shoni George builds and maintains relationships with industry partners and sponsors. He secures funding and resources to support the student branch's activities, creating valuable connections between students and the professional world.<br><br>IEEE ID - 100105390" },
    { name: "Mr. Febin K Renu", position: "Alumni and Industry Relation Lead", image: "ALUMNI AND INDUSTRY RELATION LEAD Mr. FEBIN K RENU.jpeg", priority: 20, description: "As Alumni and Industry Relation Lead, Mr. Febin K Renu fosters a strong network of alumni and industry professionals. He creates mentorship opportunities, organizes networking events, and facilitates career development for students by connecting them with experienced professionals.<br><br>IEEE ID - 101545251" },
    { name: "Mr. Adwaith Sajikumar", position: "Development Lead", image: "DEVELOPMENT LEAD Mr. ADWAITH SAJIKUMAR.jpg", priority: 21, description: "As Development Lead, Mr. Adwaith Sajikumar oversees the technical projects and software development initiatives of the student branch. He mentors student developers, manages project timelines, and ensures the delivery of high-quality, innovative solutions.<br><br>IEEE ID - 101545482" },
    { name: "Mr. Harish R", position: "Membership Chair", image: "MEMBERSHIP CHAIR Mr. HARISH R.jpg", priority: 22, description: "As Membership Chair, Mr. Harish R is responsible for the recruitment, retention, and engagement of members. He develops strategies to grow the student branch community and ensures that all members feel welcomed, valued, and connected.<br><br>IEEE ID - 101070229" },
    { name: "Ms. Rebi Jael B", position: "Women in Engineering Lead", image: "WOMEN IN ENGINEERING LEAD Ms. REBI JAEL B.jpeg", priority: 23, description: "As Women in Engineering Lead, Ms. Rebi Jael B champions the inclusion and advancement of women in technology. She organizes events, mentorship programs, and support networks that empower female students and promote diversity in the engineering field.<br><br>IEEE ID - 101038770" },
    { name: "Ms. Saro Franzika C S", position: "Technical Event Lead", image: "TECHNICAL EVENT LEAD Ms. SARO FRANZIKA C S.jpeg", priority: 26, description: "As Technical Event Lead, Ms. Saro Franzika C S plans and executes a wide range of technical events, from workshops to hackathons. She is dedicated to providing members with hands-on learning experiences and opportunities to showcase their skills.<br><br>IEEE ID - 101530037" },
    { name: "Mr. Kingston Y C", position: "Poster and Video Editor", image: "POSTER AND VIDEO EDITOR Mr. KINGSTON Y C.jpg", priority: 27, description: "As Poster and Video Editor, Mr. Kingston Y C is the creative force behind the student branch's visual communications. He designs eye-catching posters, produces engaging videos, and uses his artistic skills to promote events and tell the story of the IEEE community.<br><br>IEEE ID - 101047837" }
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
