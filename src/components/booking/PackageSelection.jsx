// components/booking/PackageSelection.jsx
import React from 'react';
import { useBooking, PACKAGES } from '../../context/BookingContext';
import { Check, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const PackageSelection = () => {
  const { state, dispatch } = useBooking();
  const navigate = useNavigate();

  // const handleCancel = () => {
  //   if (window.confirm('Cancel booking? Your progress will be lost.')) {
  //     dispatch({ type: 'RESET_BOOKING' });
  //     localStorage.removeItem('bookingDraft');
  //     navigate('/');
  //   }
  // };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Choose Your Session
        </h2>
        <p className="text-gray-400">
          Select the photography package that best fits your needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {PACKAGES.map((pkg) => (
          <button
            key={pkg.id}
            onClick={() => dispatch({ type: 'SELECT_PACKAGE', payload: pkg })}
            className={`
              relative p-6 rounded-xl text-left flex flex-col items-start transition-all duration-300
              ${state.selectedPackage?.id === pkg.id 
                ? 'bg-green-500/20 border-2 border-green-500' 
                : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }
            `}
          >
            {state.selectedPackage?.id === pkg.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}
            
            <h3 className="text-xl font-semibold text-white mb-2">{pkg.name}</h3>
            
            <div className="flex items-center gap-2 text-white/60 mb-4">
              <Clock size={16} />
              <span className="text-sm">{pkg.duration}</span>
            </div>
            
            <div className="text-2xl font-bold text-white mb-4">
              {pkg.price}
            </div>
            
            <p className="text-gray-400 text-sm mb-4">
              {pkg.description}
            </p>
            
            <ul className="space-y-2">
              {pkg.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                  <Check size={14} className="text-green-400 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </button>
        ))}
      </div>

      {/* Cancel button */}
      {/* <div className="flex justify-center pt-6 border-t border-white/10">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all duration-300 flex items-center gap-2 group"
        >
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Cancel Booking</span>
        </button>
      </div> */}
    </div>
  );
};

export default PackageSelection;