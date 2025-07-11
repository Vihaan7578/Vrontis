import React from 'react'

// These values are fine-tuned for pixel-perfect overlay alignment
const TEXT_LEFT_OFFSET = 'calc(2vw - 7px)';
const TEXT_TOP_OFFSET = 137; // 60 + 77 = 137px, moved 77px down
const TEXT_WIDTH = '54vw';
const PIETA_HEIGHT = 'calc(97vh + 15px)'; // 15px bigger

const InteractiveHeroText: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-aegis-black overflow-hidden p-0 m-0">
      {/* Pieta Image - positioned with adjuster values: X: 37px, Y: 45px, Scale: 100% */}
      <img
        src="/images/pieta home page.png"
        alt="Pieta Sculpture"
        className="absolute z-10 select-none pointer-events-none"
        style={{
          right: 'calc(7vw + 10px - 37px)', // X: 37px (move 37px right, so subtract from right positioning)
          bottom: 'calc(2vh + 5px - 45px)', // Y: 45px (move 45px down, so subtract from bottom positioning)
          height: PIETA_HEIGHT,
          width: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 80px #c9956533)',
          transform: 'scale(1.0)' // Scale: 100%
        }}
      />
      {/* Text Block - wider, larger, better aligned */}
      <div
        className="absolute z-20 select-none"
        style={{
          left: TEXT_LEFT_OFFSET,
          top: TEXT_TOP_OFFSET,
          width: TEXT_WIDTH,
          minWidth: '400px',
          maxWidth: '1100px',
          pointerEvents: 'none',
        }}
      >
        <div
          className="font-heading text-aegis-white leading-none"
          style={{
            fontSize: 'clamp(110px, 15vw, 240px)',
            fontFamily: 'Anton, Impact, Arial Black, sans-serif',
            letterSpacing: '0.01em',
            lineHeight: 1.0,
            textShadow: '0 2px 8px #000a',
          }}
        >
          VRONTIS
        </div>
        <div
          className="font-heading leading-none"
          style={{
            fontSize: 'clamp(130px, 17vw, 280px)',
            fontFamily: 'Anton, Impact, Arial Black, sans-serif',
            color: '#ffb76d',
            letterSpacing: '0.01em',
            lineHeight: 1.0,
            marginTop: '-0.08em',
            textShadow: '0 2px 8px #000a',
            position: 'relative',
            left: '17px', // -23px + 40px = 17px (move 40px right from previous)
            top: '-5px', // -15px + 10px = -5px (move 10px down from previous)
          }}
        >
          MUN
        </div>
        <div
          className="font-lexend text-aegis-white"
          style={{
            fontSize: '19px',
            fontWeight: 800,
            letterSpacing: '0.08em',
            fontFamily: 'Lexend, sans-serif',
            lineHeight: 1.2,
            textShadow: '0 2px 8px #000a',
            marginTop: '1vw',
            marginBottom: '0',
            position: 'relative',
            left: '26px', // -14px + 40px = 26px (move 40px right from previous)
            top: '-30px', // -40px + 10px = -30px (move 10px down from previous)
          }}
        >
          WHERE DIPLOMACY STRIKES BOLD.
        </div>
      </div>
    </div>
  )
}

export default InteractiveHeroText 