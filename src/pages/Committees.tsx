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
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
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
    }
  ]

  const filteredCommittees = selectedDifficulty === 'All' 
    ? committees 
    : committees.filter(committee => committee.difficulty === selectedDifficulty)

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <>
      <Helmet>
        <title>Committees - Vrontis MUN</title>
        <meta name="description" content="Explore our committees at Vrontis MUN." />
      </Helmet>

      <div className="min-h-screen pt-16 overflow-x-hidden">
        {/* Header Section */}
        <section className="py-8 sm:py-12 lg:py-16 overflow-x-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6">
                  Our Committees
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading">
                  Choose your challenge and dive into global issues
                </p>
              </motion.div>

              {/* Right: Filter Controls */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:justify-self-end"
              >
                <div className="bg-aegis-dark-gray/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-aegis-brown/20">
                  <h3 className="text-sm sm:text-base lg:text-lg font-subheading text-aegis-white mb-3 sm:mb-4 text-center">Filter by Difficulty</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                    {difficulties.map((difficulty) => (
                      <motion.button
                        key={difficulty}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-medium transition-all duration-300 text-xs sm:text-sm ${
                          selectedDifficulty === difficulty
                            ? 'bg-aegis-brown text-aegis-white shadow-lg'
                            : 'bg-aegis-dark-gray text-aegis-off-white border border-aegis-brown/50 hover:bg-aegis-brown/20'
                        }`}
                      >
                        {difficulty}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Committees Grid - Responsive Layout */}
        <section className="py-8 sm:py-12">
          <div className="w-full px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
              {/* Mobile: 1 column, Tablets: 2 columns, Desktop: 3 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredCommittees.map((committee, index) => (
                  <CardContainer key={committee.id} containerClassName="py-0">
                    <CardBody className="w-full h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => setSelectedCommittee(committee)}
                        className="flex items-center justify-center"
                      >
                        <CardItem
                          translateZ="50"
                          className="aspect-[4/3] max-w-sm w-full bg-aegis-dark-gray/50 rounded-xl sm:rounded-2xl border border-aegis-brown/30 hover:border-aegis-brown/50 transition-all duration-300 cursor-pointer p-4 sm:p-6 flex flex-col group mx-auto"
                        >
                          {/* Top - Committee Abbreviation */}
                          <CardItem translateZ="80" className="text-center flex-shrink-0 mb-3 sm:mb-6">
                            <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading text-aegis-white group-hover:text-aegis-brown transition-colors mb-2 sm:mb-4 text-center w-full ${
                              committee.abbreviation === 'IP' || committee.abbreviation === 'IPL' ? '-ml-1' : ''
                            }`}>
                              {committee.abbreviation}
                            </h3>
                            <div className="flex items-center justify-center space-x-1.5 sm:space-x-2">
                              <span className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${getDifficultyColor(committee.difficulty)}`} />
                              <span className="text-xs sm:text-sm lg:text-base font-medium text-aegis-brown">
                                {committee.difficulty}
                              </span>
                            </div>
                          </CardItem>

                          {/* Middle - Agenda */}
                          <CardItem translateZ="60" className="flex-grow flex flex-col justify-center text-center px-1 sm:px-2">
                            <div className="w-full">
                              <p className="text-[10px] sm:text-xs lg:text-sm text-aegis-burgundy font-medium mb-2 sm:mb-3">AGENDA</p>
                              <p className="text-[10px] sm:text-xs lg:text-sm text-aegis-off-white leading-relaxed overflow-hidden">
                                {committee.agenda.split(' ').slice(0, 6).join(' ')}...
                              </p>
                            </div>
                          </CardItem>

                          {/* Bottom - Click hint */}
                          <CardItem translateZ="40" className="text-center flex-shrink-0 mt-3 sm:mt-6">
                            <p className="text-xs sm:text-sm lg:text-base text-aegis-brown/80 group-hover:text-aegis-brown transition-colors">
                              Click for details
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
      </div>

      {/* Detail Modal */}
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
              className="bg-aegis-dark-gray rounded-xl sm:rounded-2xl border border-aegis-brown/30 max-w-2xl w-full max-h-[85vh] sm:max-h-[80vh] overflow-y-auto"
            >
              <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-4 sm:mb-6 lg:mb-8">
                  <div className="text-center flex-1">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-aegis-white mb-1 sm:mb-2">
                      {selectedCommittee.abbreviation}
                    </h2>
                    <p className="text-sm sm:text-base lg:text-lg text-aegis-off-white">
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
                
                {/* Content */}
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-subheading text-aegis-brown mb-2 sm:mb-3">Description</h3>
                    <p className="text-sm sm:text-base text-aegis-off-white leading-relaxed">
                      {selectedCommittee.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-subheading text-aegis-brown mb-2 sm:mb-3">Agenda</h3>
                    <p className="text-sm sm:text-base text-aegis-off-white leading-relaxed">
                      {selectedCommittee.agenda}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-subheading text-aegis-brown mb-2 sm:mb-3">Details</h3>
                      <div className="space-y-1.5 sm:space-y-2 text-sm sm:text-base text-aegis-off-white">
                        <div><span className="font-medium">Type:</span> {selectedCommittee.type}</div>
                        <div><span className="font-medium">Size:</span> {selectedCommittee.size} delegates</div>
                        <div><span className="font-medium">Difficulty:</span> {selectedCommittee.difficulty}</div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm sm:text-base lg:text-lg font-subheading text-aegis-brown mb-2 sm:mb-3">Chairs</h3>
                      <div className="space-y-1 text-sm sm:text-base text-aegis-off-white">
                        {selectedCommittee.chairs.map((chair, idx) => (
                          <div key={idx}>{chair}</div>
                        ))}
                      </div>
                    </div>
                  </div>
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