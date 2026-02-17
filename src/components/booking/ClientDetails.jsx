// components/booking/ClientDetails.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useBooking } from '../../context/BookingContext';
import { ChevronLeft, Send } from 'lucide-react';

const ClientDetails = () => {
  const { state, dispatch } = useBooking();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch({ type: 'SET_CLIENT_INFO', payload: data });
    dispatch({ type: 'SET_STEP', payload: 'confirmation' });
    
    // Here you would typically send to your backend
    submitBooking(data);
  };

  const submitBooking = async (clientData) => {
    dispatch({ type: 'SET_BOOKING_STATUS', payload: 'loading' });
    
    try {
      const response = await fetch('/api/create-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: state.selectedPackage,
          date: state.selectedDate,
          time: state.selectedTime,
          client: clientData
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: 'SET_BOOKING_STATUS', payload: 'success' });
        dispatch({ type: 'SET_BOOKING_REFERENCE', payload: data.reference });
        dispatch({ type: 'SET_STEP', payload: 'confirmation' });
      } else {
        dispatch({ type: 'SET_BOOKING_STATUS', payload: 'error' });
      }
    } catch (error) {
      console.error('Booking error:', error);
      dispatch({ type: 'SET_BOOKING_STATUS', payload: 'error' });
    }
  };

  const handleBack = () => {
    dispatch({ type: 'GO_BACK' });
  };

  return (
    <div className="space-y-6">
      <button
        onClick={handleBack}
        className="text-white/60 hover:text-white flex items-center mx-auto gap-1"
      >
        <ChevronLeft size={16} />
        Back to Time
      </button>

      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Your Information
        </h2>
        <p className="text-gray-400">
          Please provide your details to complete the booking
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label className="block text-white/70 text-sm mb-2">
            Full Name *
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition"
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">
            Email Address *
          </label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            type="email"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">
            Phone Number
          </label>
          <input
            {...register('phone')}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition"
            placeholder="+41 79 123 45 67"
          />
        </div>

        <div>
          <label className="block text-white/70 text-sm mb-2">
            Special Requests or Questions
          </label>
          <textarea
            {...register('message')}
            rows="4"
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-green-500 transition"
            placeholder="Tell me about your vision, location preferences, or any special requirements..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-primary-alt text-white py-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300"
        >
          Complete Booking
          <Send size={18} />
        </button>

        <p className="text-white/40 text-xs text-center">
          By completing this booking, you agree to my terms and conditions.
          You'll receive a confirmation email within 24 hours.
        </p>
      </form>
    </div>
  );
};

export default ClientDetails;