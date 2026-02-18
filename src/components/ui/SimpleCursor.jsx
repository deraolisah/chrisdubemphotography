// components/ui/SimpleCursor.jsx
import React, { useEffect, useState } from 'react';

const SimpleCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let rafId;
    
    const updatePosition = (e) => {
      // Use requestAnimationFrame for smooth performance
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('[data-cursor="true"]')) {
        setIsVisible(true);
      }
    };

    const handleMouseLeave = (e) => {
      if (e.target.closest('[data-cursor="true"]')) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      className={`custom-cursor ${isVisible ? 'visible' : ''}`}
      style={{ 
        left: position.x,
        top: position.y
      }}
    >
      CLICK TO VIEW
    </div>
  );
};

export default SimpleCursor;