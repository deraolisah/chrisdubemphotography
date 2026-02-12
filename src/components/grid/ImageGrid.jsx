import React, { useState, useRef, useEffect, useCallback } from 'react';
import GridItem from './GridItem.jsx';
import GridPreview from './GridPreview.jsx';
import useMasonry from '../../hooks/useMasonry.js';
import useImagePreview from '../../hooks/useImagePreview.js';

const ImageGrid = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const gridRef = useRef(null);
  const [gridReady, setGridReady] = useState(false);
  const [columnCount, setColumnCount] = useState(4);

  const {
    isExpanded,
    isAnimating,
    cloneImageRef,
    originalImageRef,
    previewRef,
    handleOpenItem,
    handleCloseItem
  } = useImagePreview({
    gridRef,
    setSelectedItem
  });

  // Determine column count based on screen width
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width < 640) setColumnCount(1);
      else if (width < 768) setColumnCount(2);
      else if (width < 1024) setColumnCount(2);
      else if (width < 1280) setColumnCount(3);
      else setColumnCount(4);
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  // Distribute items into columns for masonry layout
  const distributeItems = useCallback(() => {
    if (!items.length) return [];
    
    const columns = Array.from({ length: columnCount }, () => []);
    
    items.forEach((item, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(item);
    });
    
    return columns;
  }, [items, columnCount]);

  // Initialize masonry layout
  const { refreshMasonry } = useMasonry({
    gridRef,
    items,
    columnCount,
    gridReady,
    setGridReady
  });

  // Handle resize
  useEffect(() => {
    refreshMasonry();
  }, [columnCount, refreshMasonry]);

  const handleItemClick = useCallback((item, imgElement) => {
    if (isAnimating || isExpanded) return;
    
    const rect = imgElement.getBoundingClientRect();
    handleOpenItem(item, {
      width: imgElement.offsetWidth,
      height: imgElement.offsetHeight,
      left: rect.left,
      top: rect.top,
      src: imgElement.src,
      element: imgElement
    });
  }, [handleOpenItem, isAnimating, isExpanded]);

  const columns = distributeItems();

  return (
    <>
      <div 
        ref={gridRef}
        className={`relative transition-opacity duration-500 ${gridReady ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* True Masonry Layout - Flexbox column-based */}
        <div className="flex flex-row gap-4">
          {columns.map((column, colIndex) => (
            <div 
              key={colIndex} 
              className="flex flex-col flex-1 gap-4"
            >
              {column.map((item) => (
                <GridItem
                  key={item.id}
                  item={item}
                  onClick={handleItemClick}
                  isSelected={selectedItem?.id === item.id && isExpanded}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <GridPreview
        ref={previewRef}
        selectedItem={selectedItem}
        isExpanded={isExpanded}
        onClose={handleCloseItem}
        cloneImageRef={cloneImageRef}
        originalImageRef={originalImageRef}
      />
    </>
  );
};

export default ImageGrid;