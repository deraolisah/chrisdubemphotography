// components/booking/PackageSelection.jsx
import React from 'react';
import { useBooking, PACKAGES } from '../../context/BookingContext';
import { Check, Clock } from 'lucide-react';

const PackageSelection = () => {
  const { state, dispatch } = useBooking();

  return (
    <div className="space-y-6 w-full">
      <div className="w-full grid md:grid-cols-2 gap-4">
        {PACKAGES.map((pkg) => {
          const isSelected = state.selectedPackage?.id === pkg.id;
          
          return (
            <button
              key={pkg.id}
              onClick={() => dispatch({ type: 'SELECT_PACKAGE', payload: pkg })}
              className={`
                relative p-5 rounded-lg text-left transition-all
                ${isSelected 
                  ? 'bg-primary/10 border-2 border-primary' 
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-white mb-1">{pkg.name}</h3>
              
              <div className="flex items-center gap-2 text-white/60 text-sm mb-2">
                <Clock size={14} />
                <span>{pkg.duration}</span>
              </div>
              
              <div className="text-xl font-bold text-white mb-3">
                {pkg.priceDisplay}
              </div>
              
              <p className="text-gray-400 text-sm mb-3">
                {pkg.description}
              </p>
              
              <ul className="space-y-1">
                {pkg.includes.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/70">
                    <Check size={12} className="text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
                {/* {pkg.includes.length > 3 && (
                  <li className="text-xs text-white/40">
                    +{pkg.includes.length - 3} more
                  </li>
                )} */}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PackageSelection;