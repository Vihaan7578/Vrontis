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
      name: 'Shalabh Sharma',
      position: 'Founder',
      image: '/images/Shalabh Sharma.jpeg',
      role: 'Founder'
    },
    {
      id: 'founder-2',
      name: 'Awani Kumari',
      position: 'Founder',
      image: '/images/Awani Kumari.jpeg',
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

      <div className="min-h-screen pt-16 overflow-x-hidden">
        {/* Header Section */}
        <section className="py-8 sm:py-12 lg:py-16 overflow-x-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6">
                Our Team
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading max-w-2xl mx-auto">
                Meet the dedicated professionals shaping the future of diplomacy
              </p>
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

                          {/* Name and Position at Bottom */}
                          <CardItem translateZ="40" className="text-center flex-shrink-0 w-full mt-2 sm:mt-3">
                            <h3 className="text-sm sm:text-base lg:text-lg font-heading text-aegis-white group-hover:text-aegis-brown transition-colors line-clamp-1 mb-1">
                              {member.name}
                            </h3>
                            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-aegis-brown/20 text-aegis-brown rounded-full text-[10px] sm:text-xs inline-block">
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