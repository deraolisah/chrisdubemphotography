// components/booking/BookingConfirmation.jsx
import React, { useEffect } from 'react';
import { useBooking, PACKAGES } from '../../context/BookingContext';
import { format } from 'date-fns';
import { Check, Calendar, Clock, Package, Mail, Phone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingConfirmation = () => {
  const { state, dispatch } = useBooking();

  useEffect(() => {
    // Clear draft from localStorage
    localStorage.removeItem('bookingDraft');
  }, []);

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  return (
    <div className="text-center space-y-6">
      {/* Success Animation */}
      <div className="flex justify-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <Check size={32} className="text-white" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-400 text-lg">
          Thank you for choosing me as your photographer
        </p>
      </div>

      {/* Booking Reference */}
      <div className="bg-white/5 rounded-lg p-6 max-w-md mx-auto">
        <p className="text-white/60 text-sm mb-1">Booking Reference</p>
        <p className="text-2xl font-mono font-bold text-green-400">
          {state.bookingReference || 'PHOTO-' + Math.random().toString(36).substr(2, 8).toUpperCase()}
        </p>
      </div>

      {/* Booking Details */}
      <div className="bg-white/10 rounded-xl p-6 max-w-lg mx-auto text-left space-y-4">
        <h3 className="text-white font-semibold text-lg mb-4">Booking Details</h3>
        
        <div className="flex items-start gap-3">
          <Package className="text-green-400 mt-1" size={18} />
          <div>
            <p className="text-white/60 text-sm">Package</p>
            <p className="text-white font-medium">{state.selectedPackage?.name}</p>
            <p className="text-white/70 text-sm">{state.selectedPackage?.duration} • {state.selectedPackage?.price}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="text-green-400 mt-1" size={18} />
          <div>
            <p className="text-white/60 text-sm">Date</p>
            <p className="text-white font-medium">
              {format(new Date(state.selectedDate), 'EEEE, MMMM do, yyyy')}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="text-green-400 mt-1" size={18} />
          <div>
            <p className="text-white/60 text-sm">Time</p>
            <p className="text-white font-medium">{formatTime(state.selectedTime)}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail className="text-green-400 mt-1" size={18} />
          <div>
            <p className="text-white/60 text-sm">Confirmation Sent To</p>
            <p className="text-white font-medium">{state.clientInfo?.email}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="text-green-400 mt-1" size={18} />
          <div>
            <p className="text-white/60 text-sm">Contact Number</p>
            <p className="text-white font-medium">{state.clientInfo?.phone || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6 max-w-lg mx-auto">
        <h4 className="text-white font-semibold mb-2">What's Next?</h4>
        <p className="text-gray-300 text-sm mb-4">
          I'll review your booking and send a confirmation email within 24 hours. 
          You'll receive details about location, preparation, and what to expect.
        </p>
        <p className="text-white/70 text-sm">
          Have questions? <Link to="/contact" className="text-blue-400 hover:underline">Contact me here</Link>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <Link
          to="/"
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition flex items-center justify-center gap-2"
        >
          Return Home
        </Link>
        <button
          onClick={() => {
            dispatch({ type: 'RESET_BOOKING' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition flex items-center justify-center gap-2"
        >
          Book Another Session
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;