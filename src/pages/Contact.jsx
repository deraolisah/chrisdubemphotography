import React from 'react';
import { Send } from "lucide-react";

const Contact = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      {/* Heading */}
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4"> Write To Me </h1>
        <p className="text-gray-300">
          Have a project in mind, a question, or just want to say hi?
          Fill out the form below and I’ll get back to you shortly.
        </p>
      </div>

      {/* Contact Form */}
      <form className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            placeholder="Your full name"
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Subject */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            type="text"
            placeholder="Photography booking, collaboration, etc."
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea
            rows="6"
            placeholder="Tell me about your project..."
            className="w-full border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-primary"
          />
        </div>

        {/* Button */}
        <div className="md:col-span-2 text-center flex items-center justify-center mt-4">
          <button
            type="submit"
            className="bg-primary text-white px-8 py-3 rounded-full hover:opacity-90 transition flex items-center gap-2 cursor-pointer"
          >
            Send Message
            <Send size={18} />
          </button>
        </div>
      </form>
    </section>
  );
};

export default Contact;