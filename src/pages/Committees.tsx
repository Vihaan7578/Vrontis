import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from '../components/Card3D'

interface Committee {
  id: string
  name: string
  abbreviation: string
  agenda: string
  size: number
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  description: string
  chairs: string[]
  type: string
}

const Committees: React.FC = () => {
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null)

  const committees: Committee[] = [
    {
      id: 'uncsw',
      name: 'United Nations Commission on the Status of Women',
      abbreviation: 'UNCSW',
      agenda: 'Addressing gender based violence strengthening global frameworks for prevention, protection and justice',
      size: 45,
      difficulty: 'Intermediate',
      description: 'The principal global intergovernmental body exclusively dedicated to the promotion of gender equality and the empowerment of women.',
      chairs: ['Chair Name #1', 'Chair Name #2'],
      type: 'Specialized Committee'
    },
    {
      id: 'unhrc',
      name: 'UN Human Rights Council',
      abbreviation: 'UNHRC',
      agenda: 'Deliberation on increasing global prevalence on Xenophobia in the light of recent geopolitical events',
      size: 47,
      difficulty: 'Advanced',
      description: 'Promoting and protecting human rights around the globe, addressing discrimination and xenophobia.',
      chairs: ['Chair Name #3', 'Chair Name #4'],
      type: 'Specialized Committee'
    },
    {
      id: 'unga',
      name: 'United Nations General Assembly',
      abbreviation: 'UNGA',
      agenda: 'Strengthening international cooperation to combat terrorism and violence extremism',
      size: 193,
      difficulty: 'Intermediate',
      description: 'The main deliberative assembly where all UN member states work together on global security challenges.',
      chairs: ['Chair Name #5', 'Chair Name #6'],
      type: 'General Assembly'
    },
    {
      id: 'loksabha',
      name: 'Lok Sabha',
      abbreviation: 'LOK SABHA',
      agenda: 'Deliberation upon secularism in India with special emphasis on nationwide UCC',
      size: 543,
      difficulty: 'Advanced',
      description: 'The lower house of India\'s Parliament, discussing constitutional matters and secular governance.',
      chairs: ['Chair Name #7', 'Chair Name #8'],
      type: 'National Parliament'
    },
    {
      id: 'aippm',
      name: 'All India Political Parties Meet',
      abbreviation: 'AIPPM',
      agenda: 'Deliberation upon AFSPA and border security with special emphasis on political measures to counter Pakistan in light of Indus Water Treaty',
      size: 50,
      difficulty: 'Advanced',
      description: 'A special committee bringing together representatives from all major Indian political parties to discuss national security matters.',
      chairs: ['Chair Name #9', 'Chair Name #10'],
      type: 'Crisis Committee'
    },
    {
      id: 'ipl',
      name: 'Indian Premier League Auction Committee',
      abbreviation: 'IPL',
      agenda: 'Strategic planning and execution of IPL player auctions and team management policies',
      size: 25,
      difficulty: 'Intermediate',
      description: 'A specialized committee focusing on cricket administration, player auctions, team strategies, and sports management in the Indian Premier League.',
      chairs: ['Chair Name #11', 'Chair Name #12'],
      type: 'Sports Administration'
    },
    {
      id: 'ip',
      name: 'International Press Committee',
      abbreviation: 'IP',
      agenda: 'Media ethics, press freedom, and digital journalism in the contemporary world',
      size: 35,
      difficulty: 'Beginner',
      description: 'A dynamic committee representing journalists, cartoonists, and photographers addressing global media challenges and press freedom.',
      chairs: ['Chair Name #13', 'Chair Name #14'],
      type: 'Media Committee'
    },
    {
      id: 'mootcourt',
      name: 'Moot Court',
      abbreviation: 'MOOT COURT',
      agenda: 'Classified',
      size: 30,
      difficulty: 'Intermediate',
      description: 'A legal simulation committee where participants argue cases before a mock court, developing advocacy skills and legal reasoning through courtroom procedures.',
      chairs: ['Chair Name #15', 'Chair Name #16'],
      type: 'Legal Simulation'
    }
  ]


  return (
    <>
      <Helmet>
        <title>Committees - Vrontis MUN</title>
        <meta name="description" content="Explore our committees at Vrontis MUN." />
      </Helmet>

      <div className="min-h-screen pt-16 overflow-x-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          <motion.div
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-[10%] w-32 h-32 sm:w-48 sm:h-48 bg-aegis-brown/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 40, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-[5%] w-40 h-40 sm:w-64 sm:h-64 bg-aegis-burgundy/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, -20, 0],
              x: [0, 20, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-1/4 left-[20%] w-24 h-24 sm:w-40 sm:h-40 bg-aegis-brown/15 rounded-full blur-2xl"
          />

          {/* Decorative lines */}
          <div className="absolute top-40 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-aegis-brown/20 to-transparent" />
          <div className="absolute top-60 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-aegis-burgundy/20 to-transparent" />
          <div className="absolute bottom-40 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-aegis-brown/10 to-transparent" />
        </div>

        {/* Header Section */}
        <section className="py-8 sm:py-12 lg:py-16 overflow-x-hidden relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Decorative element above title */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-16 sm:w-24 h-1 bg-gradient-to-r from-aegis-brown to-aegis-burgundy mx-auto mb-4 sm:mb-6 rounded-full"
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6">
                Our Committees
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading max-w-2xl mx-auto mb-4">
                Choose your challenge and dive into global issues
              </p>
              {/* Decorative element below subtitle */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="w-32 sm:w-48 h-px bg-gradient-to-r from-transparent via-aegis-brown/50 to-transparent mx-auto"
              />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-6 sm:py-8 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center gap-6 sm:gap-12 lg:gap-16"
            >
              <div className="text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-heading text-aegis-brown"
                >
                  8
                </motion.span>
                <p className="text-[10px] sm:text-xs text-aegis-off-white mt-1">Committees</p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-aegis-brown/30" />
              <div className="text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-heading text-aegis-brown"
                >
                  8
                </motion.span>
                <p className="text-[10px] sm:text-xs text-aegis-off-white mt-1">Unique Agendas</p>
              </div>
              <div className="w-px h-8 sm:h-12 bg-aegis-brown/30" />
              <div className="text-center">
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
                  className="text-2xl sm:text-3xl lg:text-4xl font-heading text-aegis-burgundy"
                >
                  ∞
                </motion.span>
                <p className="text-[10px] sm:text-xs text-aegis-off-white mt-1">Opportunities</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Committees Grid - Responsive Layout */}
        <section className="py-8 sm:py-12 relative">
          <div className="w-full px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              {/* Mobile: 2 columns, Tablets: 2 columns, Desktop: 3-4 columns */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                {committees.map((committee, index) => (
                  <CardContainer key={committee.id} containerClassName="py-0">
                    <CardBody className="w-full h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => setSelectedCommittee(committee)}
                        className="flex items-center justify-center h-full"
                      >
                        <CardItem
                          translateZ="50"
                          className="aspect-square w-full min-h-[180px] sm:min-h-[200px] lg:min-h-[240px] bg-aegis-dark-gray/50 rounded-xl sm:rounded-2xl border border-aegis-brown/30 hover:border-aegis-brown/50 transition-all duration-300 cursor-pointer p-3 sm:p-4 lg:p-6 flex flex-col group relative overflow-hidden"
                        >
                          {/* Hover glow effect */}
                          <div className="absolute inset-0 bg-gradient-to-br from-aegis-brown/0 via-aegis-brown/0 to-aegis-brown/0 group-hover:from-aegis-brown/5 group-hover:via-transparent group-hover:to-aegis-burgundy/5 transition-all duration-500" />

                          {/* Top - Committee Abbreviation */}
                          <CardItem translateZ="80" className="text-center flex-shrink-0 mb-2 sm:mb-4 relative z-10">
                            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-heading text-aegis-white group-hover:text-aegis-brown transition-colors text-center w-full">
                              {committee.abbreviation}
                            </h3>
                          </CardItem>

                          {/* Middle - Agenda Preview */}
                          <CardItem translateZ="60" className="flex-grow flex flex-col justify-center text-center px-1 relative z-10">
                            <div className="w-full">
                              <p className="text-[9px] sm:text-[10px] lg:text-xs text-aegis-burgundy font-medium mb-1 sm:mb-2">AGENDA</p>
                              <p className="text-[9px] sm:text-[10px] lg:text-xs text-aegis-off-white leading-relaxed line-clamp-3">
                                {committee.agenda.split(' ').slice(0, 8).join(' ')}...
                              </p>
                            </div>
                          </CardItem>

                          {/* Bottom - Click hint */}
                          <CardItem translateZ="40" className="text-center flex-shrink-0 mt-2 sm:mt-4 relative z-10">
                            <p className="text-[10px] sm:text-xs lg:text-sm text-aegis-brown/80 group-hover:text-aegis-brown transition-colors flex items-center justify-center gap-1">
                              <span>View Details</span>
                              <motion.span
                                className="inline-block"
                                animate={{ x: [0, 3, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                →
                              </motion.span>
                            </p>
                          </CardItem>
                        </CardItem>
                      </motion.div>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-12 sm:py-16 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-aegis-dark-gray/80 via-aegis-dark-gray/60 to-aegis-dark-gray/80 rounded-2xl p-6 sm:p-8 lg:p-10 border border-aegis-brown/20"
            >
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading text-aegis-white mb-3">
                Ready to Make Your Mark?
              </h3>
              <p className="text-sm sm:text-base text-aegis-off-white mb-6 max-w-xl mx-auto">
                Select a committee that resonates with your interests and prepare to engage in meaningful diplomatic discourse.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="/registration"
                  className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white font-semibold rounded-lg hover:from-aegis-burgundy hover:to-aegis-brown transition-all duration-300 shadow-lg text-sm sm:text-base"
                >
                  Register Now
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Detail Modal - Shows only Full Name and Agenda */}
      <AnimatePresence>
        {selectedCommittee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCommittee(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-aegis-dark-gray rounded-xl sm:rounded-2xl border border-aegis-brown/30 max-w-lg w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto"
            >
              <div className="p-5 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="text-center flex-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-aegis-brown mb-2 sm:mb-3">
                      {selectedCommittee.abbreviation}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-aegis-white font-medium">
                      {selectedCommittee.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedCommittee(null)}
                    className="text-aegis-off-white hover:text-aegis-white text-2xl sm:text-3xl ml-2 sm:ml-4 p-1"
                  >
                    ×
                  </button>
                </div>

                {/* Agenda */}
                <div className="border-t border-aegis-brown/20 pt-4 sm:pt-6">
                  <h3 className="text-sm sm:text-base lg:text-lg font-subheading text-aegis-brown mb-2 sm:mb-3 text-center">Agenda</h3>
                  <p className="text-sm sm:text-base text-aegis-off-white leading-relaxed text-center">
                    {selectedCommittee.agenda}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Committees