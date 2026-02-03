import { useState, useEffect } from 'react'

interface ScreenDimensions {
  width: number
  height: number
  isDesktop: boolean
  isMobile: boolean
}

export const useScreenDimensions = (): ScreenDimensions => {
  const [dimensions, setDimensions] = useState<ScreenDimensions>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080,
    isDesktop: typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isDesktop = width >= 1024 // Standard desktop breakpoint
      const isMobile = width < 1024   // Mobile/tablet breakpoint

      setDimensions({
        width,
        height,
        isDesktop,
        isMobile,
      })
    }

    // Add event listener
    window.addEventListener('resize', handleResize)
    
    // Call handler right away so state gets updated with initial window size
    handleResize()

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return dimensions
} 