"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Footer() {
  const { content } = useContent();
  const c = content.footer;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newInquiry = {
      type: 'newsletter',
      data: { email },
      date: new Date().toISOString()
    };

    const existing = JSON.parse((typeof window !== 'undefined' ? localStorage.getItem.bind(localStorage) : () => null)('ierf_inquiries') || '[]');
    (typeof window !== 'undefined' ? localStorage.setItem.bind(localStorage) : () => {})('ierf_inquiries', JSON.stringify([...existing, newInquiry]));

    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <footer className="bg-[#1B3B5F] text-white pt-20 pb-10 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#E87722] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400 opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-2.5 group-hover:scale-110 transition-all duration-500 shadow-lg group-hover:shadow-[#E87722]/40 border border-white/10 relative overflow-hidden">
                 {/* Golden hover glow */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-[#E87722]/0 to-[#E87722]/0 group-hover:from-[#E87722]/5 group-hover:to-[#E87722]/10 transition-all duration-500"></div>
                 <img src="/ierf_normal.png" alt="IERF Logo" className="w-full h-full object-contain relative z-10" />
              </div>
              <div className="flex items-center">
                <span className="text-white font-bold text-sm tracking-widest uppercase" style={{ fontFamily: '"Outfit", sans-serif', letterSpacing: '0.1em' }}>{content.settings?.siteName || "INDIA EURASIA RESEARCH FORUM"}</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              {c.description}
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: <Twitter size={18} />, href: content.settings?.socials.x },
                { icon: <Instagram size={18} />, href: content.settings?.socials.instagram },
                { icon: <Linkedin size={18} />, href: content.settings?.socials.linkedin },
                { icon: <Facebook size={18} />, href: "https://facebook.com/indiaeurasia" }, // Keeping one fallback for now as it's not in the main settings yet
              ].filter(s => s.href).map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E87722] hover:text-white hover:border-[#E87722] transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Navigation</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-[#E87722] transition-colors flex items-center">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#E87722] transition-colors">About Us</Link></li>
              <li><Link href="/research" className="hover:text-[#E87722] transition-colors">Research & Analysis</Link></li>
              <li><Link href="/digieurasia" className="hover:text-[#E87722] transition-colors">DigiEurasia</Link></li>
              <li><Link href="/our-people" className="hover:text-[#E87722] transition-colors">Our People</Link></li>
              <li><Link href="/write-for-us" className="hover:text-[#E87722] transition-colors">Write for Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-8">Get in Touch</h3>
            <ul className="space-y-6 text-sm text-gray-400">
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#E87722] group-hover:bg-[#E87722] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(232,119,34,0.4)] transition-all">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Our Location</p>
                  <p>New Delhi, India</p>
                </div>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-[#E87722] group-hover:bg-[#E87722] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(232,119,34,0.4)] transition-all">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white font-semibold mb-1">Email Us</p>
                  <a href="mailto:connect@indiaeurasia.org" className="hover:text-[#E87722] transition-colors">connect@indiaeurasia.org</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm">
              <h3 className="text-white font-bold mb-2">{c.newsletterTitle}</h3>
              <p className="text-gray-400 text-xs mb-6">{c.newsletterBody}</p>
              {status === 'success' ? (
                <div className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 p-3 rounded-full border border-green-500/30 font-bold text-sm">
                  <Check size={16} />
                  Subscribed!
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center bg-white/10 rounded-full p-1 border border-white/10 focus-within:border-[#E87722] transition-colors">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email" 
                    disabled={status === 'submitting'}
                    className="bg-transparent text-sm w-full px-4 outline-none text-white placeholder:text-gray-500 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting' || !email}
                    className="bg-[#E87722] text-white p-2 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
                  >
                    {status === 'submitting' ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={16} />
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="border-t border-white/10 pt-10 pb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
               <div className="flex items-center space-x-4 cursor-default group/ganga">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg group-hover/ganga:shadow-[#E87722]/40 p-3 flex items-center justify-center transition-all duration-500 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#E87722]/0 to-[#E87722]/0 group-hover/ganga:from-[#E87722]/5 group-hover/ganga:to-[#E87722]/10 transition-all duration-500"></div>
                    <div className="w-10 h-10 relative z-10 transition-all group-hover/ganga:scale-105 flex items-center justify-center">
                      <img src="/volga_to_ganga_final.png" alt="Volga to Ganga Logo" className="w-full h-full object-contain" />
                    </div>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 group-hover/ganga:text-white transition-colors">Volga to Ganga</span>
               </div>
            </div>
            <div className="text-gray-500 text-xs font-medium">
               {content.settings?.footerCopyright || `© ${new Date().getFullYear()} India Eurasia Research Forum. All rights reserved.`}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
