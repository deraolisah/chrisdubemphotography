import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';

const useImagePreview = ({ gridRef, setSelectedItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const cloneImageRef = useRef(null);
  const originalImageRef = useRef(null);
  const previewRef = useRef(null);
  const currentItemRef = useRef(null);
  const currentImgPositionRef = useRef(null);
  const timelineRef = useRef(null);

  const getWinSize = useCallback(() => ({
    width: window.innerWidth,
    height: window.innerHeight
  }), []);

  const isMobile = useCallback(() => {
    return window.innerWidth <= 768;
  }, []);

  const handleOpenItem = useCallback((item, imgPosition) => {
    if (isAnimating || isExpanded) return;
    
    setIsAnimating(true);
    setIsExpanded(true);
    setSelectedItem(item);
    currentItemRef.current = item;
    currentImgPositionRef.current = imgPosition;

    // Kill any ongoing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Setup clone image
    if (cloneImageRef.current) {
      cloneImageRef.current.src = imgPosition.src;
      cloneImageRef.current.style.opacity = 1;
      cloneImageRef.current.style.width = `${imgPosition.width}px`;
      cloneImageRef.current.style.height = `${imgPosition.height}px`;
      cloneImageRef.current.style.top = `${imgPosition.top}px`;
      cloneImageRef.current.style.left = `${imgPosition.left}px`;
      cloneImageRef.current.style.transform = 'none';
    }

    // Setup original image
    if (originalImageRef.current) {
      originalImageRef.current.src = item.original;
      originalImageRef.current.style.opacity = 0;
    }

    // Calculate animation targets
    const win = getWinSize();
    const mobile = isMobile();
    
    let dx, dy, z;
    
    if (mobile) {
      // Mobile: animate to center-top
      dx = (win.width / 2) - imgPosition.left - (imgPosition.width / 2);
      dy = 80 - imgPosition.top - (imgPosition.height / 2);
      
      const targetWidth = Math.min(win.width * 0.9, 600);
      z = targetWidth / imgPosition.width;
    } else {
      // Desktop: animate to left side
      dx = (win.width * 0.25) - imgPosition.left - (imgPosition.width / 2);
      dy = (win.height / 2) - imgPosition.top - (imgPosition.height / 2);
      
      const targetWidth = Math.min(win.width * 0.4, 800);
      z = targetWidth / imgPosition.width;
    }

    // Create GSAP timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        if (previewRef.current) {
          previewRef.current.classList.add('preview--image-loaded');
        }
      }
    });

    // Animate clone to position
    tl.to(cloneImageRef.current, {
      x: dx,
      y: dy,
      scale: z,
      duration: 0.7,
      ease: 'power3.inOut'
    }, 0);

    // Fade out clone
    tl.to(cloneImageRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, '-=0.2');

    // Fade in original
    tl.to(originalImageRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.1');

    // Show preview background
    if (previewRef.current) {
      tl.to(previewRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }, 0);
    }

    timelineRef.current = tl;
  }, [isAnimating, isExpanded, setIsAnimating, setIsExpanded, setSelectedItem, getWinSize, isMobile]);

  const handleCloseItem = useCallback(() => {
    if (!isExpanded || isAnimating || !currentItemRef.current || !currentImgPositionRef.current) return;
    
    setIsAnimating(true);
    
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const win = getWinSize();
    const mobile = isMobile();
    
    let dx, dy, z;
    
    if (mobile) {
      // Mobile: animate back to original position
      dx = currentImgPositionRef.current.left + currentImgPositionRef.current.width / 2 - (win.width / 2);
      dy = currentImgPositionRef.current.top + currentImgPositionRef.current.height / 2 - 80;
      z = currentImgPositionRef.current.width / originalImageRef.current.offsetWidth;
    } else {
      // Desktop: animate back to grid position
      dx = currentImgPositionRef.current.left + currentImgPositionRef.current.width / 2 - (win.width * 0.25);
      dy = currentImgPositionRef.current.top + currentImgPositionRef.current.height / 2 - (win.height / 2);
      z = currentImgPositionRef.current.width / originalImageRef.current.offsetWidth;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setSelectedItem(null);
        currentItemRef.current = null;
        currentImgPositionRef.current = null;
        setIsExpanded(false);
        setIsAnimating(false);
        
        if (originalImageRef.current) {
          gsap.set(originalImageRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0
          });
        }
        
        if (cloneImageRef.current) {
          gsap.set(cloneImageRef.current, {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 0
          });
        }
      }
    });

    // Hide preview background
    if (previewRef.current) {
      tl.to(previewRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut'
      }, 0);
    }

    // Animate original back to position
    tl.to(originalImageRef.current, {
      x: dx,
      y: dy,
      scale: z,
      duration: 0.6,
      ease: 'power3.inOut',
      opacity: 1
    }, 0);

    // Fade out original at the end
    tl.to(originalImageRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.1');

    timelineRef.current = tl;
  }, [isExpanded, isAnimating, setIsAnimating, setIsExpanded, setSelectedItem, getWinSize, isMobile]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, []);

  return {
    isExpanded,
    isAnimating,
    cloneImageRef,
    originalImageRef,
    previewRef,
    handleOpenItem,
    handleCloseItem
  };
};

export default useImagePreview;