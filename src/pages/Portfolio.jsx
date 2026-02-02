import React from 'react';
import img01 from '../assets/img-01.jpg';
import img02 from '../assets/img-02.jpg';
import img03 from '../assets/img-03.jpg';
// import img04 from '../assets/img-04.jpg';
// import img05 from '../assets/img-05.jpg';

const images = [
  img01,
  img02,
  img03,
  // img04,
  // img05
];

const Portfolio = () => {
  return (
    <section className="bg-dark py-16 px-4 md:px-10">
      <h2 className="text-2xl md:text-3xl font-semibold text-white mb-10">
        Portfolio
      </h2>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6">
        {images.map((src, index) => (
          <div key={index} className="mb-6 break-inside-avoid">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`Portfolio ${index + 1}`}
                className="w-full transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                <p className="text-white text-sm font-medium">
                  Personal Branding Session
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;