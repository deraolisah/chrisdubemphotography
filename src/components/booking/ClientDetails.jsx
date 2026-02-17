// components/booking/ClientDetails.jsx
import React, { useState } from 'react';
import { useBooking } from '../../context/BookingContext';

const ClientDetails = () => {
  const { state, dispatch } = useBooking();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      dispatch({ type: 'SET_CLIENT_INFO', payload: formData });
      
      // Simulate API call
      setTimeout(() => {
        dispatch({ type: 'SET_BOOKING_STATUS', payload: 'success' });
        dispatch({ type: 'SET_BOOKING_REFERENCE', payload: 'PHOTO-' + Math.random().toString(36).substr(2, 8).toUpperCase() });
        dispatch({ type: 'SET_TAB', payload: 'confirmation' });
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full text-gray-400">
      <div className='w-full flex flex-col items-start gap-1'>
        <label className=''> Full Name * </label>
        <input
          type="text"
          placeholder="John Doe"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
      </div>

      <div className='w-full flex flex-col items-start gap-1'>
        <label className=''> Email Address * </label>
        <input
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary"
        />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className='w-full flex flex-col items-start gap-1'>
        <label className=''> Phone Number </label>
        <input
          type="tel"
          placeholder="+1234567890"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary"
        />
      </div>

      <div className='w-full flex flex-col items-start gap-1'>
        <label> Special Requests or Questions </label>
        <textarea
          placeholder="Tell me about your vision, location preferences, or any special requirements"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
          rows="4"
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-primary"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary-alt text-white py-3 rounded-lg font-medium transition"
      >
        Complete Booking
      </button>
    </form>
  );
};

export default ClientDetails;