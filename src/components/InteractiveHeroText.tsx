import { useRef } from 'react'
import { useHeroTextSize } from '../hooks/useHeroTextSize'

const InteractiveHeroText = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const { fontSize, isCalculating } = useHeroTextSize(containerRef, textRef)

  return (
    <section className="relative w-full h-screen bg-aegis-black overflow-hidden flex items-center justify-center">
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-aegis-black/40 pointer-events-none" />
      
      {/* Main content */}
      <div 
        ref={containerRef}
        className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="text-center select-none overflow-hidden">
          {/* VRONTIS MUN - Side by Side */}
          <h1 
            ref={textRef}
            className="font-knockout leading-[0.85] tracking-tight flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap"
            style={{ 
              opacity: isCalculating ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            <span 
              className="text-aegis-white"
              style={{ 
                fontSize: `${fontSize}rem`,
                transition: 'font-size 0.3s ease-in-out'
              }}
            >
              VRONTIS
            </span>
            
            <span 
              className="text-[#ffb76d]"
              style={{ 
                fontSize: `${fontSize}rem`,
                textShadow: '0 4px 20px rgba(255, 183, 109, 0.3), 0 0 60px rgba(255, 183, 109, 0.15)',
                transition: 'font-size 0.3s ease-in-out'
              }}
            >
              MUN
            </span>
          </h1>
          
          {/* Tagline */}
          <p 
            className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 text-aegis-white font-lexend font-extrabold tracking-[0.15em] uppercase
                       text-[clamp(0.9rem,1.8vw,1.5rem)] px-4"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
          >
            Where Diplomacy Strikes Bold.
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center">
            <div className="h-1 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-transparent via-aegis-brown to-transparent" />
          </div>
        </div>
      </div>
      
      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-radial from-aegis-brown/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-radial from-aegis-burgundy/5 to-transparent pointer-events-none" />
    </section>
  )
}

export default InteractiveHeroText
