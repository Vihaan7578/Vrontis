import React from 'react'
import { Helmet } from 'react-helmet-async'
import { usePlatformDetection } from '../utils/platformDetection'

const Registration: React.FC = () => {
  const platform = usePlatformDetection()
  
  return (
    <>
      <Helmet>
        <title>Registration - Vrontis MUN</title>
        <meta name="description" content="Register for Vrontis MUN 2025." />
      </Helmet>
      <div className={`${platform.isMobile ? 'min-h-[100dvh]' : 'min-h-screen'} ${platform.isMobile ? 'pt-14' : 'pt-16'} bg-aegis-black safe-area-top`}>
        <div className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 ${platform.isMobile ? 'px-4 py-8' : 'px-4 py-8'} safe-area-left safe-area-right`}>
          <h1 className={`${platform.isMobile ? 'text-3xl' : 'text-5xl'} font-serif font-black text-aegis-white mb-4 text-center md:mb-0 md:mr-8`}>
            Registration
          </h1>
          <div className={`glass-effect rounded-xl ${platform.isMobile ? 'p-6' : 'p-8'} border border-aegis-brown/30 space-y-4 text-center min-w-[320px] max-w-md`}>
            <p className={`text-aegis-white ${platform.isMobile ? 'text-base' : 'text-lg'} font-semibold`}>
              Registration Coming Soon!
            </p>
            <p className="text-aegis-off-white text-sm">
              Stay tuned for registration details and updates.
            </p>
            <a
              href="https://linktr.ee/vrontismun2025"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block px-6 py-3 bg-aegis-burgundy text-aegis-white rounded-full hover:bg-aegis-brown transition-colors font-medium ${platform.isMobile ? 'active:scale-95' : ''}`}
              style={{ minHeight: '44px', touchAction: 'manipulation' }}
            >
              Apply via Linktree
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default Registration 