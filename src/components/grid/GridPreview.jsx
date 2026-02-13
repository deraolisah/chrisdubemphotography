import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import { X, ArrowUpRight, Camera, Aperture } from 'lucide-react';
import gsap from 'gsap';
import { ExposureTime, FocalLength, Iso } from '../ui/CameraIcons';

const GridPreview = forwardRef(({ 
  selectedItem, 
  isExpanded, 
  onClose, 
  cloneImageRef, 
  originalImageRef 
}, ref) => {
  const previewRef = useRef(null);
  const contentRef = useRef(null);
  const detailsRef = useRef(null);
  const closeBtnRef = useRef(null);

  useImperativeHandle(ref, () => previewRef.current);

  useEffect(() => {
    if (isExpanded && selectedItem && previewRef.current) {
      // Animate image in
      gsap.fromTo(originalImageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 3.5, ease: 'power3.out' }
      );

      // Animate content entrance
      const tl = gsap.timeline({ delay: 0.4 });
      
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      ).fromTo(detailsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        '-=0.4'
      );
    }
  }, [isExpanded, selectedItem]);

  useEffect(() => {
    if(isExpanded){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    } 
  }, [isExpanded]);

  if (!selectedItem) return null;

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;


  return (
    <div
      ref={previewRef}
      className={`fixed inset-0 z-50 bg-dark/90 transition-all duration-700 ${
        isExpanded 
          ? 'opacity-100 pointer-events-auto backdrop-blur-lg' 
          : 'opacity-0 pointer-events-none backdrop-blur-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.2, 1, 0.3, 1)' }}
    >
      {/* Clone image for smooth animation */}
      <img
        ref={cloneImageRef}
        className="fixed z-60 will-change-transform opacity-0"
        alt=""
        style={{ 
          position: 'fixed',
          objectFit: 'cover',
          pointerEvents: 'none'
        }}
      />

      <div className="relative w-full h-full overflow-y-auto">
        {/* Main content - responsive layout */}
        <div className={`min-h-full w-full flex ${
          isMobile 
            ? 'flex-col items-center justify-start p-4.5 pt-24' 
            : 'flex-row items-center justify-center p-10'
        }`}>
          
          {/* Original image */}
          <div className={`
            ${isMobile 
              ? 'w-full max-w-[90%] mb-8' 
              : 'w-1/2 pr-12 flex justify-end'
            }
          `}>
            <div className="relative inline-block">
              <img
                ref={originalImageRef}
                src={selectedItem.original}
                alt={selectedItem.title}
                className={`
                  object-contain rounded-lg shadow-2xl
                  ${isMobile ? 'max-h-[40vh] w-auto' : 'max-h-[80vh] max-w-full'}
                `}
                // style={{ opacity: 0 }}
              />
              
              {/* Image metadata overlay - mobile only */}
              {isMobile && (
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex items-center gap-2 text-white/80 text-xs">
                    <Camera size={14} />
                    <span>{selectedItem.details.camera}</span>
                    <span className="mx-2">•</span>
                    <FocalLength size={14} />
                    <span>{selectedItem.details.focalLength}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content section */}
          <div 
            ref={contentRef}
            className={`
              ${isMobile 
                ? 'w-full max-w-[90%] opacity-100' 
                : 'w-1/2 pl-12'
              }
            `}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              {selectedItem.title}
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl mb-6 leading-relaxed">
              {selectedItem.description}
            </p>
            
            <a
              href={selectedItem.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 mb-8 group"
            >
              Live Preview
              <ArrowUpRight 
                size={18} 
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
              />
            </a>

            {/* Details grid */}
            <div ref={detailsRef} className="grid grid-cols-2 gap-6 border-t border-white/20 pt-8">
              <div>
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Client</h4>
                <p className="text-white font-medium">{selectedItem.client}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Category</h4>
                <p className="text-white font-medium">{selectedItem.category}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Year</h4>
                <p className="text-white font-medium">{selectedItem.year}</p>
              </div>
              <div>
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-2">Role</h4>
                <p className="text-white font-medium">{selectedItem.role}</p>
              </div>
            </div>

            {/* Camera details - desktop only */}
            {!isMobile && (
              <div className="mt-8 pt-8 border-t border-white/20">
                <h4 className="text-white/60 text-xs uppercase tracking-wider mb-4">Camera Settings</h4>
                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-white/80">
                    <Camera size={16} className="text-green-400" />
                    <span className="text-sm">{selectedItem.details.camera}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <FocalLength size={16} className="text-primary" />
                    <span className="text-sm">{selectedItem.details.focalLength}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Aperture size={16} className="text-green-400" />
                    <span className="text-sm">{selectedItem.details.aperture}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <ExposureTime size={16} className="text-green-400" />
                    <span className="text-sm">{selectedItem.details.exposureTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/80">
                    <Iso size={16} className="text-green-400" />
                    <span className="text-sm">ISO {selectedItem.details.iso}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Close button */}
      <button
        ref={closeBtnRef}
        onClick={onClose}
        className="fixed top-6 right-6 z-70 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 group"
        aria-label="Close"
      >
        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </div>
  );
});

GridPreview.displayName = 'GridPreview';

export default GridPreview;