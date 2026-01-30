import React from 'react';

const Gallery = () => {
  return (
    <section className="py-2 md:py-4">
      <div className="container space-y-2">
        <div className='flex items-center justify-between gap-1 text-xs md:text-sm uppercase'>
          <div className='w-full text-start'> 7+ YEARS EXPERIENCE </div>
          <div className='w-full text-center'> 70+ Photos CAPTURED </div>
          <div className='w-full text-end uppercase'> Basel, Switzerland </div>
        </div>

        {/* Responsive grid: 2x2 on mobile, custom layout on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-2 h-300 md:h-screen">
          
          {/* Item 1 - Top left */}
          <div className="col-span-1 md:col-start-1 md:row-start-1 bg-gray-400 p-2">
            1
          </div>
          
          {/* Item 2 - Top right (mobile), Middle top (desktop) */}
          <div className="col-span-1 md:col-start-2 md:row-start-1 bg-gray-400 p-2">
            2
          </div>
          
          {/* Item 3 - Bottom left (mobile), Top right (desktop) */}
          <div className="col-span-1 md:col-start-3 md:row-start-1 bg-gray-400 p-2">
            3
          </div>
          
          {/* Item 4 - Bottom right (mobile), Middle left (desktop) */}
          <div className="col-span-1 md:col-start-1 md:row-start-2 bg-gray-400 p-2">
            4
          </div>
          
          {/* Item 5 - Takes full width on mobile, spans 2 columns on desktop */}
          <div className="col-span-2 md:col-start-2 md:col-end-4 md:row-start-2 bg-gray-400 p-2">
            5
          </div>
          
          {/* Item 6 - Takes full width on mobile, spans 2 columns on desktop */}
          <div className="col-span-2 md:col-start-1 md:col-end-3 md:row-start-3 bg-gray-400 p-2">
            6
          </div>
          
          {/* Item 7 - On mobile: shows as button or hidden, On desktop: bottom right */}
          <div className="col-span-2 md:col-span-1 md:col-start-3 md:row-start-3 bg-blue-800 p-2 md:pr-6 flex items-center justify-end font-semibold text-sm md:text-2xl leading-none text-end cursor-pointer">
            OPEN MY <br/> PORTFOLIO
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default Gallery;