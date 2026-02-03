import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  distance?: number
  duration?: number
  delay?: number
  trigger?: string
  start?: string
  end?: string
  stagger?: number
  className?: string
  once?: boolean
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 50,
  duration = 1,
  delay = 0,
  start = 'top 80%',
  end = 'bottom 20%',
  stagger = 0,
  className = '',
  once = true
}) => {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    // Get all child elements for stagger effect
    const children = element.children
    const targets = stagger > 0 ? Array.from(children) : element

    // Set initial state based on direction
    let initialState: any = { opacity: 0 }
    
    switch (direction) {
      case 'up':
        initialState.y = distance
        break
      case 'down':
        initialState.y = -distance
        break
      case 'left':
        initialState.x = distance
        break
      case 'right':
        initialState.x = -distance
        break
      case 'fade':
        // Only opacity animation
        break
    }

    // Set initial state
    gsap.set(targets, initialState)

    // Create the reveal animation
    const animation = gsap.to(targets, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: duration,
      delay: delay,
      ease: 'power2.out',
      stagger: stagger > 0 ? stagger : 0,
      scrollTrigger: {
        trigger: element,
        start: start,
        end: end,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
        // markers: true, // Uncomment for debugging
      }
    })

    // Cleanup function
    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === element) {
          trigger.kill()
        }
      })
    }
  }, [direction, distance, duration, delay, start, end, stagger, once])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Specialized components for common use cases
export const ScrollRevealText: React.FC<{
  children: React.ReactNode
  className?: string
  delay?: number
}> = ({ children, className = '', delay = 0 }) => (
  <ScrollReveal
    direction="up"
    distance={30}
    duration={0.8}
    delay={delay}
    className={className}
  >
    {children}
  </ScrollReveal>
)

export const ScrollRevealStagger: React.FC<{
  children: React.ReactNode
  stagger?: number
  className?: string
}> = ({ children, stagger = 0.1, className = '' }) => (
  <ScrollReveal
    direction="up"
    distance={40}
    duration={0.6}
    stagger={stagger}
    className={className}
  >
    {children}
  </ScrollReveal>
)

export const ScrollRevealFade: React.FC<{
  children: React.ReactNode
  className?: string
  delay?: number
}> = ({ children, className = '', delay = 0 }) => (
  <ScrollReveal
    direction="fade"
    duration={1.2}
    delay={delay}
    className={className}
  >
    {children}
  </ScrollReveal>
)

// Split text component for character-by-character reveals
export const ScrollRevealSplitText: React.FC<{
  text: string
  className?: string
  charDelay?: number
}> = ({ text, className = '', charDelay = 0.03 }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Split text into individual characters
    const chars = text.split('').map((char) => (
      char === ' ' ? '&nbsp;' : char
    ))

    // Create span elements for each character
    container.innerHTML = chars
      .map(char => `<span style="display: inline-block;">${char}</span>`)
      .join('')

    const charElements = container.querySelectorAll('span')

    // Set initial state
    gsap.set(charElements, {
      opacity: 0,
      y: 20,
      rotationX: -90
    })

    // Animate characters
    gsap.to(charElements, {
      opacity: 1,
      y: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      stagger: charDelay,
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill()
        }
      })
    }
  }, [text, charDelay])

  return <div ref={containerRef} className={className}></div>
}

export default ScrollReveal 