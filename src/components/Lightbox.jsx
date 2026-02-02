import React, { useEffect } from 'react';

const Lightbox = ({ images, currentIndex, setCurrentIndex, onClose }) => {
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white text-3xl"
      >
        ×
      </button>

      {/* Prev */}
      <button
        onClick={prevImage}
        className="absolute left-6 text-white text-4xl"
      >
        ‹
      </button>

      {/* Image */}
      <img
        src={images[currentIndex]}
        alt="Lightbox"
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg"
      />

      {/* Next */}
      <button
        onClick={nextImage}
        className="absolute right-6 text-white text-4xl"
      >
        ›
      </button>
    </div>
  );
};

export default Lightbox;