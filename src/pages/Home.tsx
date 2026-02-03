import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import InteractiveHeroText from '../components/InteractiveHeroText'
import CountdownTimer from '../components/CountdownTimer'
import { CardContainer, CardBody, CardItem } from '../components/Card3D'
import ScrollReveal, { ScrollRevealText, ScrollRevealStagger, ScrollRevealSplitText } from '../components/ScrollReveal'



const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div ref={containerRef} className="min-h-screen text-aegis-white overflow-x-hidden">
      {/* Hero Section - Clean obsidian black */}
      <motion.section
        style={{ y, opacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 w-full">
          <InteractiveHeroText />
        </div>
      </motion.section>

      {/* Main Content - Responsive Layout */}
      <section className="py-8 sm:py-12 lg:py-16 overflow-x-hidden">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Event Countdown - Vertical Layout */}
          <div className="text-center mb-8 sm:mb-12 mt-4 sm:mt-8">
            <ScrollReveal direction="up" distance={60} duration={1}>
              <ScrollRevealSplitText
                text="EVENT COUNTDOWN"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-aegis-brown mb-2 sm:mb-4 text-center"
                charDelay={0.05}
              />
              <ScrollRevealText delay={0.3}>
                <p className="text-base sm:text-lg lg:text-xl text-aegis-burgundy font-subheading mb-1 sm:mb-2">
                  Time until the event begins
                </p>
              </ScrollRevealText>
              <ScrollRevealText delay={0.5}>
                <div className="text-sm sm:text-base text-aegis-off-white font-body mb-4 sm:mb-6 lg:mb-8">
                  June 6-7, 2026 • 9:00 AM
                </div>
              </ScrollRevealText>
            </ScrollReveal>
            <ScrollReveal direction="up" distance={60} duration={1} delay={0.4}>
              <CountdownTimer />
            </ScrollReveal>
          </div>

          {/* Divider Line */}
          <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
            <div className="w-16 sm:w-24 h-px bg-aegis-white"></div>
          </div>

          {/* Features - Responsive Grid/Scroll */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <ScrollReveal direction="up" distance={50} duration={1} className="text-center">
              <ScrollRevealSplitText
                text="Why Choose Vrontis MUN?"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-aegis-white mb-2 text-center"
                charDelay={0.04}
              />
              <ScrollRevealText delay={0.6}>
                <p className="text-sm sm:text-base lg:text-xl text-aegis-burgundy font-subheading max-w-4xl mx-auto px-2">
                  Experience diplomatic excellence through our comprehensive Model UN conference
                </p>
              </ScrollRevealText>
            </ScrollReveal>
            {/* Features in horizontal scrollable row on mobile, grid on larger screens */}
            <ScrollRevealStagger stagger={0.15} className="overflow-x-auto flex lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 py-2 sm:py-4 scrollbar-hide">
              {[
                {
                  title: 'Expert Moderation',
                  description: 'Led by experienced diplomats and MUN veterans who guide meaningful debates and negotiations.'
                },
                {
                  title: 'Global Perspectives',
                  description: 'Diverse committees covering pressing international issues and real-world diplomatic challenges.'
                },
                {
                  title: 'Leadership Development',
                  description: 'Build confidence, public speaking skills, and diplomatic expertise through immersive experiences.'
                },
                {
                  title: 'Networking Opportunities',
                  description: 'Connect with like-minded students and future leaders from around the world.'
                },
                {
                  title: 'Educational Excellence',
                  description: 'Deepen understanding of international relations, politics, and global affairs.'
                },
                {
                  title: 'Memorable Experience',
                  description: 'Create lasting memories while developing skills that will benefit you throughout life.'
                }
              ].map((feature) => (
                <CardContainer key={feature.title} containerClassName="py-0 flex-shrink-0 lg:flex-shrink">
                  <CardBody className="w-full h-full">
                    <div className="w-full h-full">
                      <CardItem
                        translateZ="50"
                        className="flex flex-col items-start space-y-1 sm:space-y-2 p-4 sm:p-5 lg:p-6 bg-aegis-black/40 rounded-lg sm:rounded-xl border border-aegis-brown/20 hover:border-aegis-brown/40 transition-all duration-300 min-w-[220px] sm:min-w-[260px] lg:min-w-0 w-full h-full"
                      >
                        <div>
                          <CardItem translateZ="60" as="h3" className="text-base sm:text-lg lg:text-xl font-knockout font-bold text-aegis-brown mb-0.5 sm:mb-1">
                            {feature.title}
                          </CardItem>
                          <CardItem translateZ="40" as="p" className="text-xs sm:text-sm lg:text-base text-aegis-off-white font-body leading-relaxed">
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

          {/* Call to Action - Responsive */}
          <ScrollReveal direction="up" distance={60} duration={1.2} className="mt-8 sm:mt-10 lg:mt-12 py-6 sm:py-8 bg-aegis-brown/10 rounded-xl sm:rounded-2xl border border-aegis-brown/20">
            <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-8">
              <ScrollReveal direction="left" distance={40} duration={0.8} delay={0.2} className="text-center lg:text-left">
                <ScrollRevealSplitText
                  text="Ready to Shape the Future?"
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading text-aegis-white mb-1 sm:mb-2"
                  charDelay={0.03}
                />
                <ScrollRevealText delay={0.5}>
                  <p className="text-sm sm:text-base lg:text-lg text-aegis-burgundy font-subheading">
                    Join us for an unforgettable experience
                  </p>
                </ScrollRevealText>
              </ScrollReveal>
              <ScrollRevealStagger stagger={0.2} className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:space-x-4 w-full sm:w-auto">
                <Link
                  to="/registration"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-aegis-brown text-aegis-white font-subheading font-semibold rounded-lg hover:bg-aegis-brown/80 transition-all duration-300 text-center text-sm sm:text-base"
                >
                  Register Now
                </Link>
                <Link
                  to="/committees"
                  className="px-6 sm:px-8 py-3 sm:py-4 border border-aegis-brown text-aegis-brown font-subheading font-semibold rounded-lg hover:bg-aegis-brown/10 transition-all duration-300 text-center text-sm sm:text-base"
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