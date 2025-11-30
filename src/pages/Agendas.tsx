import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CardContainer, CardBody, CardItem } from '../components/Card3D'

interface AgendaItem {
  id: string
  committee: string
  title: string
  description: string
  keyPoints: string[]
  pdfUrl?: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
}

const Agendas: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')
  const agendas: AgendaItem[] = [
    {
      id: 'uncsw-agenda',
      committee: 'UNCSW',
      title: 'Addressing gender based violence strengthening global frameworks for prevention, protection and justice',
      description: 'This agenda examines the persistent global challenge of gender-based violence, focusing on developing comprehensive frameworks that address prevention, provide protection for survivors, and ensure justice for perpetrators while promoting gender equality worldwide.',
      keyPoints: [
        'Legal frameworks and international conventions on GBV',
        'Prevention strategies and community-based interventions',
        'Support systems for survivors and rehabilitation programs',
        'Justice mechanisms and prosecution of perpetrators',
        'Role of technology in both facilitating and combating GBV'
      ],
      pdfUrl: '/agendas/uncsw-gender-violence.pdf',
      difficulty: 'Intermediate'
    },
    {
      id: 'unhrc-agenda',
      committee: 'UNHRC',
      title: 'Deliberation on increasing global prevalence on Xenophobia in the light of recent geopolitical events',
      description: 'Addressing the alarming rise of xenophobia worldwide, examining how recent geopolitical tensions, migration crises, and economic uncertainties have contributed to increased discrimination and hatred against foreign nationals and minority communities.',
      keyPoints: [
        'Root causes of contemporary xenophobia and discrimination',
        'Impact of social media and misinformation on xenophobic attitudes',
        'Protection mechanisms for refugees and migrant populations',
        'Legislative and policy responses to combat xenophobia',
        'International cooperation in promoting tolerance and inclusion'
      ],
      pdfUrl: '/agendas/unhrc-xenophobia.pdf',
      difficulty: 'Advanced'
    },
    {
      id: 'unga-agenda',
      committee: 'UNGA',
      title: 'Strengthening international cooperation to combat terrorism and violence extremism',
      description: 'Examining comprehensive strategies to address the evolving threats of terrorism and violent extremism through enhanced international cooperation, information sharing, and coordinated response mechanisms while respecting human rights and fundamental freedoms.',
      keyPoints: [
        'Counter-terrorism strategies and international legal frameworks',
        'Addressing root causes of radicalization and extremism',
        'Intelligence sharing and international cooperation mechanisms',
        'Protecting human rights while combating terrorism',
        'Rehabilitation and reintegration of former combatants'
      ],
      pdfUrl: '/agendas/unga-terrorism.pdf',
      difficulty: 'Intermediate'
    },
    {
      id: 'loksabha-agenda',
      committee: 'LOK SABHA',
      title: 'Deliberation upon secularism in India with special emphasis on nationwide UCC',
      description: 'Examining the implementation of a Uniform Civil Code across India, analyzing its implications for secularism, religious freedom, and national unity while addressing concerns of various religious and cultural communities.',
      keyPoints: [
        'Constitutional provisions on secularism and religious freedom',
        'Comparative analysis of personal laws across communities',
        'Legal and social implications of implementing UCC',
        'Balancing religious practices with gender equality',
        'Federal structure and state vs. central jurisdiction'
      ],
      pdfUrl: '/agendas/loksabha-ucc.pdf',
      difficulty: 'Advanced'
    },
    {
      id: 'aippm-agenda',
      committee: 'AIPPM',
      title: 'Deliberation upon AFSPA and border security with special emphasis on political measures to counter Pakistan in light of Indus Water Treaty',
      description: 'Addressing the complex challenges of border security, the controversial Armed Forces Special Powers Act, and water diplomacy with Pakistan, focusing on political solutions and strategic measures for regional stability.',
      keyPoints: [
        'Review of AFSPA provisions and human rights concerns',
        'Border security challenges and strategic responses',
        'Water sharing disputes and the Indus Water Treaty',
        'Diplomatic engagement and conflict resolution mechanisms',
        'Cross-party consensus on national security policies'
      ],
      pdfUrl: '/agendas/aippm-security.pdf',
      difficulty: 'Advanced'
    },
    {
      id: 'ipl-agenda',
      committee: 'IPL',
      title: 'Strategic planning and execution of IPL player auctions and team management policies',
      description: 'This committee focuses on the complex world of cricket administration, examining player auction strategies, team composition policies, financial regulations, and the overall governance of one of the world\'s most popular cricket leagues.',
      keyPoints: [
        'Player auction mechanisms and bidding strategies',
        'Team composition rules and salary cap management',
        'Performance analytics and player valuation systems',
        'Commercial aspects and revenue distribution models',
        'Governance structures and regulatory frameworks'
      ],
      pdfUrl: '/agendas/ipl-auction.pdf',
      difficulty: 'Intermediate'
    },
    {
      id: 'ip-agenda',
      committee: 'IP',
      title: 'Media ethics, press freedom, and digital journalism in the contemporary world',
      description: 'Addressing the evolving challenges facing modern journalism, including digital transformation, ethical reporting standards, press freedom under authoritarian regimes, and the role of visual media in shaping public opinion.',
      keyPoints: [
        'Digital transformation and future of journalism',
        'Press freedom and safety of journalists worldwide',
        'Ethical standards in reporting and visual media',
        'Combating misinformation and fake news',
        'Role of cartoonists and photographers in social commentary'
      ],
      pdfUrl: '/agendas/ip-media-ethics.pdf',
      difficulty: 'Beginner'
    }
  ]

  const filteredAgendas = selectedDifficulty === 'All' 
    ? agendas 
    : agendas.filter(agenda => agenda.difficulty === selectedDifficulty)

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/20'
      case 'Advanced': return 'text-red-400 bg-red-400/20'
      default: return 'text-gray-400 bg-gray-400/20'
    }
  }

  return (
    <>
      <Helmet>
        <title>Agendas - AEGIS MUN</title>
        <meta name="description" content="Explore detailed agendas for all committees, covering the most pressing global challenges of our time." />
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
                  Committee Agendas
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading mb-2 sm:mb-4">
                  Delve deep into the critical issues that will shape our world's future
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

        {/* Agendas Section - Responsive Layout */}
        <section className="py-8 sm:py-12">
          <div className="w-full px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              {/* Grid layout for agenda items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {filteredAgendas.map((agenda, index) => (
                  <CardContainer key={agenda.id} containerClassName="py-0">
                    <CardBody className="w-full h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                        viewport={{ once: true, margin: '-100px' }}
                        className="relative flex flex-col items-center w-full h-full"
                      >
                        {/* Content card */}
                        <CardItem
                          translateZ="50"
                          className="glass-effect rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8 border border-aegis-brown/30 hover:border-aegis-highlight/50 transition-all duration-300 group w-full h-full flex flex-col"
                        >
                      {/* Committee badge and difficulty */}
                      <div className="flex justify-between items-start mb-3 sm:mb-4 lg:mb-6">
                        <span className="px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 bg-aegis-burgundy/20 text-aegis-highlight font-semibold rounded-full text-xs sm:text-sm lg:text-base">
                          {agenda.committee}
                        </span>
                        <span className={`px-2 sm:px-3 py-0.5 sm:py-1 lg:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium ${getDifficultyColor(agenda.difficulty)}`}>
                          {agenda.difficulty}
                        </span>
                      </div>
                      {/* Title */}
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-bold text-aegis-white mb-3 sm:mb-4 lg:mb-6 group-hover:text-aegis-highlight transition-colors text-center leading-tight">
                        {agenda.title}
                      </h3>
                      {/* Description */}
                      <p className="text-xs sm:text-sm lg:text-base text-aegis-off-white mb-3 sm:mb-4 lg:mb-6 leading-relaxed flex-grow line-clamp-4 sm:line-clamp-none">
                        {agenda.description}
                      </p>
                      {/* Key points */}
                      <div className="mb-3 sm:mb-4 lg:mb-6">
                        <h4 className="text-sm sm:text-base lg:text-lg font-bold text-aegis-highlight mb-2 sm:mb-3 lg:mb-4 text-center">Key Discussion Points:</h4>
                        <ul className="space-y-1.5 sm:space-y-2 lg:space-y-3">
                          {agenda.keyPoints.slice(0, 3).map((point, pointIndex) => (
                            <motion.li
                              key={pointIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: pointIndex * 0.1 }}
                              className="flex items-start text-aegis-off-white text-[10px] sm:text-xs lg:text-sm"
                            >
                              <span className="text-aegis-highlight mr-1.5 sm:mr-2 lg:mr-3 mt-0.5 text-sm sm:text-base lg:text-lg">•</span>
                              <span className="line-clamp-2 sm:line-clamp-none">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      {/* Download button */}
                      {agenda.pdfUrl && (
                        <div className="mt-auto">
                          <a
                            href={agenda.pdfUrl}
                            className="inline-flex items-center px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white font-semibold rounded-lg hover:from-aegis-burgundy hover:to-aegis-brown transform hover:scale-105 transition-all duration-300 shadow-lg w-full justify-center text-xs sm:text-sm lg:text-base"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-1.5 sm:mr-2 lg:mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download Agenda
                          </a>
                        </div>
                      )}
                        </CardItem>
                      </motion.div>
                    </CardBody>
                  </CardContainer>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-aegis-burgundy to-aegis-brown">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-aegis-white mb-4 sm:mb-6 text-center"
            >
              Ready to tackle these challenges?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base lg:text-xl text-aegis-off-white mb-6 sm:mb-8 px-2 sm:px-4"
            >
              Choose your committee and prepare to engage with some of the most pressing issues facing our world today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Link
                to="/registration"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-aegis-white text-aegis-burgundy font-semibold rounded-lg hover:bg-aegis-off-white transform hover:scale-105 transition-all duration-300 shadow-lg text-sm sm:text-base"
              >
                Register Now
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/committees"
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-aegis-white text-aegis-white font-semibold rounded-lg hover:bg-aegis-white hover:text-aegis-burgundy transition-all duration-300 text-sm sm:text-base"
              >
                Explore Committees
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Agendas 