import { useEffect, useRef } from 'react';
import Particles from './Particles';
import { initGlobalMouseTracking } from '../utils/globalMouse';

interface ParticlesBackgroundProps {
  className?: string;
  intensity?: 'subtle' | 'normal' | 'intense';
  interactive?: boolean;
  fixedHeight?: boolean;
}

export default function ParticlesBackground({ 
  className = '',
  intensity = 'normal',
  interactive = true,
  fixedHeight = false
}: ParticlesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Global mouse tracking for particles interaction
  useEffect(() => {
    if (!interactive) return;

    const cleanup = initGlobalMouseTracking();
    
    return cleanup;
  }, [interactive]);
  // Configure particles settings based on intensity
  const getParticlesSettings = () => {
    switch (intensity) {
      case 'subtle':
        return {
          particleCount: 80,
          particleSpread: 8,
          speed: 0.05,
          particleColors: ['#c99565', '#e4bc96', '#ffffff'],
          particleBaseSize: 60,
          sizeRandomness: 0.5,
          cameraDistance: 25,
          particleHoverFactor: 1.5,
        };
      case 'intense':
        return {
          particleCount: 300,
          particleSpread: 15,
          speed: 0.15,
          particleColors: ['#c99565', '#e4bc96', '#ffffff', '#dbb899'],
          particleBaseSize: 120,
          sizeRandomness: 1.5,
          cameraDistance: 18,
          particleHoverFactor: 3,
        };
      default: // normal
        return {
          particleCount: 150,
          particleSpread: 12,
          speed: 0.08,
          particleColors: ['#c99565', '#e4bc96', '#ffffff'],
          particleBaseSize: 80,
          sizeRandomness: 1,
          cameraDistance: 20,
          particleHoverFactor: 2,
        };
    }
  };

  const particlesSettings = getParticlesSettings();

  return (
    <div 
      ref={containerRef}
      className={`
        particles-background
        ${fixedHeight ? 'h-screen' : 'min-h-screen'} 
        w-full 
        fixed 
        inset-0 
        pointer-events-none
        -z-10
        ${className}
      `}
    >
      {/* Particles background */}
      <div className="absolute inset-0 w-full h-full">
        <Particles
          {...particlesSettings}
          moveParticlesOnHover={interactive}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>
      
      {/* Subtle overlay to ensure content readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-aegis-black/10 via-transparent to-aegis-black/20 pointer-events-none" />
      
      {/* Additional subtle vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-aegis-black/20 pointer-events-none" />
    </div>
  );
} 