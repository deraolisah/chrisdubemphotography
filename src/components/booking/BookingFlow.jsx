// components/booking/BookingFlow.jsx
import React, { useState } from 'react';
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

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Progress Bar */}
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
            
            return (
              <div key={step} className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${isActive ? 'bg-primary text-white' : ''}
                  ${isCompleted ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}
                `}>
                  {isCompleted ? '✓' : index + 1}
                </div>
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

      {/* Cancel button - always visible */}
      {/* <button
        onClick={handleCancel}
        className="absolute top-0 right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 flex items-center gap-2 group z-10"
        aria-label="Cancel booking"
      >
        <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-sm hidden sm:inline">Cancel</span>
      </button> */}


      
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

      {/* Cancel button */}
      {/* <button
        onClick={() => setShowCancelModal(true)}
        className="absolute top-0 right-0 p-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 flex items-center gap-2 group z-10"
      >
        <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-sm hidden sm:inline">Cancel</span>
      </button> */}


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