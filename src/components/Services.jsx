import React, { useState } from 'react';

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "CORPORATE & PERSONAL PHOTOGRAPHY",
      description: "Professional photography for businesses, headshots, and personal branding. Capture your professional essence with our expert team.",
      image: "https://images.unsplash.com/photo-1580684518721-3d7c2af77e5a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "WEDDING & EVENTS PHOTOGRAPHY",
      description: "Beautifully capture your special moments. From intimate ceremonies to grand celebrations, we preserve memories that last forever.",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "FAMILY & KIDS PHOTOGRAPHY",
      description: "Natural, joyful family portraits that capture genuine connections and milestones. Perfect for growing families and special occasions.",
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "PRODUCTS & FASHION PHOTOGRAPHY",
      description: "Showcase your products or fashion line with stunning, professional photography that highlights quality and style.",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <section className="pt-16 md:pt-20">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col lg:flex-row bg-white lg:h-120 overflow-hidden">
          {/* Left side - Accordion Titles */}
          <div className="lg:w-1/2 flex flex-col">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex-1 p-4 border-b border-gray-200 last:border-b-0 transition-all duration-300 group cursor-pointer ${
                  activeIndex === index 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-gray-100 text-gray-800'
                }`}
              >
                <div className="flex items-center h-full">
                  <div className="flex-1 text-left">
                    <h3 className={`text-lg md:text-2xl font-semibold md:font-bold mb-1 md:mb-2 transition-all duration-300 ${
                      activeIndex === index ? 'text-white' : 'group-hover:text-gray-900'
                    }`}>
                      {service.title}
                    </h3>
                    <p className={`hidden md:flex text-sm md:text-base transition-all duration-300 ${
                      activeIndex === index ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      Click to view details →
                    </p>
                    <p className={`flex md:hidden text-sm md:text-base transition-all duration-300 ${
                      activeIndex === index ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                      {/* Click to view details → */}
                      {activeIndex === index 
                        ? service.description 
                        : ""
                      }
                    </p>
                  </div>
                  <div className={`hidden md:flex ml-4 text-2xl font-light transition-all duration-300 ${
                    activeIndex === index ? 'text-white' : 'text-gray-400'
                  }`}>
                    →
                    {/* {activeIndex === index ? '↓' : '→'} */}
                  </div>
                  <div className={`flex md:hidden ml-4 text-2xl font-light transition-all duration-300 ${
                    activeIndex === index ? 'text-white' : 'text-gray-400'
                  }`}>
                    {/* → */}
                    {activeIndex === index ? '↓' : '→'}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Right side - Images */}
          <div className="lg:w-1/2 relative">
            {services.map((service, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  activeIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="hidden lg:flex flex-col items-start justify-end h-full text-center lg:text-left text-white z-20! relative p-6">
                    <div className="lg:mb-4">
                      <h3 className="text-2xl font-bold">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-200 text-lg hidden lg:block">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile indicator */}
        {/* <div className="justify-center mt-0 hidden">
          <div className="flex space-x-3">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeIndex === index ? 'bg-gray-900' : 'bg-gray-300'
                }`}
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Services;