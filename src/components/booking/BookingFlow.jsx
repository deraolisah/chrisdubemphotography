// components/booking/BookingFlow.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CancelBookingModal from './CancelBookingModal';
import PackageSelection from './PackageSelection';
import DateSelection from './DateSelection';
import TimeSelection from './TimeSelection';
import ClientDetails from './ClientDetails';
import BookingConfirmation from './BookingConfirmation';
import BookingSummary from './BookingSummary';

const BookingFlow = () => {
  const { state, dispatch } = useBooking();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);

  const steps = {
    package: PackageSelection,
    date: DateSelection,
    time: TimeSelection,
    details: ClientDetails,
    confirmation: BookingConfirmation
  };

  const StepComponent = steps[state.currentStep];
  
  const handleConfirmCancel = () => {
    dispatch({ type: 'RESET_BOOKING' });
    localStorage.removeItem('bookingDraft');
    navigate('/');
  };

  // components/booking/BookingFlow.jsx - Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && state.currentStep !== 'confirmation') {
        setShowCancelModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.currentStep]);

  return (
    <div className="w-full h-full max-w-6xl mx-auto relative">
      <div className="flex gap-8 relative! h-full">
        <div className="flex-1">
          {/* components/booking/BookingFlow.jsx (updated progress section) */}
          {/* Progress Bar with clickable steps */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {['package', 'date', 'time', 'details', 'confirmation'].map((step, index) => {
                const stepNames = {
                  package: 'Package',
                  date: 'Date',
                  time: 'Time',
                  details: 'Details',
                  confirmation: 'Confirm'
                };
                
                const isActive = state.currentStep === step;
                const isCompleted = 
                  (step === 'package' && state.selectedPackage) ||
                  (step === 'date' && state.selectedDate) ||
                  (step === 'time' && state.selectedTime) ||
                  (step === 'details' && state.clientInfo) ||
                  (step === 'confirmation' && state.bookingStatus === 'success');
                
                // Check if step is clickable (completed or current)
                const isClickable = isCompleted || 
                  (step === 'package') || // Always can go back to package
                  (step === 'date' && state.selectedPackage) ||
                  (step === 'time' && state.selectedDate) ||
                  (step === 'details' && state.selectedTime);
                
                return (
                  <div key={step} className="flex flex-col items-center">
                    <button
                      onClick={() => isClickable && dispatch({ type: 'SET_STEP', payload: step })}
                      disabled={!isClickable}
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                        transition-all duration-300
                        ${isActive ? 'bg-primary text-white scale-110' : ''}
                        ${isCompleted ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}
                        ${isClickable && !isActive ? 'hover:bg-white/20 cursor-pointer' : ''}
                        ${!isClickable ? 'opacity-50 cursor-not-allowed' : ''}
                      `}
                    >
                      {isCompleted ? '✓' : index + 1}
                    </button>
                    <span className="text-xs mt-2 text-white/60">{stepNames[step]}</span>
                  </div>
                );
              })}
            </div>
            <div className="relative mt-2 h-1 bg-white/10 rounded-full">
              <div 
                className="absolute h-full bg-primary rounded-full transition-all duration-500"
                style={{ 
                  width: `${(Object.keys(steps).indexOf(state.currentStep) / (Object.keys(steps).length - 1)) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </div>


        {/* Summary Sidebar - show on md screens and up */}
        {state.selectedPackage && state.currentStep !== 'confirmation' && (
          <div className="hidden md:block w-80">
            <BookingSummary />
          </div>
        )}        
      </div>


        {/* Cancel button */}
        <div className="flex justify-center mt-6 pt-6 border-t border-white/10">
          <button
            onClick={() => setShowCancelModal(true)}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all duration-300 flex items-center gap-2 group"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Cancel Booking</span>
          </button>
        </div>

        {/* Cancel Modal */}
        <CancelBookingModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleConfirmCancel}
        />
    </div>
  );
};

export default BookingFlow;