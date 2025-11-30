import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const Registration: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Registration - Vrontis MUN</title>
        <meta name="description" content="Register for Vrontis MUN 2025." />
      </Helmet>
      <div className="min-h-screen pt-14 sm:pt-16 safe-area-top overflow-x-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 px-4 sm:px-6 py-8 sm:py-12 lg:py-16 safe-area-left safe-area-right min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
          {/* Left: Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left flex-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6">
              Registration
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading max-w-lg mx-auto lg:mx-0">
              Join us for an unforgettable diplomatic experience at Vrontis MUN 2025
            </p>
          </motion.div>

          {/* Right: Registration Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-sm sm:max-w-md"
          >
            <div className="glass-effect rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-aegis-brown/30 space-y-4 sm:space-y-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-aegis-brown/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-aegis-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-aegis-white text-lg sm:text-xl font-semibold mb-2">
                  Registration Coming Soon!
                </p>
                <p className="text-aegis-off-white text-sm sm:text-base">
                  Stay tuned for registration details and updates.
                </p>
              </div>
              <a
                href="https://linktr.ee/Vrontis.MUN?utm_source=linktree_admin_share&utm_medium=social&utm_content=link_in_bio"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 sm:px-8 py-3 sm:py-4 bg-aegis-burgundy text-aegis-white rounded-full hover:bg-aegis-brown transition-colors font-medium text-sm sm:text-base active:scale-95"
                style={{ minHeight: '44px', touchAction: 'manipulation' }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Apply via Linktree
              </a>
              <p className="text-aegis-off-white/60 text-xs sm:text-sm">
                Event dates: May 16-17, 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Registration 