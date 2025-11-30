// Global mouse position tracker for particles background
let globalMousePosition = { x: 0.5, y: 0.5 };
let subscribers: Array<(position: { x: number; y: number }) => void> = [];

export const initGlobalMouseTracking = () => {
  const handleMouseMove = (e: MouseEvent) => {
    globalMousePosition.x = e.clientX / window.innerWidth;
    globalMousePosition.y = 1 - (e.clientY / window.innerHeight);
    
    // Notify all subscribers
    subscribers.forEach(callback => callback(globalMousePosition));
  };

  document.addEventListener('mousemove', handleMouseMove);
  
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
  };
};

export const subscribeToGlobalMouse = (callback: (position: { x: number; y: number }) => void) => {
  subscribers.push(callback);
  
  return () => {
    subscribers = subscribers.filter(sub => sub !== callback);
  };
};

export const getGlobalMousePosition = () => globalMousePosition; 