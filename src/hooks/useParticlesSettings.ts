import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

type ParticlesIntensity = 'subtle' | 'normal' | 'intense';

interface ParticlesSettings {
  intensity: ParticlesIntensity;
  interactive: boolean;
  setIntensity: (intensity: ParticlesIntensity) => void;
  setInteractive: (interactive: boolean) => void;
}

export function useParticlesSettings(): ParticlesSettings {
  const location = useLocation();
  const [intensity, setIntensity] = useState<ParticlesIntensity>('normal');
  const [interactive, setInteractive] = useState(true);

  // Adjust intensity based on current route
  useEffect(() => {
    switch (location.pathname) {
      case '/':
        // Home page - more intense for visual impact
        setIntensity('intense');
        setInteractive(true);
        break;
      case '/registration':
        // Registration page - subtle to not distract from forms
        setIntensity('subtle');
        setInteractive(false);
        break;
      case '/committees':
      case '/agendas':
        // Content pages - normal intensity
        setIntensity('normal');
        setInteractive(true);
        break;
      case '/team':
        // Team page - normal with interaction
        setIntensity('normal');
        setInteractive(true);
        break;
      default:
        setIntensity('normal');
        setInteractive(true);
    }
  }, [location.pathname]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIntensity('subtle');
        setInteractive(false);
      }
    };

    // Set initial state
    if (mediaQuery.matches) {
      setIntensity('subtle');
      setInteractive(false);
    }

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    intensity,
    interactive,
    setIntensity,
    setInteractive,
  };
} 