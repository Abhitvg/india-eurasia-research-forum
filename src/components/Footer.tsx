"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Footer() {
  const { content } = useContent();
  const c = content.footer || {} as any;
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
    <footer className="bg-[#0A192F] text-white pt-24 pb-12 overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-[#E87722] opacity-[0.03] rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-blue-400 opacity-[0.03] rounded-full blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-5 pr-8">
            <Link href="/" className="flex items-center space-x-4 mb-10 group">
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(232,119,34,0.3)] transition-all duration-500 relative overflow-hidden group-hover:-translate-y-1">
                 <img src="/ierf_normal.png" alt="IERF Logo" className="w-[70%] h-[70%] object-contain relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tighter text-white group-hover:text-[#E87722] transition-colors">{content.settings?.siteName || "IERF"}</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Research Forum</span>
              </div>
            </Link>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 font-medium">
              {c.description || "India Eurasia Research Forum is a premier academic platform promoting research, dialogue, and trans-regional connectivity."}
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: <Twitter size={20} />, href: content.settings?.socials.x },
                { icon: <Instagram size={20} />, href: content.settings?.socials.instagram },
                { icon: <Linkedin size={20} />, href: content.settings?.socials.linkedin },
                { icon: <Facebook size={20} />, href: "https://facebook.com/indiaeurasia" },
              ].filter(s => s.href).map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#E87722] hover:text-white hover:border-[#E87722] transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Platform</h3>
            <ul className="space-y-5 text-gray-400 font-medium">
              <li><Link href="/" className="hover:text-[#E87722] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-[#E87722] rounded-full opacity-0 group-hover:opacity-100"></span>Home</Link></li>
              <li><Link href="/about" className="hover:text-[#E87722] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-[#E87722] rounded-full opacity-0 group-hover:opacity-100"></span>About Us</Link></li>
              <li><Link href="/research" className="hover:text-[#E87722] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-[#E87722] rounded-full opacity-0 group-hover:opacity-100"></span>Research</Link></li>
              <li><Link href="/events/volga-to-ganga" className="hover:text-[#E87722] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-[#E87722] rounded-full opacity-0 group-hover:opacity-100"></span>Volga to Ganga</Link></li>
              <li><Link href="/our-people" className="hover:text-[#E87722] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-[#E87722] rounded-full opacity-0 group-hover:opacity-100"></span>Our People</Link></li>
              <li><Link href="/write-for-us" className="hover:text-[#E87722] transition-colors flex items-center gap-2 group"><span className="w-1 h-1 bg-[#E87722] rounded-full opacity-0 group-hover:opacity-100"></span>Submit Analysis</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] mb-8">Reach Out</h3>
            <ul className="space-y-8 text-gray-400 font-medium">
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E87722] group-hover:bg-[#E87722] group-hover:text-white transition-all shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Location</p>
                  <p className="text-sm">New Delhi, India</p>
                </div>
              </li>
              <li className="flex items-start space-x-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#E87722] group-hover:bg-[#E87722] group-hover:text-white transition-all shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white font-bold mb-1">Email</p>
                  <a href="mailto:connect@indiaeurasia.org" className="text-sm hover:text-[#E87722] transition-colors">connect@indiaeurasia.org</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E87722]/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2"></div>
              <h3 className="text-white font-display font-black text-2xl mb-3 relative z-10">{c.newsletterTitle || "Stay Informed"}</h3>
              <p className="text-gray-400 text-sm mb-8 relative z-10">{c.newsletterBody || "Get the latest analysis and insights on Eurasian geopolitics delivered to your inbox."}</p>
              {status === 'success' ? (
                <div className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 p-4 rounded-full border border-green-500/30 font-bold text-sm">
                  <Check size={18} />
                  Subscription Confirmed
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    disabled={status === 'submitting'}
                    className="w-full bg-black/20 text-sm px-6 py-4 rounded-full outline-none text-white placeholder:text-gray-500 border border-white/10 focus:border-[#E87722] transition-colors mb-4 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting' || !email}
                    className="w-full bg-[#E87722] text-white py-4 rounded-full font-bold text-sm hover:bg-orange-600 transition-colors shadow-lg hover:shadow-[0_4px_20px_rgba(232,119,34,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Subscribe <Send size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Affiliate Section */}
        <div className="border-t border-white/10 pt-10 pb-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-4 cursor-default group/ganga">
            <div className="w-14 h-14 bg-white rounded-2xl p-2.5 flex items-center justify-center transition-all duration-500 group-hover/ganga:-translate-y-1 shadow-lg">
              <img src="/volga_to_ganga_final.png" alt="Volga to Ganga" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Initiative Partner</span>
              <span className="text-sm font-bold text-gray-300 group-hover/ganga:text-white transition-colors">Volga to Ganga</span>
            </div>
          </div>
          
          <div className="text-gray-500 text-xs font-bold tracking-widest uppercase text-center md:text-right">
             {content.settings?.footerCopyright || `© ${new Date().getFullYear()} IERF. All rights reserved.`}
          </div>
        </div>
      </div>
    </footer>
  );
}
