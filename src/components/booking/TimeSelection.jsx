// components/booking/TimeSelection.jsx
import React from 'react';
import { useBooking, TIME_SLOTS } from '../../context/BookingContext';
import { format } from 'date-fns';

const TimeSelection = () => {
  const { state, dispatch } = useBooking();

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      {state.selectedDate && (
        <p className="text-white/60 text-sm">
          Available slots for {format(new Date(state.selectedDate), 'MMMM d, yyyy')}
        </p>
      )}

      <div className="grid grid-cols-3 gap-3">
        {TIME_SLOTS.map((time) => {
          const isSelected = state.selectedTime === time;
          
          return (
            <button
              key={time}
              onClick={() => dispatch({ type: 'SELECT_TIME', payload: time })}
              className={`
                p-3 rounded-lg text-center transition-all
                ${isSelected 
                  ? 'bg-primary text-white' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }
              `}
            >
              <span className="text-sm font-medium">{formatTime(time)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelection;