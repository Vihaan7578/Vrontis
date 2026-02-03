import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isEventStarted, setIsEventStarted] = useState(false)

  // Event date: June 6, 2026 (Day 1 of the event)
  const eventDate = new Date('2026-06-06T09:00:00')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = eventDate.getTime() - now

      if (distance < 0) {
        setIsEventStarted(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  if (isEventStarted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="text-8xl mb-4">🎉</div>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-heading text-aegis-brown mb-4">
          Event is Live!
        </h2>
        <p className="text-xl text-aegis-burgundy font-subheading">
          Vrontis Model UN is now in session
        </p>
      </motion.div>
    )
  }

  return (
    <div className="w-full">
      {/* Horizontal countdown display */}
      <div className="flex items-center justify-center space-x-4 lg:space-x-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group flex-1 max-w-xs"
          >
            {/* Main card - More compact horizontal design */}
            <div className="bg-aegis-dark-gray border border-aegis-brown/20 rounded-xl p-4 lg:p-6 text-center hover:border-aegis-brown/40 transition-all duration-300 hover:transform hover:scale-105">
              {/* Number */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={unit.value}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl lg:text-4xl font-heading text-aegis-brown mb-2"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.div>
              </AnimatePresence>

              {/* Label */}
              <div className="text-aegis-white font-subheading text-sm lg:text-lg">
                {unit.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default CountdownTimer 