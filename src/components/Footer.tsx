import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { name: 'Home', path: '/' },
    { name: 'Committees', path: '/committees' },
    { name: 'Agendas', path: '/agendas' },
    { name: 'Team', path: '/team' },
    { name: 'Registration', path: '/registration' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com/vrontis.mun',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'Email',
      href: 'mailto:vrontismun@gmail.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
  ]

  return (
    <footer className="bg-aegis-black border-t border-aegis-brown/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Main Footer Content - Horizontal Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0 lg:space-x-12 mb-8"
        >
          {/* Brand Section */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/vrontis logo.png"
              alt="Vrontis MUN Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h3 className="text-xl font-heading text-aegis-white">Vrontis MUN</h3>
              <p className="text-sm text-aegis-burgundy">Diplomatic Excellence</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-aegis-off-white hover:text-aegis-brown transition-colors duration-300 text-sm whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact & Social */}
          <div className="flex items-center space-x-6">
            <span className="text-aegis-off-white text-sm">
              <span className="text-aegis-burgundy">Email:</span> vrontismun@gmail.com
            </span>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="text-aegis-off-white hover:text-aegis-brown transition-colors duration-300"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-aegis-brown/20 pt-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-aegis-off-white/70 text-sm">
              © {currentYear} Vrontis Model United Nations. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-aegis-off-white/70 hover:text-aegis-brown transition-colors">
                Privacy Policy
              </a>
              <Link to="/terms-of-service" className="text-aegis-off-white/70 hover:text-aegis-brown transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 