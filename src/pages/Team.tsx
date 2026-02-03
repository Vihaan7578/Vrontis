import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from '../components/Card3D'

interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  role: 'Founder' | 'Advisor'
}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 'founder-1',
      name: 'Kumari Awani',
      position: 'Founder',
      image: '/images/Awani Kumari.jpeg',
      role: 'Founder'
    },
    {
      id: 'founder-2',
      name: 'Shalabh Sharma',
      position: 'Founder',
      image: '/images/Shalabh Sharma.jpeg',
      role: 'Founder'
    },
    {
      id: 'advisor-1',
      name: 'Shanu Singh Rajput',
      position: 'Advisor',
      image: '/images/Shanu Singh Rajput.jpeg',
      role: 'Advisor'
    },
    {
      id: 'advisor-2',
      name: 'Jai Aditya Singh',
      position: 'Advisor',
      image: '/images/Jai Aditya Singh.jpeg',
      role: 'Advisor'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Our Team - Vrontis MUN</title>
        <meta name="description" content="Meet the dedicated team behind Vrontis MUN's exceptional diplomatic experience." />
      </Helmet>

      <div className="min-h-screen pt-16 overflow-x-hidden relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating orbs */}
          <motion.div 
            animate={{ 
              y: [0, -25, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 left-[8%] w-28 h-28 sm:w-40 sm:h-40 bg-aegis-brown/15 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 35, 0],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/3 right-[10%] w-36 h-36 sm:w-52 sm:h-52 bg-aegis-burgundy/12 rounded-full blur-3xl"
          />
          
          {/* Decorative lines */}
          <div className="absolute top-52 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-aegis-brown/20 to-transparent" />
          <div className="absolute top-64 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-aegis-burgundy/20 to-transparent" />
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
              {/* Decorative icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 bg-aegis-brown/20 rounded-full flex items-center justify-center"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-aegis-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6">
                Our Team
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading max-w-2xl mx-auto mb-4">
                Meet the dedicated professionals shaping the future of diplomacy
              </p>
              
              {/* Decorative divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="w-24 sm:w-32 h-1 bg-gradient-to-r from-aegis-brown to-aegis-burgundy mx-auto rounded-full"
              />
            </motion.div>
          </div>
        </section>

        {/* Team Members Grid - Responsive Layout */}
        <section className="py-8 sm:py-12">
          <div className="w-full px-4 sm:px-6">
            <div className="max-w-5xl mx-auto">
              {/* Mobile: 2 columns, Tablet: 2 columns, Desktop: 4 columns */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {teamMembers.map((member, index) => (
                  <div key={member.id} className="aspect-[3/4]">
                    <CardContainer containerClassName="!p-0 !flex !items-stretch !justify-stretch !h-full !w-full">
                    <CardBody className="!w-full !h-full">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative flex flex-col items-center w-full h-full"
                      >
                        <CardItem
                          translateZ="50"
                          className="!w-full !h-full bg-aegis-dark-gray/50 rounded-xl sm:rounded-2xl border border-aegis-brown/30 hover:border-aegis-brown/50 transition-all duration-300 group flex flex-col items-center justify-between p-3 sm:p-4 lg:p-5 overflow-hidden"
                        >
                          {/* Image - Takes most of the card */}
                          <CardItem translateZ="60" className="flex items-center justify-center flex-grow w-full">
                            <div className="w-[70%] aspect-square rounded-full border-2 border-aegis-brown/30 overflow-hidden group-hover:border-aegis-brown/60 transition-all duration-300">
                              <img 
                                src={member.image} 
                                alt={member.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.style.display = 'none'
                                  target.parentElement!.innerHTML = '<span class="text-aegis-brown text-3xl sm:text-4xl lg:text-5xl flex items-center justify-center w-full h-full">👤</span>'
                                }}
                              />
                            </div>
                          </CardItem>

                          {/* Name and Position at Bottom - Scales with container */}
                          <CardItem translateZ="40" className="text-center flex-shrink-0 w-full mt-[5%]">
                            <h3 
                              className="font-heading text-aegis-white group-hover:text-aegis-brown transition-colors line-clamp-1 mb-[3%]"
                              style={{ fontSize: 'clamp(0.875rem, 4vw, 1.5rem)' }}
                            >
                              {member.name}
                            </h3>
                            <span 
                              className="bg-aegis-brown/20 text-aegis-brown rounded-full inline-block"
                              style={{ 
                                fontSize: 'clamp(0.625rem, 2.5vw, 0.875rem)',
                                padding: 'clamp(0.125rem, 1vw, 0.5rem) clamp(0.5rem, 2vw, 1rem)'
                              }}
                            >
                              {member.position}
                            </span>
                          </CardItem>
                        </CardItem>
                      </motion.div>
                    </CardBody>
                  </CardContainer>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Team 