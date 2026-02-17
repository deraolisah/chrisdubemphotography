// components/booking/BookingTabs.jsx
import React from 'react';
import { useBooking } from '../../context/BookingContext';
import PackageSelection from './PackageSelection';
import DateSelection from './DateSelection';
import TimeSelection from './TimeSelection';
import ClientDetails from './ClientDetails';
import BookingConfirmation from './BookingConfirmation';
import { motion, AnimatePresence } from 'framer-motion';

// Header content for each tab
const headerContent = {
  package: {
    title: "Choose Your Session",
    subtitle: "Select the photography package that best fits your needs"
  },
  date: {
    title: "Select a Date",
    subtitle: "Choose your preferred session date"
  },
  time: {
    title: "Pick a Time",
    subtitle: "Select an available time slot for your session"
  },
  details: {
    title: "Your Information",
    subtitle: "Please provide your details to complete the booking"
  },
  confirmation: {
    title: "Booking Confirmed!",
    subtitle: "Thank you for choosing me as your photographer"
  }
};

const BookingTabs = () => {
  const { state, dispatch } = useBooking();

  const tabs = [
    { id: 'package', label: 'Package', icon: '📸' },
    { id: 'date', label: 'Date', icon: '📅' },
    { id: 'time', label: 'Time', icon: '⏰' },
    { id: 'details', label: 'Details', icon: '📝' },
    { id: 'confirmation', label: 'Confirm', icon: '✓' }
  ];

  const components = {
    package: PackageSelection,
    date: DateSelection,
    time: TimeSelection,
    details: ClientDetails,
    confirmation: BookingConfirmation
  };

  const ActiveComponent = components[state.activeTab];
  const currentHeader = headerContent[state.activeTab];

  const isTabAccessible = (tabId) => {
    if (tabId === 'package') return true;
    if (tabId === 'date' && state.selectedPackage) return true;
    if (tabId === 'time' && state.selectedDate) return true;
    if (tabId === 'details' && state.selectedTime) return true;
    if (tabId === 'confirmation' && state.clientInfo) return true;
    return false;
  };

  return (
    <div className="space-y-6 mx-auto text-center flex flex-col items-center justify-center w-full">
      {/* Dynamic Header Section */}
      <motion.div
        key={state.activeTab}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
          {currentHeader.title}
        </h1>
        <p className="text-gray-400">
          {currentHeader.subtitle}
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="border-b border-white/10 w-full max-w-3xl">
        <nav className="flex w-full">
          {tabs.map((tab) => {
            const isActive = state.activeTab === tab.id;
            const isAccessible = isTabAccessible(tab.id);
            const isCompleted = 
              (tab.id === 'package' && state.selectedPackage) ||
              (tab.id === 'date' && state.selectedDate) ||
              (tab.id === 'time' && state.selectedTime) ||
              (tab.id === 'details' && state.clientInfo);

            return (
              <button
                key={tab.id}
                onClick={() => isAccessible && dispatch({ type: 'SET_TAB', payload: tab.id })}
                className={`
                  group relative w-full flex-1 py-4 px-1 text-center
                  transition-all duration-200
                  ${isAccessible ? 'cursor-pointer' : 'cursor-not-allowed opacity-30'}
                `}
              >
                {/* <span className="block text-2xl mb-1">{tab.icon}</span> */}
                <span className={`
                  text-sm font-medium block
                  ${isActive ? 'text-primary' : 'text-white/60'}
                `}>
                  {tab.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  />
                )}

                {/* Completed Check */}
                {/* {isCompleted && !isActive && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-[10px] text-white">✓</span>
                  </span>
                )} */}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-8 w-full max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className=''
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingTabs;