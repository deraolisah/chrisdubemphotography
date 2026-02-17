// components/booking/BookingSidebar.jsx
import React from 'react';
import { useBooking, PACKAGES } from '../../context/BookingContext';
import { format } from 'date-fns';
import { X, Calendar, Clock, Package, Mail, Phone, ChevronRight, Camera, User, CheckCircle } from 'lucide-react';

const BookingSidebar = ({ onClose, isMobile }) => {
  const { state } = useBooking();
  const { selectedPackage, selectedDate, selectedTime, clientInfo, activeTab } = state;

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getTotalPrice = () => {
    if (!selectedPackage) return 0;
    return selectedPackage.price || 0;
  };

  // Calculate completion percentage
  const getCompletionPercentage = () => {
    let completed = 0;
    if (selectedPackage) completed += 25;
    if (selectedDate) completed += 25;
    if (selectedTime) completed += 25;
    if (clientInfo) completed += 25;
    return completed;
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <div className="h-full flex flex-col">
      {/* Header - Fixed at top */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Booking Summary</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-white/40 mb-1">
            <span>Progress</span>
            <span>{completionPercentage}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Package */}
        {selectedPackage ? (
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                <Package size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-xs mb-1">Package</p>
                <p className="text-white font-medium truncate">{selectedPackage.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-white/40">{selectedPackage.duration}</span>
                  <span className="text-primary text-sm font-semibold">${selectedPackage.price}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <Camera size={24} className="text-white/20 mx-auto mb-2" />
            <p className="text-white/40 text-sm">No package selected yet</p>
          </div>
        )}

        {/* Date & Time */}
        {(selectedDate || selectedTime) && (
          <div className="space-y-3 bg-white/5 rounded-lg p-4">
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">
              Schedule
            </h3>
            {selectedDate && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Calendar size={16} className="text-white/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-xs">Date</p>
                  <p className="text-white text-sm">
                    {format(new Date(selectedDate), 'EEE, MMM d, yyyy')}
                  </p>
                </div>
              </div>
            )}
            
            {selectedTime && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-white/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-xs">Time</p>
                  <p className="text-white text-sm">{formatTime(selectedTime)}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Client Info */}
        {clientInfo && (
          <div className="space-y-3 bg-white/5 rounded-lg p-4">
            <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">
              Contact Information
            </h3>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                <User size={16} className="text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-xs">Name</p>
                <p className="text-white text-sm truncate">{clientInfo.name}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                <Mail size={16} className="text-white/40" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white/40 text-xs">Email</p>
                <p className="text-white text-sm truncate">{clientInfo.email}</p>
              </div>
            </div>
            
            {clientInfo.phone && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-white/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-xs">Phone</p>
                  <p className="text-white text-sm">{clientInfo.phone}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Price Total */}
        {selectedPackage && (
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-white/60">Total</span>
              <span className="text-2xl font-bold text-primary">
                ${getTotalPrice()}
              </span>
            </div>
            <p className="text-white/40 text-xs mt-1">Inclusive of all taxes</p>
          </div>
        )}
      </div>

      {/* Current Step Indicator - Fixed at bottom */}
      <div className="p-6 border-t border-white/10 bg-dark/50 backdrop-blur-sm">
        <p className="text-xs text-primary mb-2">Current Step</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white text-sm capitalize">{activeTab}</span>
            <ChevronRight size={14} className="text-primary" />
          </div>
          
          {/* Status Badge */}
          {completionPercentage === 100 ? (
            <span className="flex items-center gap-1 text-xs text-green-400">
              <CheckCircle size={14} />
              Complete
            </span>
          ) : (
            <span className="text-xs text-white/40">
              {4 - Math.floor(completionPercentage / 25)} steps left
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingSidebar;