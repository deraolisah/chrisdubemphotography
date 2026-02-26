// components/booking/BookingConfirmation.jsx
import React, { useEffect, useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Check, Download, Mail, Calendar, Clock, Package, User, Phone, FileText } from 'lucide-react';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const BookingConfirmation = () => {
  const { state, dispatch } = useBooking();
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    localStorage.removeItem('bookingDraft');
    // Only create booking if we don't have a reference yet
    if (!state.bookingReference && !emailSent && !sendingEmail) {
      createBooking();
    }
  }, []);

  const createBooking = async () => {
    setSendingEmail(true);
    
    try {
      const response = await fetch(`${API_URL}/api/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          package: state.selectedPackage,
          date: state.selectedDate,
          time: state.selectedTime,
          client: state.clientInfo,
          reference: state.bookingReference
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        dispatch({ type: 'SET_BOOKING_REFERENCE', payload: data.reference });
        setEmailSent(true);
        console.log('Booking created:', data);
      } else {
        console.error('Failed to create booking:', data.message);
      }
    } catch (error) {
      console.error('Error creating booking:', error);     
    } finally {
      setSendingEmail(false);
    }
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const formatDate = (date) => {
    if (!date) return '';
    return format(new Date(date), 'EEEE, MMMM do, yyyy');
  };

  // Generate PDF Receipt
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add company logo/header
    doc.setFillColor(16, 185, 129);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Booking Confirmation', 20, 25);
    
    // Reset text color for content
    doc.setTextColor(0, 0, 0);
    
    // Booking Reference
    doc.setFontSize(16);
    doc.text('Booking Reference:', 20, 60);
    doc.setFontSize(20);
    doc.setTextColor(16, 185, 129);
    doc.text(state.bookingReference || 'N/A', 20, 70);
    
    // Customer Details
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Customer Details', 20, 90);
    
    doc.setFontSize(12);
    doc.text(`Name: ${state.clientInfo?.name || 'N/A'}`, 20, 100);
    doc.text(`Email: ${state.clientInfo?.email || 'N/A'}`, 20, 110);
    doc.text(`Phone: ${state.clientInfo?.phone || 'Not provided'}`, 20, 120);
    
    // Booking Details
    doc.setFontSize(14);
    doc.text('Booking Details', 20, 140);
    
    const bookingData = [
      ['Package', state.selectedPackage?.name || 'N/A'],
      ['Duration', state.selectedPackage?.duration || 'N/A'],
      ['Price', `$${state.selectedPackage?.price || 'N/A'}`],
      ['Date', formatDate(state.selectedDate)],
      ['Time', formatTime(state.selectedTime)],
      ['Reference', state.bookingReference || 'N/A'],
      ['Special Requests', state.clientInfo?.message || 'None']
    ];
    
    doc.autoTable({
      startY: 150,
      head: [['Item', 'Details']],
      body: bookingData,
      theme: 'striped',
      headStyles: { fillColor: [16, 185, 129] },
    });
    
    // What's Included
    if (state.selectedPackage?.includes) {
      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(14);
      doc.text("What's Included", 20, finalY);
      
      doc.setFontSize(11);
      state.selectedPackage.includes.forEach((item, index) => {
        doc.text(`• ${item}`, 25, finalY + 10 + (index * 7));
      });
    }
    
    // Special Requests
    if (state.clientInfo?.message) {
      const finalY = doc.lastAutoTable.finalY + 40;
      doc.setFontSize(14);
      doc.text('Special Requests', 20, finalY);
      doc.setFontSize(11);
      doc.text(state.clientInfo.message, 25, finalY + 10);
    }
    
    // Terms
    const termsY = doc.lastAutoTable.finalY + 70;
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Please arrive 10 minutes before your scheduled time.', 20, termsY);
    doc.text('For cancellations or changes, contact us at least 24 hours in advance.', 20, termsY + 7);
    
    // Save PDF
    doc.save(`booking-${state.bookingReference || 'confirmation'}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Success Animation */}
      <div className="text-center">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <Check size={32} className="text-white" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-gray-400">
          Thank you for choosing me as your photographer
        </p>
      </div>

      {/* Booking Reference Card */}
      <div className="bg-linear-to-br from-primary/20 to-primary/5 rounded-xl p-6 max-w-2xl mx-auto border border-primary/30">
        <p className="text-white/60 text-sm mb-1 text-start">Booking Reference</p>
        <div className="flex items-center justify-between">
          <p className="text-2xl font-mono font-bold text-primary">
            {state.bookingReference}
          </p>
          <button
            onClick={generatePDF}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition group"
            title="Download Receipt"
          >
            <Download size={18} className="text-white/60 group-hover:text-white cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white/5 rounded-xl p-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText size={18} className="text-primary" />
          Booking Details
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Package */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Package size={20} className="text-primary shrink-0" />
              <div className="flex items-start flex-col">
                <span className="text-white/60 text-sm block">Package</span>
                <p className="text-white font-medium">
                  {state.selectedPackage?.name} 
                  &nbsp;-
                  <span className="text-primary"> ${state.selectedPackage?.price}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Calendar size={20} className="text-primary shrink-0" />
              <div className='flex flex-col items-start'>
                <span className="text-white/60 text-sm block">Date</span>
                <p className="text-white font-medium">
                  {formatDate(state.selectedDate)}
                </p>
              </div>
            </div>
          </div>

          {/* Time */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Clock size={20} className="text-primary shrink-0" />
              <div className='flex flex-col items-start'>
                <span className="text-white/60 text-sm block">Time</span>
                <p className="text-white font-medium">
                  {formatTime(state.selectedTime)}
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <User size={20} className="text-primary shrink-0" />
              <div className='flex flex-col items-start'>
                {/* <span className="text-white/60 text-sm block">Contact</span> */}
                <p className="text-white font-medium">{state.clientInfo?.name}</p>
                <p className="text-white/60 text-sm">{state.clientInfo?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Requests */}
        {state.clientInfo?.message && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <p className="text-white/60 text-sm mb-1">Special Requests</p>
            <p className="text-white">{state.clientInfo.message}</p>
          </div>
        )}
      </div>

      {/* Email Status */}
      <div className="text-center">
        {emailSent ? (
          <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
            <Check size={16} />
            <span>Confirmation email sent to {state.clientInfo?.email}</span>
          </div>
        ) : sendingEmail ? (
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Creating your booking...</span>
          </div>
        ) : null}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <button
          onClick={generatePDF}
          className="px-6 py-3 bg-primary hover:bg-primary-alt text-white rounded-lg transition flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Download size={16} className="group-hover:scale-110 transition" />
          Download Receipt
        </button>
        
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            dispatch({ type: 'RESET_BOOKING' });
          }}
          className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition"
        >
          Book Another Session
        </button>
      </div>

      {/* Important Notes */}
      <div className="text-xs text-white/40 text-center max-w-md mx-auto">
        <p>Please arrive 10 minutes before your scheduled time.</p>
        <p className="mt-1">For cancellations or changes, contact us at least 24 hours in advance.</p>
      </div>
    </div>
  );
};

export default BookingConfirmation;