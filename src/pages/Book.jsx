// pages/Book.jsx
import React, { useState, useEffect } from 'react';
import { BookingProvider } from '../context/BookingContext';
import BookingTabs from '../components/booking/BookingTabs';
import BookingSidebar from '../components/booking/BookingSidebar';
import { Menu, X } from 'lucide-react';

const Book = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <BookingProvider>
      <div className="py-4 w-full bg-dark">
        {/* Mobile Menu Button - Only shows when sidebar is closed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary-alt transition-colors"
          >
            <Menu size={24} />
          </button>
        )}

        {/* Main Layout */}
        <div className="flex container">
          {/* Main Content - Left Side */}
          <div className={`
            flex-1 transition-all duration-300 ease-in-out
           
          `}>
            {/* <div className="container mx-auto px-4 py-8 lg:py-12 max-w-3xl xl:max-w-4xl"> */}
              <BookingTabs />
            {/* </div> */}
          </div>

          {/* Sidebar - Fixed on desktop, slide-in on mobile */}
          <div className={`
            ${!sidebarOpen ? 'translate-x-full' : 'translate-x-0'}
            w-80 lg:w-96 fixed inset-y-0 right-0 top-0! z-100 transform transition-transform duration-300 ease-in-out
          `}>
            {/* Sidebar Container with Sticky Positioning */}
            <div className="h-full bg-dark border-l border-white/10 overflow-y-auto sticky top-0">
              <BookingSidebar 
                onClose={() => setSidebarOpen(false)} 
                isMobile={isMobile}
              />
            </div>
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div 
              className="fixed inset-0 bg-black/50 z-30"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </div>
      </div>
    </BookingProvider>
  );
};

export default Book;