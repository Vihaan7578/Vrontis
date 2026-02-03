import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import SafeAnimatePresence from './SafeAnimatePresence'

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [key, setKey] = useState(0)
  const mountedRef = useRef(true)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Safe state setter
  const safeSetState = useCallback((setter: () => void) => {
    if (mountedRef.current) {
      try {
        setter()
      } catch (error) {
        console.error('Error updating ScrollToTop state:', error)
      }
    }
  }, [])

  useEffect(() => {
    const toggleVisibility = () => {
      try {
        if (!mountedRef.current) return

        const shouldShow = window.pageYOffset > 300
        
        // Clear any pending timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
          scrollTimeoutRef.current = null
        }

        // Debounce visibility changes to prevent rapid toggling
        scrollTimeoutRef.current = setTimeout(() => {
          if (mountedRef.current) {
            safeSetState(() => {
              if (shouldShow !== isVisible) {
                setIsVisible(shouldShow)
                setKey(prev => prev + 1) // Force re-render with new key
              }
            })
          }
        }, 100)
      } catch (error) {
        console.error('Error in scroll visibility toggle:', error)
      }
    }

    try {
      window.addEventListener('scroll', toggleVisibility, { passive: true })
      return () => {
        try {
          window.removeEventListener('scroll', toggleVisibility)
        } catch (error) {
          console.error('Error removing scroll listener:', error)
        }
      }
    } catch (error) {
      console.error('Error setting up scroll listener:', error)
      return () => {}
    }
  }, [isVisible, safeSetState])

  const scrollToTop = useCallback(() => {
    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    } catch (error) {
      console.error('Error scrolling to top:', error)
      // Fallback for older browsers
      try {
        window.scrollTo(0, 0)
      } catch (fallbackError) {
        console.error('Fallback scroll failed:', fallbackError)
      }
    }
  }, [])

  // Don't render if not mounted or not visible
  if (!mountedRef.current) {
    return null
  }

  try {
    return (
      <SafeAnimatePresence mode="wait" initial={false}>
        {isVisible && (
          <motion.div
            key={`scroll-to-top-${key}`}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ 
              duration: 0.3, 
              ease: 'easeOut',
              opacity: { duration: 0.2 },
              scale: { duration: 0.3 },
              y: { duration: 0.3 }
            }}
            className="fixed bottom-8 right-8 z-40"
            style={{ 
              isolation: 'isolate',
              willChange: 'transform, opacity'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              className="p-3 bg-gradient-to-r from-aegis-brown to-aegis-burgundy rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              style={{ 
                isolation: 'isolate',
                backfaceVisibility: 'hidden'
              }}
              aria-label="Scroll to top"
            >
              {/* Main Icon */}
              <svg
                className="w-6 h-6 text-aegis-white group-hover:text-aegis-highlight transition-colors relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                style={{ pointerEvents: 'none' }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
              
              {/* Simplified glow effect */}
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-aegis-brown to-aegis-burgundy opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{ pointerEvents: 'none' }}
              />
            </motion.button>
          </motion.div>
        )}
      </SafeAnimatePresence>
    )
  } catch (error) {
    console.error('Error rendering ScrollToTop component:', error)
    return null
  }
}

export default ScrollToTop