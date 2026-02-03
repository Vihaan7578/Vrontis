import { useState, useEffect } from 'react'

export interface PlatformInfo {
  isIOS: boolean
  isAndroid: boolean
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  userAgent: string
  screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  viewportHeight: number
  viewportWidth: number
  hasTouchSupport: boolean
  standalone: boolean // PWA mode
}

export const detectPlatform = (): PlatformInfo => {
  const userAgent = typeof window !== 'undefined' ? navigator.userAgent : ''
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isAndroid = /Android/.test(userAgent)
  const isMobile = /Mobi|Android/i.test(userAgent) || isIOS
  const isTablet = /iPad/.test(userAgent) || (isAndroid && !/Mobile/.test(userAgent))
  const isDesktop = !isMobile && !isTablet
  
  // Detect screen size based on viewport width
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080
  
  let screenSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'lg'
  if (viewportWidth < 640) screenSize = 'xs'
  else if (viewportWidth < 768) screenSize = 'sm'
  else if (viewportWidth < 1024) screenSize = 'md'
  else if (viewportWidth < 1280) screenSize = 'lg'
  else if (viewportWidth < 1536) screenSize = 'xl'
  else screenSize = '2xl'
  
  // Touch support detection
  const hasTouchSupport = typeof window !== 'undefined' && 
    ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  
  // PWA standalone mode detection
  const standalone = typeof window !== 'undefined' && 
    window.matchMedia('(display-mode: standalone)').matches
  
  return {
    isIOS,
    isAndroid,
    isMobile,
    isTablet,
    isDesktop,
    userAgent,
    screenSize,
    viewportHeight,
    viewportWidth,
    hasTouchSupport,
    standalone
  }
}

export const getPlatformSpecificStyles = (platform: PlatformInfo) => {
  const styles: Record<string, string> = {}
  
  // iOS specific adjustments
  if (platform.isIOS) {
    styles.touchAction = 'manipulation' // Prevent zoom on double tap
    styles.webkitTapHighlightColor = 'transparent' // Remove tap highlight
    styles.webkitUserSelect = 'none' // Prevent text selection
  }
  
  // Android specific adjustments
  if (platform.isAndroid) {
    styles.touchAction = 'manipulation'
    styles.userSelect = 'none'
  }
  
  // Mobile specific
  if (platform.isMobile) {
    styles.fontSize = '16px' // Prevent zoom on input focus
    styles.lineHeight = '1.5'
  }
  
  return styles
}

export const getViewportClasses = (platform: PlatformInfo): string => {
  const classes: string[] = []
  
  // Platform classes
  if (platform.isIOS) classes.push('platform-ios')
  if (platform.isAndroid) classes.push('platform-android')
  if (platform.isMobile) classes.push('platform-mobile')
  if (platform.isTablet) classes.push('platform-tablet')
  if (platform.isDesktop) classes.push('platform-desktop')
  if (platform.standalone) classes.push('platform-pwa')
  if (platform.hasTouchSupport) classes.push('platform-touch')
  
  // Screen size classes
  classes.push(`screen-${platform.screenSize}`)
  
  return classes.join(' ')
}

export const usePlatformDetection = () => {
  const [platform, setPlatform] = useState<PlatformInfo>(detectPlatform)
  
  useEffect(() => {
    const handleResize = () => {
      setPlatform(detectPlatform())
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])
  
  return platform
}

// Safe viewport height calculation (handles iOS Safari issues)
export const getSafeViewportHeight = (): number => {
  if (typeof window === 'undefined') return 1080
  
  // Use visualViewport if available (better for mobile)
  if (window.visualViewport) {
    return window.visualViewport.height
  }
  
  // Fallback to window.innerHeight
  return window.innerHeight
}

// Get safe area insets for devices with notches
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') {
    return { top: 0, bottom: 0, left: 0, right: 0 }
  }
  
  const style = getComputedStyle(document.documentElement)
  
  return {
    top: parseInt(style.getPropertyValue('--sat') || '0', 10),
    bottom: parseInt(style.getPropertyValue('--sab') || '0', 10),
    left: parseInt(style.getPropertyValue('--sal') || '0', 10),
    right: parseInt(style.getPropertyValue('--sar') || '0', 10)
  }
} 