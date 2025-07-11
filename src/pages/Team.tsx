import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { CardContainer, CardBody, CardItem } from '../components/Card3D'

interface TeamMember {
  id: string
  name: string
  position: string
  department: string
  bio: string
  expertise: string[]
  role: 'Founders' | 'HODs' | 'Secretariats'
}

const Team: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('All')

  const teamMembers: TeamMember[] = [
    {
      id: 'secretary-general',
      name: 'Harliv',
      position: 'The Secretary-General',
      department: '',
      bio: 'Leading Vrontis MUN with vision and diplomatic excellence, ensuring an exceptional conference experience for all delegates.',
      expertise: ['International Relations', 'Crisis Management', 'Public Speaking', 'Strategic Planning'],
      role: 'Founders'
    },
    {
      id: 'deputy-secretary',
      name: 'Shalabh',
      position: 'The Founder',
      department: '',
      bio: 'Supporting conference operations and maintaining the highest standards of diplomatic simulation and educational excellence.',
      expertise: ['Conference Management', 'Delegate Relations', 'Protocol Design', 'Team Leadership'],
      role: 'Founders'
    },
    {
      id: 'academic-director',
      name: 'Awani',
      position: 'The Co-Founder',
      department: '',
      bio: 'Overseeing all academic aspects of the conference, ensuring authentic diplomatic challenges and meaningful educational outcomes.',
      expertise: ['International Law', 'Research Design', 'Educational Development', 'Committee Structure'],
      role: 'Founders'
    },
    {
      id: 'research-coordinator',
      name: 'Kavya',
      position: 'Head of Department',
      department: 'Research and Content',
      bio: 'Developing comprehensive background guides and ensuring all committees have well-researched, current, and challenging agendas.',
      expertise: ['Global Affairs Research', 'Policy Analysis', 'Academic Writing', 'Current Events'],
      role: 'HODs'
    },
    {
      id: 'operations-manager',
      name: 'Aarush',
      position: 'Head of Department',
      department: 'Logistics and Operations',
      bio: 'Coordinating all logistical aspects of the conference to ensure seamless operations and exceptional delegate experience.',
      expertise: ['Event Management', 'Logistics Coordination', 'Vendor Relations', 'Crisis Resolution'],
      role: 'HODs'
    },
    {
      id: 'new-member',
      name: 'Lashika',
      position: 'Head of Department',
      department: 'Media',
      bio: 'Contributing to the excellence and growth of Vrontis MUN through dedicated service and innovative approaches.',
      expertise: ['Leadership', 'Innovation', 'Strategy', 'Excellence'],
      role: 'HODs'
    },
    {
      id: 'outreach-director',
      name: 'Vihaan',
      position: 'Head of Department',
      department: 'IT and Tech',
      bio: 'Building partnerships with schools and organizations to expand Vrontis MUN reach and create networking opportunities.',
      expertise: ['Partnership Development', 'Marketing Strategy', 'Community Relations', 'Digital Outreach'],
      role: 'HODs'
    }
  ]

  const filteredMembers = selectedRole === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.role === selectedRole)

  const roles = ['All', 'Founders', 'HODs']

  return (
    <>
      <Helmet>
        <title>Our Team - Vrontis MUN</title>
        <meta name="description" content="Meet the dedicated team behind Vrontis MUN's exceptional diplomatic experience." />
      </Helmet>

      <div className="min-h-screen pt-16 bg-aegis-black">
        {/* Header Section */}
        <section className="py-16 bg-aegis-black">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center lg:text-left"
              >
                <h1 className="text-5xl md:text-6xl font-heading text-aegis-white mb-6">
                  Our Team
                </h1>
                <p className="text-xl text-aegis-burgundy font-subheading">
                  Meet the dedicated professionals shaping the future of diplomacy
                </p>
              </motion.div>

              {/* Right: Filter Controls */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="lg:justify-self-end"
              >
                <div className="bg-aegis-dark-gray/50 rounded-2xl p-6 border border-aegis-brown/20">
                  <h3 className="text-lg font-subheading text-aegis-white mb-4 text-center">Filter by Role</h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {roles.map((role) => (
                      <motion.button
                        key={role}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedRole(role)}
                        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                          selectedRole === role
                            ? 'bg-aegis-brown text-aegis-white shadow-lg'
                            : 'bg-aegis-dark-gray text-aegis-off-white border border-aegis-brown/50 hover:bg-aegis-brown/20'
                        }`}
                      >
                        {role}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Members Grid - Larger 3x2 Layout */}
        <section className="py-12 bg-aegis-black">
          <div className="w-full px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {filteredMembers.map((member, index) => (
                  <div className="aspect-square">
                    <CardContainer key={member.id} containerClassName="!p-0 !flex !items-stretch !justify-stretch !h-full !w-full">
                    <CardBody className="!w-full !h-full aspect-square">
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        className="relative flex flex-col items-center w-full h-full"
                      >
                        <CardItem
                          translateZ="50"
                          className="!w-full !h-full aspect-square bg-aegis-dark-gray/50 rounded-2xl border border-aegis-brown/30 hover:border-aegis-brown/50 transition-all duration-300 group flex flex-col items-center justify-between p-6"
                        >
                          {/* Name at Top Center */}
                          <CardItem translateZ="80" className="text-center flex-shrink-0">
                            <h3 className="text-3xl font-heading text-aegis-white group-hover:text-aegis-brown transition-colors line-clamp-2">
                              {member.name}
                            </h3>
                          </CardItem>

                          {/* Image Placeholder in Middle Center */}
                          <CardItem translateZ="60" className="flex items-center justify-center flex-shrink-0">
                            <div className="w-36 h-36 bg-aegis-dark-gray rounded-full border-2 border-aegis-brown/30 flex items-center justify-center">
                              <span className="text-aegis-brown text-5xl">👤</span>
                            </div>
                          </CardItem>

                          {/* Department Tags at Bottom */}
                          <CardItem translateZ="40" className="text-center flex-shrink-0 w-full">
                            <p className="text-xs text-aegis-burgundy font-medium mb-2">DEPARTMENT</p>
                            <div className="flex flex-wrap gap-1 justify-center max-w-full">
                              {member.department && (
                                <span className="px-3 py-1 bg-aegis-brown/20 text-aegis-brown rounded-full text-xs truncate max-w-full">
                                  {member.department}
                                </span>
                              )}
                              <span className="px-3 py-1 bg-aegis-brown/20 text-aegis-brown rounded-full text-xs truncate max-w-full">
                                {member.position}
                              </span>
                            </div>
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