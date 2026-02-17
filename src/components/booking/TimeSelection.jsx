// components/booking/TimeSelection.jsx
import React from 'react';
import { useBooking, TIME_SLOTS } from '../../context/BookingContext';
import { format } from 'date-fns';
import { ChevronLeft, Clock } from 'lucide-react';

const TimeSelection = () => {
  const { state, dispatch } = useBooking();

  const handleTimeSelect = (time) => {
    dispatch({ type: 'SELECT_TIME', payload: time });
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="text-white/60 hover:text-white flex items-center mx-auto gap-1"
      >
        <ChevronLeft size={16} />
        Back to Date
      </button>

      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Select a Time
        </h2>
        <p className="text-gray-400">
          Available slots for {format(new Date(state.selectedDate), 'MMMM do, yyyy')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {TIME_SLOTS.map((time) => {
          const isSelected = state.selectedTime === time;
          
          return (
            <button
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`
                p-4 rounded-lg flex flex-col items-center transition-all duration-200
                ${isSelected 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
            >
              <Clock size={18} className="mb-1 opacity-70" />
              <span className="font-medium">{formatTime(time)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelection;