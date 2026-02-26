// components/booking/ClientDetails.jsx
import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

// Generate unique booking reference
// const generateBookingReference = () => {
//   return 'PHOTO-' + Math.random().toString(36).substr(2, 8).toUpperCase();
// };

const generateBookingReference = () => {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.random().toString(36).substr(2, 4).toUpperCase();
  return `CDP-${year}${month}-${random}`; // Chris Dubem Photography
};

const ClientDetails = () => {
  const { state, dispatch } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      // Generate booking reference HERE (only once)
      const bookingReference = generateBookingReference();
      
      // Save both client info AND booking reference to state
      dispatch({ type: 'SET_CLIENT_INFO', payload: formData });
      dispatch({ type: 'SET_BOOKING_REFERENCE', payload: bookingReference });
      
      // Navigate to confirmation
      dispatch({ type: 'SET_TAB', payload: 'confirmation' });
      
      setIsSubmitting(false);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full text-gray-400">
      {/* ... rest of your form remains exactly the same ... */}
    
      <div className='w-full flex flex-col items-start gap-1'>
        <label className='text-white/80'> Full Name *</label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => {
            setFormData({...formData, name: e.target.value});
            if (errors.name) setErrors({...errors, name: null});
          }}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className='w-full flex flex-col items-start gap-1'>
        <label className='text-white/80'> Email Address *</label>
        <input
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => {
            setFormData({...formData, email: e.target.value});
            if (errors.email) setErrors({...errors, email: null});
          }}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className='w-full flex flex-col items-start gap-1'>
        <label className='text-white/80'> Phone Number (optional)</label>
        <input
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition"
        />
      </div>

      <div className='w-full flex flex-col items-start gap-1'>
        <label className='text-white/80'> Special Requests or Questions (optional)</label>
        <textarea
          placeholder="Tell me about your vision, location preferences, or any special requirements"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows="4"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary-alt text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </span>
        ) : (
          'Complete Booking'
        )}
      </button>

        {/* {error && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-500">
          {error}
        </div>
      )} */}

      <p className="text-xs text-white/40 text-center">
        By completing this booking, you agree to my terms and conditions.
      </p>
    </form>
  );
};

export default ClientDetails;