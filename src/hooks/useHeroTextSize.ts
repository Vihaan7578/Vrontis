import { useState, useEffect, useRef, RefObject } from 'react'

interface HeroTextSize {
  fontSize: number // in rem
  isCalculating: boolean
}

/**
 * Custom hook that calculates optimal font size for hero text based on container dimensions
 * Uses ResizeObserver to track container size changes and calculates font size to fill the screen
 * 
 * @param containerRef - Ref to the container element
 * @param textRef - Ref to the text element (optional, for more precise calculations)
 * @returns Object with fontSize (in rem) and isCalculating flag
 */
export const useHeroTextSize = (
  containerRef: RefObject<HTMLElement>,
  textRef?: RefObject<HTMLElement>
): HeroTextSize => {
  const [fontSize, setFontSize] = useState<number>(8) // Start with 8rem
  const [isCalculating, setIsCalculating] = useState<boolean>(true)
  const observerRef = useRef<ResizeObserver | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const calculateOptimalFontSize = () => {
      const container = containerRef.current
      if (!container) return

      setIsCalculating(true)

      // Use requestAnimationFrame to ensure layout is complete
      requestAnimationFrame(() => {
        if (!container) return

        // Get container dimensions
        const containerRect = container.getBoundingClientRect()
        const containerWidth = containerRect.width
        const containerHeight = containerRect.height

        // Skip if container has no dimensions
        if (containerWidth === 0 || containerHeight === 0) {
          setIsCalculating(false)
          return
        }

        // Get padding from computed styles
        const styles = window.getComputedStyle(container)
        const paddingX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight)
        const paddingY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom)

        // Available space (accounting for padding)
        const availableWidth = containerWidth - paddingX
        const availableHeight = containerHeight - paddingY

        // Account for tagline and spacing (reserve about 20% of height for tagline)
        const textAreaHeight = availableHeight * 0.75

        // Try to measure actual text if textRef is available
        if (textRef?.current) {
          // Get the font family from the element
          const textStyles = window.getComputedStyle(textRef.current)
          const fontFamily = textStyles.fontFamily
          const letterSpacing = textStyles.letterSpacing || 'normal'

          // Create temporary spans to measure text width
          const tempVrontis = document.createElement('span')
          const tempMun = document.createElement('span')

          tempVrontis.style.visibility = 'hidden'
          tempVrontis.style.position = 'absolute'
          tempVrontis.style.whiteSpace = 'nowrap'
          tempVrontis.style.fontFamily = fontFamily
          tempVrontis.style.fontWeight = 'normal'
          tempVrontis.style.letterSpacing = letterSpacing
          tempVrontis.textContent = 'VRONTIS'

          tempMun.style.visibility = 'hidden'
          tempMun.style.position = 'absolute'
          tempMun.style.whiteSpace = 'nowrap'
          tempMun.style.fontFamily = fontFamily
          tempMun.style.fontWeight = 'normal'
          tempMun.style.letterSpacing = letterSpacing
          tempMun.textContent = 'MUN'

          document.body.appendChild(tempVrontis)
          document.body.appendChild(tempMun)

          // Binary search for optimal font size
          let minSize = 3 // Minimum 3rem
          let maxSize = 25 // Maximum 25rem
          let optimalSize = minSize

          // Calculate gap size based on screen width (matches Tailwind breakpoints)
          // gap-2 (0.5rem = 8px) on mobile, gap-4 (1rem = 16px) sm, gap-6 (1.5rem = 24px) md, gap-8 (2rem = 32px) lg
          let gapSize = 8 // Default mobile gap
          if (containerWidth >= 640) gapSize = 16 // sm
          if (containerWidth >= 768) gapSize = 24 // md
          if (containerWidth >= 1024) gapSize = 32 // lg

          // Try different font sizes to find the best fit
          for (let i = 0; i < 25; i++) {
            const testSize = (minSize + maxSize) / 2
            tempVrontis.style.fontSize = `${testSize}rem`
            tempVrontis.style.lineHeight = '0.85'
            tempMun.style.fontSize = `${testSize}rem`
            tempMun.style.lineHeight = '0.85'

            // Measure both texts
            const vrontisWidth = tempVrontis.offsetWidth
            const munWidth = tempMun.offsetWidth
            const textHeight = tempVrontis.offsetHeight * 0.85 // Account for line height

            // For horizontal layout (sm and above), texts are side by side
            // For vertical layout (mobile), texts stack
            const isMobile = containerWidth < 640
            const totalWidth = isMobile
              ? Math.max(vrontisWidth, munWidth) // Take the wider one for mobile
              : vrontisWidth + gapSize + munWidth // Sum + gap for desktop

            // Check if it fits within available space
            const fitsWidth = totalWidth <= availableWidth * 0.92
            const fitsHeight = textHeight <= textAreaHeight

            if (fitsWidth && fitsHeight) {
              optimalSize = testSize
              minSize = testSize
            } else {
              maxSize = testSize
            }

            // Break if we're close enough
            if (Math.abs(maxSize - minSize) < 0.05) break
          }

          document.body.removeChild(tempVrontis)
          document.body.removeChild(tempMun)

          // Ensure minimum size
          optimalSize = Math.max(3, optimalSize)
          setFontSize(optimalSize)
        } else {
          // Fallback calculation using viewport units and available space
          // Consider both width and height, use the more restrictive constraint
          const widthBasedSize = (availableWidth * 0.32) / 16 // Convert px to rem
          const heightBasedSize = (textAreaHeight * 0.8) / 16 // Convert px to rem, account for line height

          // Use the smaller value to ensure it fits, but with a minimum and maximum
          const calculatedSize = Math.min(widthBasedSize, heightBasedSize)
          const clampedSize = Math.max(4, Math.min(22, calculatedSize)) // Clamp between 4rem and 22rem

          setFontSize(clampedSize)
        }

        setIsCalculating(false)
      })
    }

    // Initial calculation with small delay to ensure DOM is ready
    const initialTimeout = setTimeout(calculateOptimalFontSize, 50)

    // Set up ResizeObserver
    observerRef.current = new ResizeObserver(() => {
      // Debounce resize calculations
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(() => {
        calculateOptimalFontSize()
      }, 150) // 150ms debounce
    })

    observerRef.current.observe(containerRef.current)

    // Also listen to window resize for orientation changes
    const handleResize = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      timeoutRef.current = setTimeout(calculateOptimalFontSize, 200)
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      clearTimeout(initialTimeout)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [containerRef, textRef])

  return { fontSize, isCalculating }
}

