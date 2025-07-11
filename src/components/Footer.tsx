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
  ]

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'LinkedIn', href: '#', icon: '💼' },
    { name: 'Twitter', href: '#', icon: '🐦' },
    { name: 'Email', href: 'mailto:info@vrontismun.com', icon: '📧' },
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
              <span className="text-aegis-burgundy">Email:</span> info@vrontismun.com
            </span>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-aegis-off-white hover:text-aegis-brown transition-colors duration-300 text-lg"
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
              <a href="#" className="text-aegis-off-white/70 hover:text-aegis-brown transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer 