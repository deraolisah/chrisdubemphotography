import React from 'react';
import { X, Calendar, Clock, Package, User, Mail, Phone, FileText, Download, DollarSign } from 'lucide-react';

const BookingDetailsModal = ({ booking, onClose, onUpdateStatus }) => {
  if (!booking) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`http://localhost:3001/api/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        onUpdateStatus();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-dark border border-white/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-dark border-b border-white/10 py-3 p-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Booking Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white rounded-lg transition cursor-pointer"
          >
            <X size={20} className="text-white/60" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Booking Reference */}
          <div className="bg-primary/10 rounded-lg p-4 border border-primary/30">
            <p className="text-white/60 text-sm mb-1">Booking Reference</p>
            <p className="text-2xl font-mono font-bold text-primary">
              {booking.bookingReference}
            </p>
          </div>

          {/* Client Information */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <User size={18} className="text-primary" />
              Client Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User size={16} className="text-primary/60 mt-1" />
                <div>
                  <p className="text-white/40 text-xs">Name</p>
                  <p className="text-white">{booking.clientName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-primary/60 mt-1" />
                <div>
                  <p className="text-white/40 text-xs">Email</p>
                  <p className="text-white">{booking.clientEmail}</p>
                </div>
              </div>
              {booking.clientPhone && (
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-primary/60 mt-1" />
                  <div>
                    <p className="text-white/40 text-xs">Phone</p>
                    <p className="text-white">{booking.clientPhone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Session Details */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-primary" />
              Session Details
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Package size={16} className="text-primary/60 mt-1" />
                <div>
                  <p className="text-white/40 text-xs">Package</p>
                  <p className="text-white">{booking.package?.name}</p>
                  <p className="text-xs text-white/40">{booking.package?.duration}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar size={16} className="text-primary/60 mt-1" />
                <div>
                  <p className="text-white/40 text-xs">Date</p>
                  <p className="text-white">{formatDate(booking.sessionDate)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-primary/60 mt-1" />
                <div>
                  <p className="text-white/40 text-xs">Time</p>
                  <p className="text-white">{formatTime(booking.sessionTime)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign size={16} className="text-primary/60 mt-1" />
                <div>
                  <p className="text-white/40 text-xs">Price</p>
                  <p className="text-white font-semibold">${booking.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequests && (
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FileText size={18} className="text-primary" />
                Special Requests
              </h3>
              <p className="text-white/80">{booking.specialRequests}</p>
            </div>
          )}

          {/* What's Included */}
          {booking.package?.includes && (
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">What's Included</h3>
              <ul className="space-y-2">
                {booking.package.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-white/80">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Status Update */}
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Update Status</h3>
            <div className="flex flex-wrap gap-2">
              {['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    booking.status === status
                      ? 'bg-primary text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsModal;