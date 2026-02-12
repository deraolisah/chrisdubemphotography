import { useEffect, useCallback } from 'react';
import gsap from 'gsap';

const useMasonry = ({ gridRef, items, columnCount, gridReady, setGridReady }) => {
  
  const refreshMasonry = useCallback(() => {
    if (!gridRef.current || !items.length) return;

    // Force reflow to ensure all images are loaded
    setTimeout(() => {
      // Simple animation to reveal items
      const columns = gridRef.current.querySelectorAll('.flex-col');
      
      columns.forEach((column, colIndex) => {
        const items = column.children;
        gsap.fromTo(items,
          { 
            opacity: 0, 
            y: 30 
          },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1,
            delay: colIndex * 0.05,
            ease: 'power3.out'
          }
        );
      });
      
      setGridReady(true);
    }, 100);
  }, [gridRef, items, setGridReady]);

  // Initialize
  useEffect(() => {
    refreshMasonry();
  }, [refreshMasonry]);

  // Refresh when items change
  useEffect(() => {
    if (items.length) {
      refreshMasonry();
    }
  }, [items, refreshMasonry]);

  return { refreshMasonry };
};

export default useMasonry;