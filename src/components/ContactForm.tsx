"use client";

import React, { useState } from 'react';
import { ArrowRight, MessageSquare, CheckCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newInquiry = {
      type: 'contact',
      data: formData,
      date: new Date().toISOString()
    };

    const existing = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)('ierf_inquiries') || '[]');
    (typeof window !== 'undefined' ? localStorage.setItem.bind(localStorage) : () => {})('ierf_inquiries', JSON.stringify([...existing, newInquiry]));

    setStatus('success');
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setStatus('idle');
  };

  return (
    <div className="p-10 md:p-16 relative overflow-hidden bg-white rounded-xl shadow-2xl shadow-[#0A192F]/5 border border-gray-100 h-full">
      <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
        <MessageSquare size={250} />
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="h-full flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-emerald-500 rounded-3xl flex items-center justify-center mb-10 shadow-xl shadow-emerald-500/20">
              <CheckCircle size={48} className="text-white" />
            </div>
            <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-6 tracking-tighter font-display">Message Sent!</h3>
            <p className="text-gray-500 text-lg font-medium mb-12 max-w-sm">
              Thank you for reaching out. We have received your inquiry and will get back to you shortly.
            </p>
            <button 
              onClick={resetForm}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-50 text-[#0A192F] rounded-full font-black text-[10px] uppercase tracking-[0.2em] border border-gray-200 hover:border-[#E87722] hover:bg-[#E87722] hover:text-white transition-all shadow-sm"
            >
              <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-3xl font-black text-[#0A192F] mb-12 tracking-tighter flex items-center font-display">
              Send a Message
              <div className="ml-6 h-1.5 w-16 bg-[#E87722] rounded-full"></div>
            </h3>
            
            <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-[#E87722] focus:bg-white outline-none transition-all font-bold text-[#0A192F] placeholder:text-gray-300 disabled:opacity-50"
                    placeholder="Enter your name"
                    disabled={status === 'submitting'}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-[#E87722] focus:bg-white outline-none transition-all font-bold text-[#0A192F] placeholder:text-gray-300 disabled:opacity-50"
                    placeholder="Enter your email"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  required
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-[#E87722] focus:bg-white outline-none transition-all font-bold text-[#0A192F] placeholder:text-gray-300 disabled:opacity-50"
                  placeholder="Inquiry topic"
                  disabled={status === 'submitting'}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows={5}
                  required
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-4 bg-gray-50 rounded-2xl border border-transparent focus:border-[#E87722] focus:bg-white outline-none transition-all font-bold text-[#0A192F] placeholder:text-gray-300 resize-none disabled:opacity-50"
                  placeholder="How can we help you?"
                  disabled={status === 'submitting'}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="group inline-flex items-center justify-center w-full gap-3 px-10 py-5 bg-[#0A192F] text-white rounded-full font-black text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-[#E87722] transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:hover:-translate-y-0"
              >
                {status === 'submitting' ? (
                  <>
                    Transmitting...
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin ml-2" />
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
