import React, { useState, useEffect } from 'react';
import { RefreshCw, DollarSign, Calendar, CheckCircle, Clock } from 'lucide-react';
import BookingDetailsModal from '../components/admin/BookingDetailsModal';

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Format time function (convert 24h to 12h format)
  const formatTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  // Load all bookings
  const loadBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data = await response.json();
      setBookings(data);
      return data;
    } catch (err) {
      console.error('Error loading bookings:', err);
      throw err;
    }
  };

  // Load statistics
  const loadStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/stats');
      if (!response.ok) throw new Error('Failed to fetch stats');
      
      const data = await response.json();
      setStats(data);
      return data;
    } catch (err) {
      console.error('Error loading stats:', err);
      throw err;
    }
  };

  // Load all data
  const loadAllData = async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      await Promise.all([
        loadBookings(),
        loadStats()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadAllData();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(loadAllData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // Get status badge color
  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-md text-xs font-semibold uppercase";
    
    switch(status) {
      case 'PENDING':
        return `${baseClasses} bg-orange-500/20 text-orange-500 border border-orange-500`;
      case 'CONFIRMED':
        return `${baseClasses} bg-green-500/20 text-green-500 border border-green-500`;
      case 'CANCELLED':
        return `${baseClasses} bg-red-500/20 text-red-500 border border-red-500`;
      case 'COMPLETED':
        return `${baseClasses} bg-blue-500/20 text-blue-500 border border-blue-500`;
      default:
        return `${baseClasses} bg-gray-500/20 text-gray-500 border border-gray-500`;
    }
  };



    // Add view details handler
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  useEffect(() => {
    if(modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [modalOpen]);

  // Handle status update
  const handleStatusUpdate = () => {
    loadAllData(); // Refresh data after status update
  };

  // if(loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-dark">
  //       <div className="flex items-center gap-2 text-white/60">
  //         <RefreshCw size={16} className="animate-spin" />
  //         Loading admin dashboard...
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <section className="min-h-screen bg-dark pt-10 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <span className="text-3xl">📸</span>
            Photography Booking Admin
          </h1>
          
          <button 
            className="bg-primary hover:bg-primary-alt disabled:bg-primary/50 text-white px-4 py-2 text-sm inline-flex items-center gap-2 rounded-lg transition-all duration-200"
            onClick={loadAllData}
            disabled={refreshing}
          >
            <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-500">
            Error: {error}
          </div>
        )}
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Total Bookings */}
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-primary">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-primary">
                {loading ? '...' : stats.totalBookings}
              </div>
              <Calendar className="text-primary/40" size={24} />
            </div>
            <div className="text-sm text-white/60">Total Bookings</div>
          </div>

          {/* Pending */}
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-orange-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-orange-500">
                {loading ? '...' : stats.pendingBookings}
              </div>
              <Clock className="text-orange-500/40" size={24} />
            </div>
            <div className="text-sm text-white/60">Pending</div>
          </div>

          {/* Confirmed */}
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-green-500">
                {loading ? '...' : stats.confirmedBookings}
              </div>
              <CheckCircle className="text-green-500/40" size={24} />
            </div>
            <div className="text-sm text-white/60">Confirmed</div>
          </div>

          {/* Revenue */}
          <div className="bg-white/5 p-6 rounded-xl border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2">
              <div className="text-3xl font-bold text-blue-500">
                {loading ? '...' : `$${stats.revenue}`}
              </div>
              <DollarSign className="text-blue-500/40" size={24} />
            </div>
            <div className="text-sm text-white/60">Revenue</div>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-250">
              <thead className="bg-primary">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Client</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Package</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-white">Created</th>
                </tr>
              </thead>
              {/* // Update the table body section - make rows clickable */}
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-white/60">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw size={16} className="animate-spin" />
                        Loading bookings...
                      </div>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-8 text-center text-white/60">
                      No bookings yet
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr 
                      key={booking._id} 
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => handleViewDetails(booking)}
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-primary">
                          {booking.bookingReference}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="text-white">{booking.clientName}</span>
                          <span className="text-xs text-white/40">{booking.clientEmail}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-white">{booking.package?.name || 'N/A'}</td>
                      <td className="px-4 py-3 text-white">{formatDate(booking.sessionDate)}</td>
                      <td className="px-4 py-3 text-white">{formatTime(booking.sessionTime)}</td>
                      <td className="px-4 py-3 text-white">${booking.price}</td>
                      <td className="px-4 py-3">
                        <span className={getStatusBadge(booking.status)}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/60 text-sm">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-4 text-xs text-white/40 text-right">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedBooking(null);
        }}
        onUpdateStatus={handleStatusUpdate}
      />
    </section>
  );
};

export default Admin;