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
  isWeekend,
  addMonths,
  subMonths
} from 'date-fns';
import { useBooking } from '../../context/BookingContext';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const DateSelection = () => {
  const { state, dispatch } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get all days to display in the calendar (including days from prev/next month)
  const getCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
    const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 }); // End on Sunday

    return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleDateSelect = (date) => {
    dispatch({ type: 'SELECT_DATE', payload: date.toISOString() });
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  const isDateAvailable = (date) => {
    // Add your availability logic here
    // For now, just disable weekends and past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return !isWeekend(date) && date >= today;
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="space-y-6">
      {/* <div> */}
        <button
          onClick={handleBack}
          className="text-white/60 hover:text-white flex items-center mx-auto gap-1"
        >
          <ChevronLeft size={16} />
          Back to Package
        </button>

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Select a Date
          </h2>
          <p className="text-gray-400">
            Choose your preferred session date
          </p>
        </div>
      {/* </div> */}

      {/* Calendar */}
      <div className="bg-white/5 rounded-xl p-4 md:p-6">
        {/* Calendar Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">
            {format(currentMonth, 'MMMM yyyy')}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handlePreviousMonth}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
              aria-label="Previous month"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition"
              aria-label="Next month"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div 
              key={day} 
              className={`text-center text-sm font-medium py-2
                ${day === 'Sat' || day === 'Sun' ? 'text-white/40' : 'text-white/60'}
              `}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((date) => {
            const isCurrentMonth = isSameMonth(date, currentMonth);
            const isSelected = state.selectedDate && 
              isSameDay(new Date(state.selectedDate), date);
            const isAvailable = isDateAvailable(date);
            const isPast = date < new Date().setHours(0, 0, 0, 0);
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => isAvailable && handleDateSelect(date)}
                disabled={!isAvailable || !isCurrentMonth || isPast}
                className={`
                  aspect-square rounded-lg flex flex-col items-center justify-center
                  transition-all duration-200 relative
                  ${!isCurrentMonth && 'opacity-30'}
                  ${isSelected 
                    ? 'bg-primary text-white' 
                    : isAvailable && isCurrentMonth && !isPast
                      ? 'bg-white/10 text-white hover:bg-white/20 cursor-pointer'
                      : 'bg-white/5 text-white/20 cursor-not-allowed'
                  }
                `}
              >
                <span className="text-lg font-medium">
                  {format(date, 'd')}
                </span>
                {isAvailable && isCurrentMonth && !isPast && (
                  <span className="text-[10px] mt-0.5 text-white/60">
                    Available
                  </span>
                )}
                
                {/* Today indicator */}
                {isSameDay(date, new Date()) && (
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-white/60">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white/10 rounded-full"></div>
            <span className="text-xs text-white/60">Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white/30 rounded-full"></div>
            <span className="text-xs text-white/60">Past</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
            <span className="text-xs text-white/60">Today</span>
          </div>
        </div>
      </div>

      {/* Selected Date Preview */}
      {state.selectedDate && (
        <div className="bg-white/5 rounded-lg p-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <Calendar className="text-primary" size={20} />
            </div>
            <div>
              <span className="text-white/60 text-sm">Selected Date</span>
              <p className="text-white font-medium">
                {format(new Date(state.selectedDate), 'EEEE, MMMM do, yyyy')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelection;