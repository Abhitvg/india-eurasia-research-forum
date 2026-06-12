"use client";

import React, { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight, MessageSquare, CheckCircle, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SubHero from '@/src/components/SubHero';
import { useContent } from '@/src/context/ContentContext';
import SEOHead from '@/src/components/SEOHead';
import ScrollReveal from '@/src/components/ScrollReveal';

export default function Contact() {
  const { content } = useContent();
  if (!content || !content.contact) return null;
  const c = content.contact;
  const contactIcons = [<Mail size={24} />, <MapPin size={24} />, <Phone size={24} />];

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
    <div className="flex flex-col min-h-screen bg-[#FAFAFA]">
      <SEOHead
        title="Contact Us"
        description="Get in touch with the India Eurasia Research Forum. Reach out for research collaborations, academic inquiries, event partnerships, or general questions."
        path="/contact"
      />
      <SubHero 
        title="Contact Us" 
        subtitle={c.subtitle}
        breadcrumb={[{ label: 'Contact' }]}
      />

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* ── CONTACT INFO SIDEBAR ── */}
            <div className="lg:col-span-5 space-y-8">
              <ScrollReveal>
                <h2 className="text-[#E87722] font-black text-[10px] uppercase tracking-[0.4em] mb-4">Connect</h2>
                <h3 className="text-4xl md:text-5xl font-black text-[#0A192F] mb-6 tracking-tighter font-display leading-tight">{c.heading} <br />{c.subheading}</h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-12">
                  {c.body}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-6">
                {c.info?.map((info: any, idx: number) => (
                  <ScrollReveal key={idx} delay={idx * 0.1}>
                     <a
                       href={info.href}
                       className="flex items-center p-6 sm:p-8 transition-all duration-500 group bg-white border border-gray-100 hover:border-[#E87722]/30 rounded-xl shadow-sm hover:shadow-2xl hover:shadow-[#E87722]/10"
                     >
                       <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-[#0A192F] group-hover:bg-[#E87722] group-hover:text-white transition-all duration-500 mr-6 flex-shrink-0 shadow-inner group-hover:shadow-[0_0_20px_rgba(232,119,34,0.4)] group-hover:scale-110">
                         {contactIcons[idx % contactIcons.length]}
                       </div>
                       <div>
                         <h4 className="text-lg font-black text-[#0A192F] mb-1 tracking-tight group-hover:text-[#E87722] transition-colors">{info.title}</h4>
                         <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase tracking-widest">{info.desc}</p>
                         <p className="text-[#E87722] font-black text-sm">{info.value}</p>
                       </div>
                     </a>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* ── CONTACT FORM ── */}
            <ScrollReveal delay={0.2} className="lg:col-span-7 h-full">
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
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
