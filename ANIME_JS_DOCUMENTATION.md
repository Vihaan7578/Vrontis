# Anime.js Documentation for React Integration

## Table of Contents
- [Installation & Setup](#installation--setup)
- [Basic Integration Patterns](#basic-integration-patterns)
- [Animation Types](#animation-types)
  - [Button & Form Effects](#button--form-effects)
  - [Page Movement Effects](#page-movement-effects)
  - [Scroll Reveal Effects](#scroll-reveal-effects)
  - [Loading Effects](#loading-effects)
  - [Hover & Click Effects](#hover--click-effects)
  - [Chart & Graphics Effects](#chart--graphics-effects)
  - [Multi-Step Effects](#multi-step-effects)
- [Advanced Patterns](#advanced-patterns)
- [Performance Optimization](#performance-optimization)
- [TypeScript Integration](#typescript-integration)
- [Troubleshooting](#troubleshooting)

## Installation & Setup

### Installation
```bash
npm install animejs
npm install @types/animejs  # For TypeScript
```

### Basic Import Patterns
```tsx
// Full library import
import anime from 'animejs/lib/anime.es.js'

// Modular imports (recommended for bundle size)
import { animate } from 'animejs'
import { createTimeline } from 'animejs'
import { createDraggable } from 'animejs'
import { createScrollObserver } from 'animejs'
import { stagger } from 'animejs'
```

### React Hook Setup
```tsx
import { useRef, useEffect, useCallback } from 'react'
import anime from 'animejs/lib/anime.es.js'

// Basic animation hook
const useAnimeRef = () => {
  const animationRef = useRef<anime.AnimeInstance | null>(null)
  
  const play = useCallback(() => animationRef.current?.play(), [])
  const pause = useCallback(() => animationRef.current?.pause(), [])
  const restart = useCallback(() => animationRef.current?.restart(), [])
  
  return { animationRef, play, pause, restart }
}
```

## Basic Integration Patterns

### 1. useEffect Animation Pattern
```tsx
const MyComponent = () => {
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (elementRef.current) {
      anime({
        targets: elementRef.current,
        translateX: 250,
        duration: 2000,
        easing: 'easeInOutQuad'
      })
    }
  }, [])
  
  return <div ref={elementRef}>Animated Element</div>
}
```

### 2. Controlled Animation Hook
```tsx
const useControlledAnimation = (config: anime.AnimeParams) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const animationRef = useRef<anime.AnimeInstance | null>(null)
  
  const play = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.play()
      setIsPlaying(true)
    }
  }, [])
  
  const pause = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause()
      setIsPlaying(false)
    }
  }, [])
  
  useEffect(() => {
    animationRef.current = anime({
      ...config,
      autoplay: false,
      complete: () => setIsPlaying(false)
    })
    
    return () => animationRef.current?.pause()
  }, [config])
  
  return { play, pause, isPlaying }
}
```

## Animation Types

### Button & Form Effects

#### Button Press Effect (Squeeze & Release)
```tsx
const AnimatedButton: React.FC<{ children: React.ReactNode, onClick?: () => void }> = ({ children, onClick }) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const handleClick = () => {
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        scale: [1, 0.95, 1],
        duration: 200,
        easing: 'easeOutQuad'
      })
    }
    onClick?.()
  }
  
  return (
    <button ref={buttonRef} onClick={handleClick} className="transform-gpu">
      {children}
    </button>
  )
}
```

#### Error Shake Effect
```tsx
const AnimatedInput = ({ error, ...props }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    if (error && inputRef.current) {
      anime({
        targets: inputRef.current,
        translateX: [0, 10, -10, 10, -10, 0],
        duration: 500,
        easing: 'easeInOutQuad'
      })
    }
  }, [error])
  
  return (
    <input 
      ref={inputRef} 
      className={`transform-gpu ${error ? 'border-red-500' : ''}`}
      {...props} 
    />
  )
}
```

#### Spinning Loader
```tsx
const LoadingSpinner = () => {
  const spinnerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<anime.AnimeInstance | null>(null)
  
  useEffect(() => {
    if (spinnerRef.current) {
      animationRef.current = anime({
        targets: spinnerRef.current,
        rotate: 360,
        duration: 1000,
        loop: true,
        easing: 'linear'
      })
    }
    
    return () => animationRef.current?.pause()
  }, [])
  
  return <div ref={spinnerRef} className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full" />
}
```

### Page Movement Effects

#### Page Slide In/Out
```tsx
const usePageTransition = () => {
  const pageRef = useRef<HTMLDivElement>(null)
  
  const slideIn = useCallback(() => {
    if (pageRef.current) {
      anime({
        targets: pageRef.current,
        translateX: [100, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuad'
      })
    }
  }, [])
  
  const slideOut = useCallback(() => {
    if (pageRef.current) {
      return anime({
        targets: pageRef.current,
        translateX: [0, -100],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad'
      }).finished
    }
  }, [])
  
  return { pageRef, slideIn, slideOut }
}
```

#### Pop-up Fade In/Out
```tsx
const AnimatedModal = ({ isOpen, onClose, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (isOpen) {
      // Enter animation
      anime.timeline()
        .add({
          targets: overlayRef.current,
          opacity: [0, 1],
          duration: 200,
          easing: 'easeOutQuad'
        })
        .add({
          targets: modalRef.current,
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 300,
          easing: 'easeOutBack'
        }, '-=100')
    }
  }, [isOpen])
  
  const handleClose = async () => {
    // Exit animation
    await anime.timeline()
      .add({
        targets: modalRef.current,
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInQuad'
      })
      .add({
        targets: overlayRef.current,
        opacity: [1, 0],
        duration: 150,
        easing: 'easeInQuad'
      }, '-=100')
      .finished
    
    onClose()
  }
  
  if (!isOpen) return null
  
  return (
    <div ref={overlayRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white rounded-lg p-6">
        {children}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}
```

### Scroll Reveal Effects

#### Fade In When Scrolled Into View
```tsx
const useScrollReveal = (options = {}) => {
  const elementRef = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [50, 0],
              duration: 800,
              easing: 'easeOutQuad',
              ...options
            })
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(element)
    
    return () => observer.disconnect()
  }, [options])
  
  return elementRef
}
```

#### Background Movement on Scroll
```tsx
const ParallaxElement = ({ children, speed = 0.5 }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const scrolled = window.pageYOffset
        const translate = scrolled * speed
        
        anime({
          targets: elementRef.current,
          translateY: translate,
          duration: 0,
          easing: 'linear'
        })
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])
  
  return <div ref={elementRef}>{children}</div>
}
```

### Loading Effects

#### Progress Bar Fill
```tsx
const AnimatedProgressBar = ({ progress = 0 }) => {
  const barRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (barRef.current) {
      anime({
        targets: barRef.current,
        width: `${progress}%`,
        duration: 500,
        easing: 'easeOutQuad'
      })
    }
  }, [progress])
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div ref={barRef} className="bg-blue-500 h-2 rounded-full w-0" />
    </div>
  )
}
```

#### Number Count Up
```tsx
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [current, setCurrent] = useState(0)
  const countRef = useRef({ value: 0 })
  
  useEffect(() => {
    anime({
      targets: countRef.current,
      value: target,
      duration,
      easing: 'easeOutQuad',
      update: () => setCurrent(Math.round(countRef.current.value))
    })
  }, [target, duration])
  
  return <span>{current.toLocaleString()}</span>
}
```

### Hover & Click Effects

#### Card Lift on Hover
```tsx
const HoverCard = ({ children }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const shadowRef = useRef<HTMLDivElement>(null)
  
  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      translateY: -10,
      duration: 300,
      easing: 'easeOutQuad'
    })
    
    anime({
      targets: shadowRef.current,
      opacity: [0.1, 0.3],
      scale: [1, 1.05],
      duration: 300,
      easing: 'easeOutQuad'
    })
  }
  
  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      translateY: 0,
      duration: 300,
      easing: 'easeOutQuad'
    })
    
    anime({
      targets: shadowRef.current,
      opacity: [0.3, 0.1],
      scale: [1.05, 1],
      duration: 300,
      easing: 'easeOutQuad'
    })
  }
  
  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={shadowRef} className="absolute inset-0 bg-black opacity-10 rounded-lg -z-10" />
      <div ref={cardRef} className="bg-white rounded-lg p-6 transform-gpu">
        {children}
      </div>
    </div>
  )
}
```

#### Drag & Drop Effect
```tsx
const DraggableElement = ({ children }) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const draggableRef = useRef<any>(null)
  
  useEffect(() => {
    if (elementRef.current) {
      draggableRef.current = anime.draggable(elementRef.current, {
        container: 'body',
        cursor: 'grab',
        onGrab: () => {
          anime({
            targets: elementRef.current,
            scale: 1.1,
            duration: 200,
            easing: 'easeOutQuad'
          })
        },
        onRelease: () => {
          anime({
            targets: elementRef.current,
            scale: 1,
            duration: 200,
            easing: 'easeOutQuad'
          })
        }
      })
    }
    
    return () => draggableRef.current?.disable()
  }, [])
  
  return (
    <div ref={elementRef} className="inline-block transform-gpu">
      {children}
    </div>
  )
}
```

### Chart & Graphics Effects

#### Growing Bar Chart
```tsx
const AnimatedBarChart = ({ data }) => {
  const barsRef = useRef<(HTMLDivElement | null)[]>([])
  
  useEffect(() => {
    const timeline = anime.timeline()
    
    data.forEach((item, index) => {
      timeline.add({
        targets: barsRef.current[index],
        height: `${item.value}%`,
        backgroundColor: `hsl(${200 + index * 30}, 70%, 50%)`,
        duration: 800,
        easing: 'easeOutQuad'
      }, index * 100)
    })
  }, [data])
  
  return (
    <div className="flex items-end space-x-2 h-64">
      {data.map((item, index) => (
        <div key={item.id} className="flex flex-col items-center">
          <div
            ref={el => barsRef.current[index] = el}
            className="w-12 bg-blue-500 transform-gpu"
            style={{ height: '0%' }}
          />
          <span className="mt-2 text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  )
}
```

#### Line Drawing Effect
```tsx
const AnimatedPath = ({ pathData }) => {
  const pathRef = useRef<SVGPathElement>(null)
  
  useEffect(() => {
    if (pathRef.current) {
      const path = pathRef.current
      const pathLength = path.getTotalLength()
      
      // Set up the starting positions
      path.style.strokeDasharray = pathLength.toString()
      path.style.strokeDashoffset = pathLength.toString()
      
      anime({
        targets: path,
        strokeDashoffset: [pathLength, 0],
        duration: 2000,
        easing: 'easeInOutQuad'
      })
    }
  }, [pathData])
  
  return (
    <svg width="200" height="200">
      <path
        ref={pathRef}
        d={pathData}
        stroke="#3b82f6"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  )
}
```

### Multi-Step Effects

#### Sequence Animation Chain
```tsx
const ComplexSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const runSequence = () => {
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 750
    })
    
    // Step 1: Fade in container
    timeline.add({
      targets: containerRef.current,
      opacity: [0, 1],
      duration: 500
    })
    
    // Step 2: Animate children in sequence
    timeline.add({
      targets: '.sequence-item',
      translateY: [50, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600
    }, '-=300')
    
    // Step 3: Final flourish
    timeline.add({
      targets: '.sequence-item',
      scale: [1, 1.05, 1],
      duration: 400,
      delay: anime.stagger(50, {from: 'center'})
    })
  }
  
  return (
    <div ref={containerRef} className="opacity-0">
      <button onClick={runSequence}>Start Sequence</button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {Array.from({length: 9}).map((_, i) => (
          <div key={i} className="sequence-item bg-blue-500 h-16 rounded" />
        ))}
      </div>
    </div>
  )
}
```

#### Wave Effect (Items Appear One by One)
```tsx
const StaggeredList = ({ items }) => {
  const listRef = useRef<HTMLUListElement>(null)
  
  useEffect(() => {
    if (listRef.current) {
      anime({
        targets: '.list-item',
        translateX: [-50, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(100),
        easing: 'easeOutQuad'
      })
    }
  }, [items])
  
  return (
    <ul ref={listRef}>
      {items.map((item, index) => (
        <li key={item.id} className="list-item opacity-0 transform">
          {item.content}
        </li>
      ))}
    </ul>
  )
}
```

## Advanced Patterns

### Motion Styles (Custom Speed Curves)
```tsx
// Bouncy motion style
const springEasing = anime.bezier(0.175, 0.885, 0.32, 1.275)

// Stretchy motion style
const elasticEasing = anime.bezier(0.68, -0.55, 0.265, 1.55)

const useCustomEasing = () => {
  return {
    spring: springEasing,
    elastic: elasticEasing,
    bounce: 'easeOutBounce',
    back: 'easeOutBack'
  }
}
```

### Combining Multiple Animations
```tsx
const useAnimationComposition = () => {
  const compose = (...animations: anime.AnimeParams[]) => {
    return anime.timeline().add(animations)
  }
  
  const parallel = (...animations: anime.AnimeParams[]) => {
    return Promise.all(animations.map(anim => anime(anim).finished))
  }
  
  const sequence = async (...animations: anime.AnimeParams[]) => {
    for (const anim of animations) {
      await anime(anim).finished
    }
  }
  
  return { compose, parallel, sequence }
}
```

### Smooth Animation System
```tsx
const useOptimizedAnimation = (config: anime.AnimeParams) => {
  const animationRef = useRef<anime.AnimeInstance | null>(null)
  const isPlayingRef = useRef(false)
  
  const play = useCallback(() => {
    if (!isPlayingRef.current) {
      isPlayingRef.current = true
      
      if (animationRef.current) {
        animationRef.current.play()
      } else {
        animationRef.current = anime({
          ...config,
          complete: () => {
            isPlayingRef.current = false
          }
        })
      }
    }
  }, [config])
  
  const cleanup = useCallback(() => {
    if (animationRef.current) {
      animationRef.current.pause()
      animationRef.current = null
    }
    isPlayingRef.current = false
  }, [])
  
  useEffect(() => cleanup, [cleanup])
  
  return { play, cleanup }
}
```

## Performance Optimization

### Best Practices
1. **Use `transform-gpu` class for hardware acceleration**
2. **Batch DOM queries and animations**
3. **Clean up animations in useEffect cleanup**
4. **Use `will-change` CSS property sparingly**
5. **Prefer transforms over position changes**

### Optimization Utilities
```tsx
// Batch animations for better performance
const useBatchedAnimations = () => {
  const animationQueue = useRef<(() => void)[]>([])
  const isProcessing = useRef(false)
  
  const addAnimation = useCallback((animationFn: () => void) => {
    animationQueue.current.push(animationFn)
    
    if (!isProcessing.current) {
      isProcessing.current = true
      requestAnimationFrame(() => {
        animationQueue.current.forEach(fn => fn())
        animationQueue.current = []
        isProcessing.current = false
      })
    }
  }, [])
  
  return { addAnimation }
}

// Memory-efficient animation hook
const useMemoryEfficientAnimation = () => {
  const animationsRef = useRef<Set<anime.AnimeInstance>>(new Set())
  
  const createAnimation = useCallback((config: anime.AnimeParams) => {
    const animation = anime(config)
    animationsRef.current.add(animation)
    
    animation.finished.then(() => {
      animationsRef.current.delete(animation)
    })
    
    return animation
  }, [])
  
  useEffect(() => {
    return () => {
      animationsRef.current.forEach(anim => anim.pause())
      animationsRef.current.clear()
    }
  }, [])
  
  return { createAnimation }
}
```

## TypeScript Integration

### Type Definitions
```tsx
interface AnimationParams extends anime.AnimeParams {
  targets: string | Element | Element[] | NodeList
}

interface AnimationHookReturn {
  play: () => void
  pause: () => void
  restart: () => void
  isPlaying: boolean
}

interface StaggerConfig {
  value: number
  from?: 'first' | 'last' | 'center' | number
  direction?: 'normal' | 'reverse'
  easing?: string
}

// Typed animation hook
const useTypedAnimation = (config: AnimationParams): AnimationHookReturn => {
  // Implementation...
}
```

### Generic Animation Hook
```tsx
interface AnimationTarget {
  element: HTMLElement | null
  config: anime.AnimeParams
}

const useGenericAnimation = <T extends HTMLElement>() => {
  const elementRef = useRef<T>(null)
  const animationRef = useRef<anime.AnimeInstance | null>(null)
  
  const animate = useCallback((config: Omit<anime.AnimeParams, 'targets'>) => {
    if (elementRef.current) {
      animationRef.current = anime({
        targets: elementRef.current,
        ...config
      })
    }
  }, [])
  
  return { elementRef, animate }
}
```

## Troubleshooting

### Common Issues and Solutions

1. **Animation not starting**
   ```tsx
   // Problem: Element not found
   useEffect(() => {
     const element = elementRef.current
     if (!element) return // Add null check
     
     anime({
       targets: element,
       // ... config
     })
   }, [])
   ```

2. **Memory leaks**
   ```tsx
   // Solution: Proper cleanup
   useEffect(() => {
     const animation = anime({
       // ... config
     })
     
     return () => animation.pause() // Cleanup
   }, [])
   ```

3. **Performance issues**
   ```tsx
   // Solution: Use transform properties
   anime({
     targets: '.element',
     translateX: 100, // Instead of left: 100
     scale: 1.2,      // Instead of width/height changes
     duration: 300
   })
   ```

4. **React strict mode issues**
   ```tsx
   // Solution: Use refs to prevent double execution
   const hasAnimated = useRef(false)
   
   useEffect(() => {
     if (hasAnimated.current) return
     hasAnimated.current = true
     
     // Animation code
   }, [])
   ```

### Debug Utilities
```tsx
const useAnimationDebugger = () => {
  const logAnimation = (name: string, config: anime.AnimeParams) => {
    console.log(`Animation ${name}:`, config)
    
    return anime({
      ...config,
      begin: () => console.log(`${name} started`),
      complete: () => console.log(`${name} completed`),
      update: (anim) => console.log(`${name} progress:`, anim.progress)
    })
  }
  
  return { logAnimation }
}
```

---

*This documentation serves as a comprehensive reference for integrating anime.js animations into React applications, covering common use cases, performance optimization, and best practices.* 