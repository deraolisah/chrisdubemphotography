// context/BookingContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const BookingContext = createContext();

// Available photography packages
export const PACKAGES = [
  {
    id: 'portrait',
    name: 'Portrait Session',
    duration: '1 hour',
    price: '$350',
    description: 'Perfect for personal branding, headshots, or professional portraits.',
    includes: ['1 hour shoot', '10 edited photos', 'Online gallery', 'Print release']
  },
  {
    id: 'branding',
    name: 'Personal Branding',
    duration: '2 hours',
    price: '$650',
    description: 'Comprehensive brand photography for entrepreneurs and creatives.',
    includes: ['2 hour shoot', '20 edited photos', 'Multiple locations', 'Online gallery', 'Social media kit']
  },
  {
    id: 'commercial',
    name: 'Commercial',
    duration: '3 hours',
    price: '$950',
    description: 'Product, lifestyle, or commercial photography for your business.',
    includes: ['3 hour shoot', '30 edited photos', 'Commercial license', 'Product styling', 'Fast turnaround']
  },
  {
    id: 'event',
    name: 'Event Coverage',
    duration: '4 hours',
    price: '$1,200',
    description: 'Corporate events, parties, or special occasions.',
    includes: ['4 hour coverage', '50+ edited photos', 'Online gallery', 'Next-day previews']
  }
];

// Available time slots
export const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'
];

const initialState = {
  currentStep: 'package', // package -> date -> time -> details -> confirmation
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
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    
    case 'SELECT_PACKAGE':
      return { 
        ...state, 
        selectedPackage: action.payload, 
        currentStep: 'date',
        errors: { ...state.errors, package: null }
      };
    
    case 'SELECT_DATE':
      return { 
        ...state, 
        selectedDate: action.payload, 
        currentStep: 'time',
        errors: { ...state.errors, date: null }
      };
    
    case 'SELECT_TIME':
      return { 
        ...state, 
        selectedTime: action.payload, 
        currentStep: 'details',
        errors: { ...state.errors, time: null }
      };
    
    case 'SET_CLIENT_INFO':
      return { 
        ...state, 
        clientInfo: action.payload, 
        currentStep: 'confirmation',
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
    
    // ✅ New clear actions for individual fields
    case 'CLEAR_PACKAGE':
      return { 
        ...state, 
        selectedPackage: null, 
        currentStep: 'package',
        selectedDate: null, // Also clear dependent fields
        selectedTime: null 
      };
    
    case 'CLEAR_DATE':
      return { 
        ...state, 
        selectedDate: null, 
        currentStep: 'date',
        selectedTime: null // Clear time when date changes
      };
    
    case 'CLEAR_TIME':
      return { 
        ...state, 
        selectedTime: null, 
        currentStep: 'time' 
      };
    
    case 'CLEAR_CLIENT_INFO':
      return { 
        ...state, 
        clientInfo: null, 
        currentStep: 'details' 
      };
    
    case 'GO_BACK':
      const steps = ['package', 'date', 'time', 'details', 'confirmation'];
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex > 0) {
        return { ...state, currentStep: steps[currentIndex - 1] };
      }
      return state;
    
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  // Load saved booking from localStorage (if page refreshes)
  useEffect(() => {
    const savedBooking = localStorage.getItem('bookingDraft');
    if (savedBooking) {
      try {
        const parsed = JSON.parse(savedBooking);
        // Don't restore if it's an old booking (older than 1 hour)
        if (parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
          // Restore each field if it exists
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
          // Clear old drafts
          localStorage.removeItem('bookingDraft');
        }
      } catch (e) {
        console.error('Error loading draft:', e);
        localStorage.removeItem('bookingDraft');
      }
    }
  }, []);

  // Save draft to localStorage
  useEffect(() => {
    // Only save if we have at least some data
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
  }, [state.selectedPackage, state.selectedDate, state.selectedTime, state.clientInfo]);

  // ✅ Helper functions (defined inside provider using dispatch)
  const resetBooking = () => {
    dispatch({ type: 'RESET_BOOKING' });
    localStorage.removeItem('bookingDraft');
  };

  const clearField = (field) => {
    dispatch({ type: `CLEAR_${field.toUpperCase()}` });
  };

  const goToStep = (step) => {
    dispatch({ type: 'SET_STEP', payload: step });
  };

  const setError = (field, message) => {
    dispatch({ 
      type: 'SET_ERRORS', 
      payload: { ...state.errors, [field]: message } 
    });
  };

  // ✅ Value object with all state and helpers
  const value = {
    state,
    dispatch,
    resetBooking,
    clearField,
    goToStep,
    setError
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