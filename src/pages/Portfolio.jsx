import React, { useState } from 'react';
import img01 from '../assets/img-01.jpg';
import img02 from '../assets/img-02.jpg';
import img03 from '../assets/img-03.jpg';
import Lightbox from '../components/Lightbox';
// import img04 from '../assets/img-04.jpg';
// import img05 from '../assets/img-05.jpg';

const images = [
  img01,
  img02,
  img03,
];

const portfolioItems = [
  {
    id: 1,
    client: 'Tech Startup CEO',
    cover: img01,
    gallery: [
      img01,
      img02,
      img03,
    ],
  },
  {
    id: 2,
    client: 'Corporate Consulting Firm',
    cover: img02,
    gallery: [
      img02,
      img03,
    ],
  },
  {
    id: 3,
    client: "Personal Brand - Adozie",
    cover: img03,
    gallery: [
      img03,
      img01,
      img02
    ]
  }
];

const Portfolio = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeGallery, setActiveGallery] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (gallery) => {
    setActiveGallery(gallery);
    setCurrentIndex(0);
    setLightboxOpen(true);
  };

  return (
    <section className="container py-16">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-10">
        Portfolio
      </h2>

      {/* Masonry */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {portfolioItems.map((item) => (
          <div
            key={item.id}
            className="mb-6 break-inside-avoid cursor-pointer"
            onClick={() => openLightbox(item.gallery)}
          >
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={item.cover}
                alt={item.client}
                className="w-full transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <p className="text-white text-sm font-medium">
                  {item.client}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <Lightbox
          images={activeGallery}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  );
};

export default Portfolio;