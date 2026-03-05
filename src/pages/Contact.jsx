import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from "lucide-react";


const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorMessage('');
    }
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      setErrorMessage('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setErrorMessage('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Subject is required');
      return false;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Message is required');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Send data to backend
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message 
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Success! Clear form and show success message
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        // Show error from server
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Write To Me</h1>
        <p className="text-gray-300">
          Have a project in mind, a question, or just want to say hi?
          Fill out the form below and I'll get back to you shortly.
        </p>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-green-500/10 border border-green-500 rounded-lg flex items-center gap-3 text-green-500">
          <CheckCircle size={20} />
          <span>Thank you for your message! We'll get back to you within 24 hours.</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="max-w-3xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-center gap-3 text-red-500">
          <AlertCircle size={20} />
          <span>{errorMessage || 'Failed to send message. Please try again.'}</span>
        </div>
      )}

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary bg-transparent"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary bg-transparent"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Subject */}
        <div className="md:col-span-2">
          <label htmlFor="subject" className="block text-sm font-medium mb-2">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Photography booking, collaboration, etc."
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary bg-transparent"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="6"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell me about your project..."
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary bg-transparent resize-y"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 text-center flex items-center justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              bg-primary text-white px-8 py-3 rounded-full 
              transition flex items-center gap-2 cursor-pointer
              ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message
                <Send size={18} />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;