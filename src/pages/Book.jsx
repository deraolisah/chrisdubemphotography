// pages/Book.jsx
import React from 'react';
import BookingFlow from '../components/booking/BookingFlow';
import { BookingProvider } from '../context/BookingContext';

const Book = () => {
  return (
    <BookingProvider>
      <div className="min-h-screen pt-32 pb-20">
        <div className="container mx-auto px-4">
          <BookingFlow />
        </div>
      </div>
    </BookingProvider>
  );
};

export default Book;