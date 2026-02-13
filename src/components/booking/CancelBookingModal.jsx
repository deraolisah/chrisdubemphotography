// components/booking/CancelBookingModal.jsx
import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

const CancelBookingModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm">
      <div className="bg-dark border border-white/10 rounded-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
            <AlertTriangle className="text-red-400" size={24} />
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition"
          >
            <X size={18} className="text-white/60" />
          </button>
        </div>

        <h3 className="text-xl font-bold text-white mb-2">
          Cancel Booking?
        </h3>
        
        <p className="text-gray-400 mb-6">
          Are you sure you want to cancel? All your progress will be lost and you'll need to start over.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
          >
            Continue Booking
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;