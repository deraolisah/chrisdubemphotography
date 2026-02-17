// components/booking/BookingSummary.jsx
import React from 'react';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, Package } from 'lucide-react';
import { format } from 'date-fns';

const BookingSummary = () => {
  const { state } = useBooking();
  
  if (!state.selectedPackage) return null;

  const formatTime = (timeString) => {
    const [hour, minute] = timeString.split(':');
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return format(date, 'hh:mm a');
  };

  
  return (
    <div className="bg-white/5 rounded-xl p-6 sticky top-24! h-fit">
      <h3 className="text-white font-semibold text-lg mb-4">Booking Summary</h3>
      
      {state.selectedPackage && (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Package size={18} className="text-primary mt-1" />
            <div>
              <p className="text-white/60 text-sm">Package</p>
              <p className="text-white font-medium">{state.selectedPackage.name}</p>
              <p className="text-primary text-sm">{state.selectedPackage.price}</p>
            </div>
          </div>
          
          {state.selectedDate && (
            <div className="flex items-start gap-3">
              <Calendar size={18} className="text-primary mt-1" />
              <div>
                <p className="text-white/60 text-sm">Date</p>
                <p className="text-white font-medium">
                  {format(new Date(state.selectedDate), 'MMMM do, yyyy')}
                </p>
              </div>
            </div>
          )}
          
          {state.selectedTime && (
            <div className="flex items-start gap-3">
              <Clock size={18} className="text-primary mt-1" />
              <div>
                <p className="text-white/60 text-sm">Time</p>
                <p className="text-white font-medium">
                  {formatTime(state.selectedTime)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookingSummary;