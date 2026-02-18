import React, { useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

const GridItem = ({ item, onClick, isSelected }) => {
  const imgRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      className={`group relative cursor-pointer transition-all duration-500 ${
        isSelected ? 'opacity-0 scale-95' : 'opacity-100'
      }`}
      onClick={handleClick}
      // data-cursor="true"
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
          className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={handleImageLoad}
          onError={() => setImageError(true)}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-1">
              {item.title} <ArrowUpRight size={18} strokeWidth={1} />
            </h3>
            <p className="text-gray-300 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {item.client} • {item.year}
            </p>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full border border-white/20 capitalize">
            {item.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GridItem;