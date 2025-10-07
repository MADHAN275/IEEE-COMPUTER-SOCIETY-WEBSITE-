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
    'COMPOSE THE FUTURE': {
      title: 'COMPOSE THE FUTURE',
      date: '12.09.2025',
      description: `Event Overview
The event “Compose the Future – The Rise of AI Song Creation” was organized under the banner of IEEE. It provided a platform for participants to explore the emerging intersection of Artificial Intelligence and music creation. Using AI tools such as Suno AI, Music Full, Music GPT, Mureka AI, and Udio AI, participants were tasked with generating original songs that aligned with the event’s theme.The event was designed to showcase how AI can be leveraged in the creative domain, specifically in songwriting, while highlighting innovation, originality, and technical skill.

Objectives
To encourage participants to understand and utilize AI tools in creative arts, particularly music generation.

To promote creativity, originality, and ethical use of AI-generated content.

To align musical compositions with the futuristic theme of “Karunya 4.0: Engineering a Harmonious Future.”

To evaluate participants based on musicality, technical quality, and thematic relevance.

To foster innovative thinking among students and introduce them to AI’s role in shaping the future of the music industry.
Outcomes
Participants successfully created AI-generated songs that reflected the given theme.

The event encouraged bold and unique ideas, demonstrating AI’s potential in storytelling and music arrangement.

Students gained hands-on experience with cutting-edge AI music tools, enhancing their technical and creative skills.

The event highlighted the importance of originality and ethics in AI-driven creativity.

A greater awareness was created about the role of AI in future innovations and creative.

Other Relevant Details
The event was conducted as a flagship technical activity under the IEEE Day celebrations.
Participants coded exclusively in C, focusing on core programming fundamentals.
Evaluation criteria included correctness, efficiency, and problem-solving ability.
The interactive environment encouraged peer learning and active participation, aligning with IEEE’s vision of advancing technology for humanity.`,
      image: '/COMPOSE THE FUTURE.png',
      participants: 120,
      venue: 'Auditorium A',
    },
    'CODE QUEST': {
      title: 'CODE QUEST',
      date: '12.09.2025',
      description: `A competitive programming contest to challenge your skills.`,
      image: '/CODE QUEST.png',
      participants: 80,
      venue: 'Lab 3',
    },
    'MIND SYNC': {
      title: 'MIND SYNC',
      date: '12.09.2025',
      description: `A seminar on the intersection of neuroscience and AI.`,
      image: '/mindsync.png',
      participants: 150,
      venue: 'Main Hall',
    },
    'NETWORK QUEST': {
      title: 'NETWORK QUEST',
      date: '12.09.2025',
      description: `A challenge to solve complex networking problems.`,
      image: '/NETWORK QUEST.png',
      participants: 60,
      venue: 'Lab 5',
    },
    'IEEE COMPUTER SOCIETY INAUGURATION CEREMONY': {
      title: 'IEEE COMPUTER SOCIETY INAUGURATION CEREMONY',
      date: '12.08.2025',
      description: `Inauguration ceremony of the IEEE Computer Society.`,
      image: '/INAUGURATION.png',
      participants: 100,
      venue: 'Main Hall',
    },
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

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src={event.image} alt={event.title} className="w-full rounded-lg" />
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
