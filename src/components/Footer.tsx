"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, Check } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Footer() {
  const pathname = usePathname() || '/';
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

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-[#0A192F] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-5 md:pr-8">
            <Link href="/" className="flex items-center space-x-4 mb-8">
              <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                 <Image src="/ierf_normal.png" alt="IERF Logo" width={56} height={56} className="w-full h-full object-contain scale-[1.35]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl text-white tracking-wide">{content.settings?.siteName || "IERF"}</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">Research Forum</span>
              </div>
            </Link>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              {c.description || "India Eurasia Research Forum is a premier academic platform promoting research, dialogue, and trans-regional connectivity."}
            </p>
            <div className="flex items-center space-x-4">
              {[
                { icon: <Twitter size={18} />, href: content.settings?.socials.x, label: "Twitter" },
                { icon: <Instagram size={18} />, href: content.settings?.socials.instagram, label: "Instagram" },
                { icon: <Linkedin size={18} />, href: content.settings?.socials.linkedin, label: "LinkedIn" },
                { icon: <Facebook size={18} />, href: "https://facebook.com/indiaeurasia", label: "Facebook" },
              ].filter(s => s.href).map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#E87722] hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Platform</h3>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-[#E87722] transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-[#E87722] transition-colors">About Us</Link></li>
              <li><Link href="/research" className="hover:text-[#E87722] transition-colors">Research</Link></li>
              <li><Link href="/events/volga-to-ganga" className="hover:text-[#E87722] transition-colors">Volga to Ganga</Link></li>
              <li><Link href="/our-people" className="hover:text-[#E87722] transition-colors">Our People</Link></li>
              <li><Link href="/write-for-us" className="hover:text-[#E87722] transition-colors">Submit Analysis</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Reach Out</h3>
            <ul className="space-y-6 text-gray-400 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-[#E87722] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Location</p>
                  <p>New Delhi, India</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={18} className="text-[#E87722] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <a href="mailto:connect@indiaeurasia.org" className="hover:text-[#E87722] transition-colors">connect@indiaeurasia.org</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-3">
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h3 className="text-white font-bold text-xl mb-2">{c.newsletterTitle || "Stay Informed"}</h3>
              <p className="text-gray-400 text-sm mb-6">{c.newsletterBody || "Get the latest analysis and insights on Eurasian geopolitics delivered to your inbox."}</p>
              {status === 'success' ? (
                <div className="flex items-center justify-center gap-2 bg-green-500/20 text-green-400 p-3 rounded font-bold text-sm">
                  <Check size={16} />
                  Subscription Confirmed
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    disabled={status === 'submitting'}
                    className="w-full bg-black/20 text-sm px-4 py-3 rounded outline-none text-white placeholder:text-gray-500 border border-white/10 focus:border-[#E87722] transition-colors mb-3 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={status === 'submitting' || !email}
                    className="w-full bg-[#E87722] text-white py-3 rounded font-bold text-sm hover:bg-orange-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Subscribe <Send size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} India Eurasia Research Forum. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
