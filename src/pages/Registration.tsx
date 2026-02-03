import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const Registration: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Registration - Vrontis MUN</title>
        <meta name="description" content="Register for Vrontis MUN 2026. Secretariat and Delegate applications now open!" />
      </Helmet>
      <div className="min-h-screen pt-14 sm:pt-16 safe-area-top overflow-x-hidden relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-aegis-brown/15 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 25, 0],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-1/3 right-[15%] w-40 h-40 sm:w-56 sm:h-56 bg-aegis-burgundy/12 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 py-8 sm:py-12 lg:py-16 safe-area-left safe-area-right min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] relative">
          {/* Left: Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex-1"
          >
            {/* Decorative element */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto lg:mx-0 mb-4 sm:mb-5 lg:mb-6 bg-aegis-brown/20 rounded-full flex items-center justify-center"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-aegis-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </motion.div>

            <h1
              className="font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6"
              style={{ fontSize: 'clamp(1.875rem, 5vw, 3.75rem)' }}
            >
              Registration
            </h1>
            <p
              className="text-aegis-burgundy font-subheading max-w-lg mx-auto lg:mx-0"
              style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
            >
              Join us for an unforgettable diplomatic experience at Vrontis MUN 2026
            </p>
          </motion.div>

          {/* Right: Registration Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[90vw] sm:max-w-md lg:max-w-lg"
          >
            <div
              className="glass-effect rounded-xl sm:rounded-2xl border border-aegis-brown/30 text-center relative overflow-hidden"
              style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-aegis-brown/5 via-transparent to-aegis-burgundy/5 pointer-events-none" />

              {/* Live indicator */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 mb-4 sm:mb-5 lg:mb-6"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-500 rounded-full"
                />
                <span
                  className="text-green-400 font-medium uppercase tracking-wider"
                  style={{ fontSize: 'clamp(0.625rem, 1.5vw, 0.75rem)' }}
                >
                  Applications Open
                </span>
              </motion.div>

              {/* Icon */}
              <div
                className="mx-auto bg-aegis-brown/20 rounded-full flex items-center justify-center mb-4 sm:mb-5 lg:mb-6"
                style={{
                  width: 'clamp(3.5rem, 8vw, 5rem)',
                  height: 'clamp(3.5rem, 8vw, 5rem)'
                }}
              >
                <svg
                  className="text-aegis-brown"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ width: 'clamp(1.75rem, 4vw, 2.5rem)', height: 'clamp(1.75rem, 4vw, 2.5rem)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Main text */}
              <div className="mb-4 sm:mb-5 lg:mb-6 relative z-10">
                <p
                  className="text-aegis-white font-semibold mb-2"
                  style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}
                >
                  Secretariat & Delegate Applications Live Now!
                </p>
                <p
                  className="text-aegis-off-white"
                  style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}
                >
                  Apply now to be part of Vrontis MUN 2026
                </p>
              </div>

              {/* Apply button */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://linktr.ee/Vrontis.MUN?utm_source=linktree_admin_share&utm_medium=social&utm_content=link_in_bio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white rounded-full hover:from-aegis-burgundy hover:to-aegis-brown transition-all duration-300 font-medium active:scale-95 shadow-lg"
                style={{
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  minHeight: '44px',
                  touchAction: 'manipulation'
                }}
              >
                <svg
                  className="mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ width: 'clamp(1rem, 2.5vw, 1.25rem)', height: 'clamp(1rem, 2.5vw, 1.25rem)' }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Apply via Linktree
              </motion.a>

              {/* Event dates */}
              <p
                className="text-aegis-off-white/60 mt-4 sm:mt-5 lg:mt-6"
                style={{ fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)' }}
              >
                Event dates: June 6-7, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Registration 