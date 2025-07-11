import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import InteractiveHeroText from '../components/InteractiveHeroText'
import CountdownTimer from '../components/CountdownTimer'
import { CardContainer, CardBody, CardItem } from '../components/Card3D'
import ScrollReveal, { ScrollRevealText, ScrollRevealStagger, ScrollRevealSplitText } from '../components/ScrollReveal'

// Counter component for statistics
const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ 
  value, 
  suffix = '', 
  duration = 2 
}) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(counterRef, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(easeOutCubic * value))

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }

      animationFrame = requestAnimationFrame(animate)
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])

  return <span ref={counterRef}>{count}{suffix}</span>
}

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen bg-aegis-black text-aegis-white">
      {/* Hero Section - Clean obsidian black */}
      <motion.section 
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-aegis-black"
      >
        <div className="relative z-10 w-full">
          <InteractiveHeroText />
        </div>
      </motion.section>

      {/* Main Content - Horizontal Layout */}
      <section className="py-16 bg-aegis-black">
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">


          {/* Event Countdown - Vertical Layout */}
          <div className="text-center mb-12 mt-8">
            <ScrollReveal direction="up" distance={60} duration={1}>
              <ScrollRevealSplitText 
                text="EVENT COUNTDOWN" 
                className="text-4xl md:text-5xl font-bold text-aegis-brown mb-4 text-center whitespace-nowrap"
                charDelay={0.05}
              />
              <ScrollRevealText delay={0.3}>
                <p className="text-xl text-aegis-burgundy font-subheading mb-2">
                  Time until the event begins
                </p>
              </ScrollRevealText>
              <ScrollRevealText delay={0.5}>
                <div className="text-aegis-off-white font-body mb-8">
                  November 15, 2025 • 9:00 AM
                </div>
              </ScrollRevealText>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={60} duration={1} delay={0.4}>
              <CountdownTimer />
            </ScrollReveal>
          </div>

          {/* Divider Line */}
          <div className="flex justify-center mb-16">
            <div className="w-24 h-px bg-aegis-white"></div>
          </div>

          {/* Features - Horizontal Scrollable Grid */}
          <div className="space-y-8">
            <ScrollReveal direction="up" distance={50} duration={1} className="text-center">
              <ScrollRevealSplitText 
                text="Why Choose Vrontis MUN?" 
                className="text-4xl md:text-5xl font-bold text-aegis-white mb-2 text-center"
                charDelay={0.04}
              />
              <ScrollRevealText delay={0.6}>
                <p className="text-xl text-aegis-burgundy font-subheading max-w-4xl mx-auto">
                  Experience diplomatic excellence through our comprehensive Model UN conference
                </p>
              </ScrollRevealText>
            </ScrollReveal>
            {/* Features in horizontal scrollable row */}
            <ScrollRevealStagger stagger={0.15} className="overflow-x-auto flex gap-8 py-4">
              {[
                {
                  icon: '🎯',
                  title: 'Expert Moderation',
                  description: 'Led by experienced diplomats and MUN veterans who guide meaningful debates and negotiations.'
                },
                {
                  icon: '🌍',
                  title: 'Global Perspectives',
                  description: 'Diverse committees covering pressing international issues and real-world diplomatic challenges.'
                },
                {
                  icon: '🏆',
                  title: 'Leadership Development',
                  description: 'Build confidence, public speaking skills, and diplomatic expertise through immersive experiences.'
                },
                {
                  icon: '🤝',
                  title: 'Networking Opportunities',
                  description: 'Connect with like-minded students and future leaders from around the world.'
                },
                {
                  icon: '📚',
                  title: 'Educational Excellence',
                  description: 'Deepen understanding of international relations, politics, and global affairs.'
                },
                {
                  icon: '✨',
                  title: 'Memorable Experience',
                  description: 'Create lasting memories while developing skills that will benefit you throughout life.'
                }
              ].map((feature, index) => (
                <CardContainer key={feature.title} containerClassName="py-0">
                  <CardBody className="w-full h-full">
                    <div className="w-full h-full">
                      <CardItem
                        translateZ="50"
                        className="flex flex-col items-start space-y-2 p-6 bg-aegis-black/40 rounded-xl border border-aegis-brown/20 hover:border-aegis-brown/40 transition-all duration-300 min-w-[260px] w-full h-full"
                      >
                        <CardItem translateZ="80" className="text-4xl flex-shrink-0">{feature.icon}</CardItem>
                        <div>
                          <CardItem translateZ="60" as="h3" className="text-xl font-subheading text-aegis-brown mb-1">
                            {feature.title}
                          </CardItem>
                          <CardItem translateZ="40" as="p" className="text-aegis-off-white font-body leading-relaxed">
                            {feature.description}
                          </CardItem>
                        </div>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              ))}
            </ScrollRevealStagger>
          </div>

          {/* Call to Action - Horizontal */}
          <ScrollReveal direction="up" distance={60} duration={1.2} className="mt-12 py-8 bg-aegis-brown/10 rounded-2xl border border-aegis-brown/20">
            <div className="flex flex-col lg:flex-row items-center justify-between px-8 space-y-6 lg:space-y-0 lg:space-x-8">
              <ScrollReveal direction="left" distance={40} duration={0.8} delay={0.2} className="text-center lg:text-left">
                <ScrollRevealSplitText 
                  text="Ready to Shape the Future?" 
                  className="text-3xl md:text-4xl font-heading text-aegis-white mb-2"
                  charDelay={0.03}
                />
                <ScrollRevealText delay={0.5}>
                  <p className="text-lg text-aegis-burgundy font-subheading">
                    Join us for an unforgettable experience
                  </p>
                </ScrollRevealText>
              </ScrollReveal>
              <ScrollRevealStagger stagger={0.2} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/registration"
                  className="px-8 py-4 bg-aegis-brown text-aegis-white font-subheading font-semibold rounded-lg hover:bg-aegis-brown/80 transition-all duration-300 text-center"
                >
                  Register Now
                </Link>
                <Link
                  to="/committees"
                  className="px-8 py-4 border border-aegis-brown text-aegis-brown font-subheading font-semibold rounded-lg hover:bg-aegis-brown/10 transition-all duration-300 text-center"
                >
                  View Committees
                </Link>
              </ScrollRevealStagger>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

export default Home 