'use client'

import { useRouter, useParams } from 'next/navigation'
import { Canvas } from '@react-three/fiber'
import FloatingIcons from '@/components/3D/FloatingIcons'
import { motion } from 'framer-motion'

const EventDetailsPage = () => {
  const router = useRouter()
  const params = useParams()
  const eventName = params.eventName as string

  // Replace spaces with dashes for URL compatibility
  const formattedEventName = eventName.replace(/-/g, ' ').toUpperCase();
  console.log('formattedEventName', formattedEventName);


  const eventDetails = {
    'CODE QUEST': {
      title: 'Code Quest',
      date: '12.09.2025',
      description: `The IEEE Computer Society of Karunya Institute of Technology and Sciences hosted Code Quest, a competitive C programming challenge conducted as part of the IEEE Day Freshers Event. The contest was held on CodeLab, a student-developed coding platform built by the Division of Computer Science and Engineering. Participants solved real-time programming problems, with their submissions evaluated through multiple test cases and a live leaderboard tracking their progress.

The event aimed to introduce new students to competitive coding and strengthen their programming and problem-solving abilities in C. It provided hands-on experience in a structured environment, helping participants improve their logical reasoning, debugging, and algorithmic thinking while familiarizing them with performance-based evaluation systems.`,
      image: '/images/events/CODE QUEST.png',
      participants: 80,
      venue: 'CodeLab Platform (Online)',
      gallery: [
        '/images/events/CODE QUEST.png',
      ]
    },
    'NETWORK QUEST': {
      title: 'Network Quest',
      date: '12.09.2025',
      description: `Network Quest was an interactive treasure-hunt-style event organized by the IEEE Computer Society to test participants’ analytical and problem-solving skills. Teams of four navigated through various checkpoints by scanning QR codes, each unlocking a challenge such as riddles, logic puzzles, or technical questions. Solving one clue revealed the next location, leading teams closer to the final destination.

The event promoted teamwork, quick thinking, and creativity in a fun, gamified setting. Participants enhanced their collaboration, leadership, and communication skills while solving each level’s challenge. The winning team was determined based on both completion time and accuracy.`,
      image: '/images/events/NETWORK QUEST.png',
      participants: 60,
      venue: 'Karunya Institute of Technology and Sciences',
      gallery: [
        '/images/events/NETWORK QUEST.png',
      ]
    },
    'MINDSYNC': {
      title: 'MINDsync',
      date: '12.09.2025',
      description: `As part of the IEEE Freshers’ Day celebrations, the IEEE Computer Society organized MINDsync, a multi-level interactive gaming challenge that encouraged logical thinking and problem-solving. The event included several stages such as a binary memory game, an algorithm pathfinding task, a cybersecurity firewall simulation, and a real-time coding duel.

MINDsync introduced students to key technical concepts like algorithms, AI, and cybersecurity in an engaging and accessible format. The event successfully blended learning with fun, inspiring curiosity among freshers and motivating them to explore the world of computing and technology.`,
      image: '/images/events/mindsync.png',
      participants: 150,
      venue: 'Main Hall',
      gallery: [
        '/images/events/mindsync.png',
      ]
    },
    'IEEE INAUGURATION 2025': {
      title: 'IEEE Inauguration 2025',
      date: '12.08.2025',
      description: `The IEEE Computer Society at Karunya Institute of Technology and Sciences held its official inauguration for the 2025 academic year on August 12, 2025, at the Emmanuel Auditorium. The ceremony marked the formal launch of the society’s yearly activities and introduced the newly appointed office bearers. An innovative highlight was a custom-built AI chatbot that served as a co-host, reflecting the society’s focus on practical technology integration.

A cybersecurity demonstration during the event used a simulated phone “hack” to raise awareness about digital safety. The Chief Guest, Dr. Nirmal, delivered an inspiring address, followed by the formal badging of the student leadership team. The inauguration set a strong vision for the chapter, blending academic excellence with innovation and technological responsibility.`,
      image: '/images/events/INAUGURATION.png',
      participants: 100,
      venue: 'Emmanuel Auditorium',
      gallery: [
        '/images/events/INAUGURATION.png',
        '/images/events/IEEE COMPUTER SOCIETY INAUGURATION CEREMONY.jpeg',
      ]
    },
    'COMPOSE THE FUTURE': {
      title: 'Compose the Future',
      date: '12.09.2025',
      description: `Compose the Future – The Rise of AI Song Creation was an event exploring the creative potential of Artificial Intelligence in music composition. Participants used AI tools such as Suno AI and Music GPT to generate original songs aligned with the theme “Karunya 4.0: Engineering a Harmonious Future.”

The event gave students hands-on experience with modern AI tools while fostering creativity and technical skills. It demonstrated how AI can support storytelling, music composition, and ethical creativity, emphasizing innovation and originality in digital art.`,
      image: '/images/events/COMPOSE THE FUTURE.png',
      participants: 120,
      venue: 'Auditorium A',
      gallery: [
        '/images/events/COMPOSE THE FUTURE.png',
      ]
    },
    'VISUAL INTELLIGENCE': {
        title: 'Visual Intelligence',
        date: '04.09.2025',
        description: `Visual Intelligence: The Rise of AI in Video Creation was a collaborative event organized by the School of Computer Science and Technology, the IEEE Computer Society, and ACM on September 4, 2025. Participants created AI-generated videos based on themes such as “Life and Legacy of Our Beloved Chancellor” and “AI for Humanity – Solving Global Challenges.” The event began with an expert session on prompt engineering and a live demo of AI video workflows.

The hands-on competition allowed students to apply their creative and technical knowledge to produce impactful, theme-based videos. It enhanced their understanding of AI-driven multimedia tools and visual storytelling, encouraging innovation and digital creativity.`,
        image: '/images/events/VISUAL.png',
        participants: 90,
        venue: 'Online',
        gallery: [
            '/images/events/VISUAL.png',
        ]
    }
  };

  const event = eventDetails[formattedEventName as keyof typeof eventDetails];


  if (!event) {
    return <div>Event not found</div>
  }

  return (
    <section id="event-details" className="py-20 px-4 relative overflow-hidden min-h-screen">
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.3} />
          <FloatingIcons />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 bg-primary-gradient text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
          >
            &larr; Back
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            {event.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src={event.image} alt={event.title} className="w-full rounded-lg mb-8" />
            <h3 className="text-3xl font-bold mb-4 text-white">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.gallery.map((img, index) => (
                <img key={index} src={img} alt={`${event.title} gallery image ${index + 1}`} className="w-full h-auto rounded-lg" />
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-gray-300 text-lg mb-4"><strong>Date:</strong> {event.date}</p>
            <p className="text-gray-300 text-lg mb-4"><strong>Venue:</strong> {event.venue}</p>
            <p className="text-gray-300 text-lg mb-4"><strong>Participants:</strong> {event.participants}</p>
            <div className="text-gray-300 text-lg leading-relaxed">
              {event.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default EventDetailsPage