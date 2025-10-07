import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'


const EventsSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

    const pastEvents = [
    {
      title: "VISUAL INTELIGENCE",
      date: "04.09.2025",
      image: "/VISUAL.png"
    },
    {
      title: "COMPOSE THE FUTURE",
      date: "12.09.2025",
      image: "/COMPOSE THE FUTURE.png"
    },
    {
      title: "CODE QUEST",
      date: "12.09.2025",
      image: "/CODE QUEST.png"
    },
    {
      title: "MIND SYNC",
      date: "12.09.2025",
      image: "/mindsync.png"
    },
    {
      title: "NETWORK QUEST",
      date: "12.09.2025",
      image: "/NETWORK QUEST.png"
    },
    {
      title: "IEEE COMPUTER SOCIETY INAUGURATION CEREMONY",
      date: "12.08.2025",
      image: "/INAUGURATION.png"
    }
  ];

  return (
    <section id="events" className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-primary-gradient bg-clip-text text-transparent">
            OUR PAST EVENTS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pastEvents.sort((a, b) => new Date(b.date.split('.').reverse().join('-')).getTime() - new Date(a.date.split('.').reverse().join('-')).getTime()).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass p-8 rounded-2xl flex flex-col h-full"
              whileHover={{ scale: 1.05, y: -10 }}
            >
              <div className="mb-4">
                <img src={event.image} alt={event.title} className="w-full rounded-lg" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{event.title}</h3>
              <p className="text-gray-400 font-semibold mb-4">{event.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsSection