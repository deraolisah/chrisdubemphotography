// context/BookingContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const BookingContext = createContext();

// Available photography packages
export const PACKAGES = [
  {
    id: 'portrait',
    name: 'Portrait Session',
    duration: '1 hour',
    price: 350,
    priceDisplay: '$350',
    description: 'Perfect for personal branding, headshots, or professional portraits.',
    includes: ['1 hour shoot', '10 edited photos', 'Online gallery', 'Print release']
  },
  {
    id: 'branding',
    name: 'Personal Branding',
    duration: '2 hours',
    price: 650,
    priceDisplay: '$650',
    description: 'Comprehensive brand photography for entrepreneurs and creatives.',
    includes: ['2 hour shoot', '20 edited photos', 'Multiple locations', 'Online gallery', 'Social media kit']
  },
  {
    id: 'commercial',
    name: 'Commercial',
    duration: '3 hours',
    price: 950,
    priceDisplay: '$950',
    description: 'Product, lifestyle, or commercial photography for your business.',
    includes: ['3 hour shoot', '30 edited photos', 'Commercial license', 'Product styling', 'Fast turnaround']
  },
  {
    id: 'event',
    name: 'Event Coverage',
    duration: '4 hours',
    price: 1200,
    priceDisplay: '$1,200',
    description: 'Corporate events, parties, or special occasions.',
    includes: ['4 hour coverage', '50+ edited photos', 'Online gallery', 'Next-day previews']
  }
];

// Available time slots
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
];

const initialState = {
  activeTab: 'package', // package, date, time, details, confirmation
  selectedPackage: null,
  selectedDate: null,
  selectedTime: null,
  clientInfo: null,
  bookingStatus: 'idle', // idle, loading, success, error
  bookingReference: null,
  errors: {}
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    
    case 'SELECT_PACKAGE':
      return { 
        ...state, 
        selectedPackage: action.payload, 
        activeTab: 'date',
        errors: { ...state.errors, package: null }
      };
    
    case 'SELECT_DATE':
      return { 
        ...state, 
        selectedDate: action.payload, 
        activeTab: 'time',
        errors: { ...state.errors, date: null }
      };
    
    case 'SELECT_TIME':
      return { 
        ...state, 
        selectedTime: action.payload, 
        activeTab: 'details',
        errors: { ...state.errors, time: null }
      };
    
    case 'SET_CLIENT_INFO':
      return { 
        ...state, 
        clientInfo: action.payload, 
        activeTab: 'confirmation',
        errors: { ...state.errors, details: null }
      };
    
    case 'SET_BOOKING_STATUS':
      return { ...state, bookingStatus: action.payload };
    
    case 'SET_BOOKING_REFERENCE':
      return { ...state, bookingReference: action.payload };
    
    case 'SET_ERRORS':
      return { ...state, errors: action.payload };
    
    case 'RESET_BOOKING':
      return initialState;
    
    case 'GO_BACK':
      const tabs = ['package', 'date', 'time', 'details', 'confirmation'];
      const currentIndex = tabs.indexOf(state.activeTab);
      if (currentIndex > 0) {
        return { ...state, activeTab: tabs[currentIndex - 1] };
      }
      return state;
    
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Load saved booking from localStorage
  useEffect(() => {
    const savedBooking = localStorage.getItem('bookingDraft');
    if (savedBooking) {
      try {
        const parsed = JSON.parse(savedBooking);
        if (parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          if (parsed.data.package) {
            dispatch({ type: 'SELECT_PACKAGE', payload: parsed.data.package });
          }
          if (parsed.data.date) {
            dispatch({ type: 'SELECT_DATE', payload: parsed.data.date });
          }
          if (parsed.data.time) {
            dispatch({ type: 'SELECT_TIME', payload: parsed.data.time });
          }
          if (parsed.data.clientInfo) {
            dispatch({ type: 'SET_CLIENT_INFO', payload: parsed.data.clientInfo });
          }
        } else {
          localStorage.removeItem('bookingDraft');
        }
      } catch (e) {
        console.error('Error loading draft:', e);
        localStorage.removeItem('bookingDraft');
      }
    }
  }, []);

  // Debounced save to localStorage
  const debouncedSave = useCallback(
    debounce((state) => {
      if (state.selectedPackage || state.selectedDate || state.selectedTime || state.clientInfo) {
        const draft = {
          timestamp: Date.now(),
          data: {
            package: state.selectedPackage,
            date: state.selectedDate,
            time: state.selectedTime,
            clientInfo: state.clientInfo
          }
        };
        localStorage.setItem('bookingDraft', JSON.stringify(draft));
      }
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSave(state);
    return () => debouncedSave.cancel();
  }, [state.selectedPackage, state.selectedDate, state.selectedTime, state.clientInfo]);

  const value = {
    state,
    dispatch
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
};

// Debounce utility
function debounce(func, wait) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.cancel = () => clearTimeout(timeout); // add cancel method
  return debounced;
}