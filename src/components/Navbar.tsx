import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { usePlatformDetection } from '../utils/platformDetection'
import { useNavbar } from '../contexts/NavbarContext'
import { useScreenDimensions } from '../hooks/useScreenDimensions'
import { VscHome, VscOrganization, VscCalendar, VscAccount, VscEdit, VscMail } from 'react-icons/vsc'
import { cn } from '../utils/cn'

// Mouse enter context for 3D effects
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

// 3D Navigation Item Component
const Nav3DContainer = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 15; // Reduced intensity for nav items
    const y = (e.clientY - top - height / 2) / 15;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", className)}
        style={{ perspective: "600px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative transition-all duration-200 ease-linear"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

const Nav3DItem = ({ 
  children, 
  className, 
  translateZ = 0,
  onClick,
  isActive,
  label
}: { 
  children: React.ReactNode; 
  className?: string;
  translateZ?: number;
  onClick?: () => void;
  isActive?: boolean;
  label: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useContext(MouseEnterContext) || [false];
  const [showLabel, setShowLabel] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateZ(${translateZ}px)`;
      setShowLabel(true);
    } else {
      ref.current.style.transform = `translateZ(0px)`;
      setShowLabel(false);
    }
  }, [isMouseEntered, translateZ]);

  return (
    <div className="relative group">
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-xl transition-all duration-300 cursor-pointer",
          isActive
            ? 'bg-aegis-brown/20 border border-aegis-brown/50 text-aegis-brown'
            : 'bg-white/5 border border-white/10 text-white hover:bg-aegis-brown/10 hover:border-aegis-brown/30 hover:text-aegis-brown',
          className
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
      
      {/* Expandable Label */}
      <AnimatePresence>
        {showLabel && (
          <motion.div
            ref={labelRef}
            initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-1/2 mt-3 px-4 py-2 bg-aegis-black/95 text-aegis-white text-sm font-medium rounded-lg border border-aegis-brown/30 whitespace-nowrap z-50 shadow-lg"
            style={{
              transformStyle: "preserve-3d",
              transform: "translateX(-50%) translateZ(20px)"
            }}
          >
            {label}
            {/* Arrow pointing up */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-aegis-brown/30"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const platform = usePlatformDetection()
  const { isNavbarVisible } = useNavbar()
  const navigate = useNavigate()
  const location = useLocation()
  const { isDesktop, isMobile } = useScreenDimensions()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      // Close mobile menu when scrolling
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobileMenuOpen])

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Navigation items
  const navItems = [
    { icon: <VscHome size={18} />, label: 'Home', path: '/' },
    { icon: <VscOrganization size={18} />, label: 'Committees', path: '/committees' },
    { icon: <VscCalendar size={18} />, label: 'Agendas', path: '/agendas' },
    { icon: <VscAccount size={18} />, label: 'Team', path: '/team' },
    { icon: <VscEdit size={18} />, label: 'Register', path: '/registration' },
    { icon: <VscMail size={18} />, label: 'Contact', path: '/contact' },
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
    setIsMobileMenuOpen(false) // Close mobile menu when navigating
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <AnimatePresence>
      {isNavbarVisible && (
        <motion.nav
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            isScrolled
              ? 'bg-aegis-black/95 shadow-lg border-b border-aegis-brown/20'
              : 'bg-transparent'
          }`}
        >
          <div className="w-full px-6 lg:px-12">
            <div className={`flex items-center justify-between ${platform.isMobile ? 'h-16' : 'h-18'}`}>
              {/* Logo - Left Aligned */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-shrink-0"
              >
                <Link
                  to="/"
                  className="flex items-center space-x-3 group"
                >
                  {/* Vrontis Logo Image */}
                  <div className="h-10 flex items-center">
                    <img 
                      src="/images/vrontis logo.png" 
                      alt="Vrontis MUN Logo" 
                      className="h-10 w-auto object-contain group-hover:opacity-80 transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Logo text */}
                  <div className="flex flex-col">
                    <span className={`${platform.isMobile ? 'text-lg' : 'text-xl sm:text-2xl'} font-logo text-aegis-white group-hover:text-aegis-brown transition-colors duration-300`}>
                      Vrontis MUN
                    </span>
                    <span className="text-xs text-aegis-burgundy font-body opacity-80">
                      Diplomatic Excellence
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Desktop Navigation - Shown for screens > 1901x1319 */}
              {isDesktop && (
                <div className="flex items-center space-x-2 lg:space-x-3">
                  {navItems.map((item, index) => (
                    <Nav3DContainer key={index}>
                      <Nav3DItem
                        translateZ={30}
                        onClick={() => handleNavigation(item.path)}
                        isActive={location.pathname === item.path}
                        label={item.label}
                      >
                        {item.icon}
                      </Nav3DItem>
                    </Nav3DContainer>
                  ))}
                </div>
              )}

              {/* Mobile Hamburger Menu Button - Shown for screens ≤ 1901x1319 */}
              {isMobile && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleMobileMenu}
                  className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-aegis-brown/10 hover:border-aegis-brown/30 hover:text-aegis-brown transition-all duration-300"
                >
                  <motion.div
                    animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-0.5 bg-current mb-1"
                  />
                  <motion.div
                    animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-0.5 bg-current mb-1"
                  />
                  <motion.div
                    animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-0.5 bg-current"
                  />
                </motion.button>
              )}
            </div>
          </div>

          {/* Mobile Menu Overlay - Only shown for screens ≤ 1901x1319 */}
          <AnimatePresence>
            {isMobileMenuOpen && isMobile && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                  onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Mobile Menu */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="fixed top-0 right-0 h-full w-80 max-w-[85%] bg-aegis-black/95 border-l border-aegis-brown/20 shadow-2xl z-50 flex flex-col"
                >
                  {/* Mobile Menu Header */}
                  <div className="flex items-center justify-between p-6 border-b border-aegis-brown/20">
                    <div className="flex items-center space-x-3">
                      <img 
                        src="/images/vrontis logo.png" 
                        alt="Vrontis MUN Logo" 
                        className="h-8 w-auto object-contain"
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-logo text-aegis-white">
                          Vrontis MUN
                        </span>
                        <span className="text-xs text-aegis-burgundy font-body opacity-80">
                          Diplomatic Excellence
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-aegis-brown/10 hover:border-aegis-brown/30 hover:text-aegis-brown transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Mobile Navigation Items */}
                  <div className="flex-1 py-6">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleNavigation(item.path)}
                          className={`w-full flex items-center space-x-4 px-6 py-4 text-left transition-all duration-300 hover:bg-aegis-brown/10 border-l-4 ${
                            location.pathname === item.path
                              ? 'border-aegis-brown bg-aegis-brown/5 text-aegis-brown'
                              : 'border-transparent text-aegis-white hover:border-aegis-brown/50 hover:text-aegis-brown'
                          }`}
                        >
                          <div className="text-xl">
                            {item.icon}
                          </div>
                          <span className="text-lg font-medium">
                            {item.label}
                          </span>
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile Menu Footer */}
                  <div className="p-6 border-t border-aegis-brown/20">
                    <p className="text-center text-sm text-aegis-burgundy opacity-80">
                      © 2024 Vrontis MUN
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default Navbar 