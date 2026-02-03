import React from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

interface ContactPerson {
  name: string
  role: string
  phone: string
  instagram: string
  linkedin?: string
  image: string
}

const Contact: React.FC = () => {
  const contacts: ContactPerson[] = [
    {
      name: 'Kumari Awani',
      role: 'Founder',
      phone: '+91 8271683544',
      instagram: 'awani634',
      linkedin: 'https://www.linkedin.com/in/kumari-awani-90b0b1356',
      image: '/images/Awani Kumari.jpeg'
    },
    {
      name: 'Shalabh Sharma',
      role: 'Founder',
      phone: '+91 9718833796',
      instagram: 'shalabh568',
      image: '/images/Shalabh Sharma.jpeg'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Contact Us - Vrontis MUN</title>
        <meta name="description" content="Get in touch with the Vrontis MUN team. Contact our founders for any queries." />
      </Helmet>

      <div className="min-h-screen pt-16 overflow-x-hidden relative">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-24 right-[10%] w-40 h-40 sm:w-56 sm:h-56 bg-aegis-brown/15 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, 35, 0],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-1/2 left-[5%] w-32 h-32 sm:w-48 sm:h-48 bg-aegis-burgundy/12 rounded-full blur-3xl"
          />
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              x: [0, 15, 0]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
            className="absolute bottom-1/4 right-[20%] w-28 h-28 sm:w-40 sm:h-40 bg-aegis-brown/10 rounded-full blur-2xl"
          />
          
          {/* Decorative lines */}
          <div className="absolute top-40 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-aegis-brown/20 to-transparent" />
          <div className="absolute top-56 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-aegis-burgundy/20 to-transparent" />
        </div>

        {/* Header Section */}
        <section className="py-8 sm:py-12 lg:py-16 relative">
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
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4 sm:mb-6 bg-aegis-brown/20 rounded-full flex items-center justify-center"
              >
                <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-aegis-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </motion.div>

              <h1 
                className="font-heading text-aegis-white mb-3 sm:mb-4 lg:mb-6"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
              >
                Contact Us
              </h1>
              <p 
                className="text-aegis-burgundy font-subheading max-w-2xl mx-auto mb-4"
                style={{ fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}
              >
                Have questions? Reach out to our founders directly
              </p>
              
              {/* Decorative divider */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-aegis-brown/50" />
                <div className="w-2 h-2 bg-aegis-brown rounded-full" />
                <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-aegis-brown/50" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Cards Section */}
        <section className="py-8 sm:py-12 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {contacts.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="glass-effect rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-aegis-brown/30 hover:border-aegis-brown/50 transition-all duration-300 relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-aegis-brown/0 via-transparent to-aegis-burgundy/0 group-hover:from-aegis-brown/5 group-hover:to-aegis-burgundy/5 transition-all duration-500" />
                    
                    {/* Profile Image */}
                    <div className="flex justify-center mb-5 sm:mb-6">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-3 border-aegis-brown/40 overflow-hidden shadow-xl"
                      >
                        <img 
                          src={contact.image} 
                          alt={contact.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            target.parentElement!.innerHTML = '<span class="text-aegis-brown text-4xl flex items-center justify-center w-full h-full bg-aegis-dark-gray">👤</span>'
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Name & Role */}
                    <div className="text-center mb-5 sm:mb-6 relative z-10">
                      <h3 
                        className="font-heading text-aegis-white mb-1"
                        style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
                      >
                        {contact.name}
                      </h3>
                      <span className="px-3 py-1 bg-aegis-brown/20 text-aegis-brown rounded-full text-xs sm:text-sm font-medium">
                        {contact.role}
                      </span>
                    </div>

                    {/* Contact Links */}
                    <div className="space-y-3 sm:space-y-4 relative z-10">
                      {/* Phone */}
                      <motion.a
                        whileHover={{ x: 5 }}
                        href={`tel:${contact.phone.replace(/\s/g, '')}`}
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-aegis-dark-gray/50 rounded-xl hover:bg-aegis-dark-gray/70 transition-all duration-300 group/link"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-aegis-brown/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover/link:bg-aegis-brown/30 transition-colors">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-aegis-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-aegis-off-white/60 text-xs sm:text-sm">Phone</p>
                          <p className="text-aegis-white font-medium text-sm sm:text-base">{contact.phone}</p>
                        </div>
                      </motion.a>

                      {/* Instagram */}
                      <motion.a
                        whileHover={{ x: 5 }}
                        href={`https://instagram.com/${contact.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-aegis-dark-gray/50 rounded-xl hover:bg-aegis-dark-gray/70 transition-all duration-300 group/link"
                      >
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover/link:from-purple-500/30 group-hover/link:to-pink-500/30 transition-colors">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-aegis-off-white/60 text-xs sm:text-sm">Instagram</p>
                          <p className="text-aegis-white font-medium text-sm sm:text-base">@{contact.instagram}</p>
                        </div>
                      </motion.a>

                      {/* LinkedIn (only for Awani) */}
                      {contact.linkedin && (
                        <motion.a
                          whileHover={{ x: 5 }}
                          href={contact.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-aegis-dark-gray/50 rounded-xl hover:bg-aegis-dark-gray/70 transition-all duration-300 group/link"
                        >
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover/link:bg-blue-500/30 transition-colors">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="text-aegis-off-white/60 text-xs sm:text-sm">LinkedIn</p>
                            <p className="text-aegis-white font-medium text-sm sm:text-base">View Profile</p>
                          </div>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Email Section */}
        <section className="py-8 sm:py-12 lg:py-16 relative">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="glass-effect rounded-2xl p-6 sm:p-8 lg:p-10 border border-aegis-brown/20">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 bg-aegis-brown/20 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-aegis-brown" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 
                  className="font-heading text-aegis-white mb-2"
                  style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
                >
                  General Inquiries
                </h3>
                <p className="text-aegis-off-white/80 text-sm sm:text-base mb-4">
                  For general questions and information
                </p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:vrontismun@gmail.com"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-aegis-brown to-aegis-burgundy text-aegis-white rounded-full font-medium text-sm sm:text-base hover:from-aegis-burgundy hover:to-aegis-brown transition-all duration-300"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  vrontismun@gmail.com
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Follow Us Section */}
        <section className="py-8 sm:py-12 relative">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-aegis-off-white/60 text-sm sm:text-base mb-4">Follow us on social media</p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://instagram.com/vrontis.mun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-aegis-dark-gray/50 border border-aegis-brown/30 rounded-full text-aegis-white hover:border-aegis-brown/50 transition-all duration-300"
              >
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @vrontis.mun
              </motion.a>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Contact

