// components/booking/DateSelection.jsx
import React, { useState } from 'react';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  startOfWeek, 
  endOfWeek,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths
} from 'date-fns';
import { useBooking } from '../../context/BookingContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DateSelection = () => {
  const { state, dispatch } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="space-y-6 min-w-full ">
      {/* Calendar Header */}
      <div className="w-full flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {format(currentMonth, 'MMMM yyyy')}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
          >
            <ChevronRight size={18} className="text-white" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
          <div key={day} className="text-xs text-white/40 py-2">{day}</div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="w-full grid grid-cols-7 gap-1">
        {calendarDays.map((date) => {
          const isCurrentMonth = isSameMonth(date, currentMonth);
          const isSelected = state.selectedDate && 
            isSameDay(new Date(state.selectedDate), date);
          const isAvailable = isDateAvailable(date);
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => isAvailable && isCurrentMonth && 
                dispatch({ type: 'SELECT_DATE', payload: date.toISOString() })
              }
              disabled={!isAvailable || !isCurrentMonth}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-sm
                transition-all
                ${!isCurrentMonth && 'opacity-20'}
                ${isSelected 
                  ? 'bg-primary text-white' 
                  : isAvailable && isCurrentMonth
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-white/5 text-white/20 cursor-not-allowed'
                }
              `}
            >
              {format(date, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DateSelection;