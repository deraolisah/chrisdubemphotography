import React, { useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const GridItem = ({ item, onClick, isSelected }) => {
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleMouseEnter = useCallback(() => {
    gsap.to(overlayRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    gsap.to([titleRef.current, metaRef.current], {
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.out'
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    gsap.to([titleRef.current, metaRef.current], {
      y: 16,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power2.in'
    });
  }, []);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (imgRef.current) {
      onClick(item, imgRef.current);
    }
  }, [item, onClick]);

  const handleImageLoad = useCallback(() => {
    setIsLoaded(true);
    gsap.fromTo(imgRef.current, 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }
    );
  }, []);

  const [origWidth, origHeight] = item.size.split('x').map(Number);
  const aspectRatio = (origHeight / origWidth) * 100;

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-500 ${
        isSelected ? 'opacity-0 scale-95' : 'opacity-100'
      }`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="true"
    >
      <div 
        className="relative w-full overflow-hidden bg-gray-900"
        style={{ paddingBottom: `${aspectRatio}%` }}
      >
        {/* Loading skeleton */}
        {!isLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse">
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-gray-700/20 to-transparent animate-shimmer" />
          </div>
        )}

        {/* Image */}
        <img
          ref={imgRef}
          src={item.thumb}
          alt={item.title}
          className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={() => setImageError(true)}
        />

        {/* Overlay - Controlled by GSAP */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-linear-to-t from-black/80 via-dark/60 to-transparent opacity-0"
        >
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 
              ref={titleRef}
              className="text-white font-semibold text-lg mb-1 translate-y-4 flex items-center gap-1"
            >
              {item.title} <ArrowUpRight size={18} strokeWidth={1} />
            </h3>
            <p 
              ref={metaRef}
              className="text-gray-300 text-sm translate-y-4 capitalize"
            >
              {item.client} • {item.year} • {item.ratio}
            </p>
          </div>
        </div>

        {/* Category badge - Always visible */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/15 capitalize">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GridItem;