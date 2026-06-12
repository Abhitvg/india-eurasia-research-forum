"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Mail, Facebook, Twitter, Instagram, Menu, X, ChevronDown, Send, BookOpen, CalendarDays, Globe, Users, PenLine, MessageSquare, Compass, ChevronRight, Camera } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const pathname = usePathname() || '/';
  const isHomePage = pathname === '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Detect current language from googtrans cookie on initial load
  const getLangFromCookie = (): 'EN' | 'HI' | 'RU' => {
    if (typeof document === 'undefined') return 'EN';
    const match = document.cookie.match(/googtrans=\/en\/(\w+)/);
    if (!match) return 'EN';
    if (match[1] === 'hi') return 'HI';
    if (match[1] === 'ru') return 'RU';
    return 'EN';
  };
  const [lang, setLang] = useState<'EN' | 'HI' | 'RU'>(getLangFromCookie);

  const switchLanguage = (l: 'EN' | 'HI' | 'RU') => {
    setLang(l);
    const langMap: Record<string, string> = { EN: 'en', HI: 'hi', RU: 'ru' };
    const target = langMap[l];

    // Try live switch via hidden Google Translate combo select
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = target;
      combo.dispatchEvent(new Event('change'));
      return;
    }

    // Fallback: Set cookie and reload
    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${target};path=/;domain=${domain}`;
    document.cookie = `googtrans=/en/${target};path=/`;
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLight = isHomePage && !scrolled;

  return (
    <header className="fixed top-0 left-0 w-full z-50 pointer-events-none flex justify-center pt-2 md:pt-4 transition-all duration-300">
      <motion.div
        animate={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          boxShadow: scrolled
            ? '0 10px 40px -10px rgba(27,59,95,0.2), 0 0 0 1px rgba(0,0,0,0.03)'
            : '0 0px 0px rgba(0,0,0,0)',
          borderRadius: scrolled ? '9999px' : '0px',
          border: scrolled ? '1px solid rgba(0,0,0,0.05)' : '1px solid rgba(255,255,255,0)',
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20,
          mass: 1 
        }}
        className="pointer-events-auto relative flex items-center justify-between w-[95%] max-w-[1280px] h-14 md:h-16 px-2 md:px-3"
      >
        {/* ── Logo & Wordmark ── */}
        <div className="flex shrink-0 items-center">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className={`relative flex-shrink-0 transition-all duration-500 flex items-center justify-center ${scrolled ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-16 md:h-16'}`}>
              <img
                src="/ierf_normal.png"
                alt="IERF Logo"
                className={`w-full h-full object-contain transition-all duration-500 ${isLight ? 'brightness-0 invert drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]' : 'drop-shadow-sm'}`}
              />
            </div>

            <span
              className={`hidden sm:block font-black tracking-[0.08em] transition-all duration-300 whitespace-nowrap ${
                isLight ? 'text-white' : 'text-[#1B3B5F]'
              } ${
                scrolled ? 'text-[8px] md:text-[12px]' : 'text-[9px] md:text-[13px]'
              }`}
              style={{ fontFamily: '"Outfit", sans-serif' }}
            >
              INDIA EURASIA RESEARCH FORUM
            </span>
          </Link>
        </div>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex flex-1 justify-center items-center px-4">
          {/* Nav pill */}
          <motion.nav
            animate={{
              backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255, 255, 255, 0)',
              backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
              boxShadow: scrolled
                ? '0 4px 20px rgba(0,0,0,0.08)'
                : 'none',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="flex items-center gap-1 px-2 py-1.5 rounded-full"
          >
            <NavLink to="/" label="Home" scrolled={scrolled} isLight={isLight} />
            <NavLink to="/about" label="About Us" scrolled={scrolled} isLight={isLight} />

            {/* Events dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsEventsOpen(true)}
              onMouseLeave={() => setIsEventsOpen(false)}
            >
              <button className={`flex items-center whitespace-nowrap gap-1 px-3 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                isLight ? 'text-white' : 'text-[#1B3B5F]'
              } hover:bg-[#E87722]/10 hover:text-[#E87722]`}>
                Events <ChevronDown size={13} className={`transition-transform duration-300 ${isEventsOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isEventsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    className="absolute top-full left-0 mt-4 w-60 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-2"
                  >
                    <div className="absolute -top-1.5 left-6 w-4 h-4 bg-white/95 border-t border-l border-white/50 transform rotate-45" />
                    <DropdownItem
                      to="/events/volga-to-ganga"
                      title="Volga to Ganga"
                      desc="Dialogue Series"
                    />
                    <DropdownItem
                      to="/events/ierf-talks"
                      title="IERF Talks"
                      desc="Expert Perspectives"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Research dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsResearchOpen(true)}
              onMouseLeave={() => setIsResearchOpen(false)}
            >
              <button className={`flex items-center whitespace-nowrap gap-1 px-3 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 ${
                isLight ? 'text-white' : 'text-[#1B3B5F]'
              } hover:bg-[#E87722]/10 hover:text-[#E87722]`}>
                Research & Analysis <ChevronDown size={13} className={`transition-transform duration-300 ${isResearchOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {isResearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.98 }}
                    className="absolute top-full left-0 mt-4 w-60 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/50 p-2"
                  >
                    <div className="absolute -top-1.5 left-6 w-4 h-4 bg-white/95 border-t border-l border-white/50 transform rotate-45" />
                    <DropdownItem
                      to="/research"
                      title="Publications"
                      desc="Analytical articles on Eurasia"
                    />
                    <DropdownItem
                      to="/digieurasia"
                      title="DigiEurasia"
                      desc="Community Photo Gallery"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/our-people" label="Our People" scrolled={scrolled} isLight={isLight} />
          </motion.nav>
        </div>

        {/* ── Right CTA Container ── */}
        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          {/* Language Switcher Pill */}
          <motion.div
            animate={{
              backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255, 255, 255, 0)',
              backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
              boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="hidden md:flex items-center gap-1 p-1 rounded-full"
          >
            {(['EN', 'HI', 'RU'] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-black transition-all ${lang === l
                  ? 'bg-white text-[#1B3B5F] shadow-sm'
                  : `${isLight ? 'text-white/60 hover:text-white' : 'text-[#1B3B5F]/60 hover:text-[#1B3B5F]'}`
                } text-[10px] font-black transition-all`}
              >
                {l}
              </button>
            ))}
          </motion.div>

          {/* Action Buttons Pill */}
          <motion.div
            animate={{
              backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255, 255, 255, 0)',
              backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
              boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none',
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="hidden md:flex items-center gap-4 pl-4 pr-1 py-1 rounded-full"
          >
            <Link
              href="/write-for-us"
              className={`text-sm font-semibold transition-all ${
                isLight ? 'text-white hover:text-[#E87722]' : 'text-[#1B3B5F] hover:text-[#E87722]'
              }`}
            >
              Write for Us
            </Link>
            <Link
              href="/contact"
              aria-label="Navigate to contact page"
              className={`px-5 py-2 rounded-full text-[13px] font-bold transition-all shadow-sm ${scrolled
                  ? 'bg-[#E87722] text-white hover:bg-orange-600 hover:shadow-[0_0_15px_rgba(232,119,34,0.4)]'
                  : 'bg-white text-[#1B3B5F] hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-gray-100'
                }`}
            >
              Contact Us
            </Link>
          </motion.div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className={`p-2 rounded-full lg:hidden block transition-all text-[#1B3B5F] bg-gray-100/80 hover:bg-gray-200/80`}
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>

      {/* ── Mobile Menu (Right Drawer) ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[300px] bg-white flex flex-col pointer-events-auto shadow-2xl"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-50">
                <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 group">
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img src="/ierf_normal.png" className="w-full h-full object-contain" alt="IERF" />
                  </div>
                  <div>
                    <div className="text-[#1B3B5F] font-black tracking-tight text-lg">IERF</div>
                    <div className="text-[#E87722] text-[9px] uppercase tracking-[0.2em] font-bold">Research Forum</div>
                  </div>
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-[#1B3B5F]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="space-y-6">
                  {/* Language Selector in Mobile Menu */}
                  <div className="bg-gray-50 rounded-2xl p-4 flex flex-col gap-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Select Language</span>
                    <div className="flex items-center gap-2">
                      {(['EN', 'HI', 'RU'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => switchLanguage(l)}
                          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${lang === l
                            ? 'bg-[#1B3B5F] text-white shadow-lg shadow-[#1B3B5F]/20'
                            : 'bg-white text-[#1B3B5F] border border-gray-100 hover:border-[#1B3B5F]/30'
                          }`}
                        >
                          {l === 'EN' ? 'English' : l === 'HI' ? 'हिन्दी' : 'Русский'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <MobileNavLink to="/" label="Home" icon={<Globe size={18} />} onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/about" label="About Us" icon={<BookOpen size={18} />} onClick={() => setIsMenuOpen(false)} />
                    
                    {/* Nested Research */}
                    <div className="pt-2 pb-1">
                      <div className="flex items-center gap-4 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Research</div>
                      <MobileNavLink to="/research" label="Publications" icon={<PenLine size={18} />} onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/digieurasia" label="DigiEurasia" icon={<Camera size={18} />} onClick={() => setIsMenuOpen(false)} />
                    </div>

                    {/* Nested Events */}
                    <div className="pt-2 pb-1">
                      <div className="flex items-center gap-4 px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Initiatives</div>
                      <MobileNavLink to="/events/volga-to-ganga" label="Volga to Ganga" icon={<CalendarDays size={18} />} onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/events/ierf-talks" label="IERF Talks" icon={<MessageSquare size={18} />} onClick={() => setIsMenuOpen(false)} />
                    </div>

                    <MobileNavLink to="/our-people" label="Our People" icon={<Users size={18} />} onClick={() => setIsMenuOpen(false)} />
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-50 bg-gray-50/50 space-y-6">
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href="/write-for-us"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center py-4 rounded-2xl bg-white border border-gray-100 text-[#1B3B5F] font-bold text-xs hover:border-[#1B3B5F]/30 transition-all"
                  >
                    Write for Us
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center py-4 rounded-2xl bg-[#E87722] text-white font-bold text-xs shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                  >
                    Contact Us
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-center gap-6">
                    <Facebook size={20} className="text-gray-400 hover:text-[#1B3B5F] transition-colors" />
                    <Twitter size={20} className="text-gray-400 hover:text-[#1B3B5F] transition-colors" />
                    <Instagram size={20} className="text-gray-400 hover:text-[#1B3B5F] transition-colors" />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-widest leading-relaxed">
                    IERF • © 2026<br />All Rights Reserved
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavLink({ to, label, icon, onClick }: { to: string; label: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <Link
      href={to}
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[#1B3B5F] font-bold text-sm hover:bg-gray-100/50 transition-all group"
    >
      <span className="text-gray-300 group-hover:text-[#E87722] transition-colors">{icon}</span>
      {label}
    </Link>
  );
}

function NavLink({ to, label, scrolled, isLight }: { to: string; label: string; scrolled: boolean; isLight: boolean }) {
  return (
    <Link
      href={to}
      className={`px-3 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all duration-200 ${
        isLight ? 'text-white' : 'text-[#1B3B5F]'
      } hover:text-[#E87722] hover:bg-[#E87722]/5`}
    >
      {label}
    </Link>
  );
}

function DropdownItem({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link
      href={to}
      className="block px-4 py-3 rounded-xl hover:bg-[#1B3B5F]/5 transition-all group"
    >
      <div className="transform group-hover:translate-x-1 transition-transform duration-300">
        <div className="text-[13px] font-black text-[#1B3B5F] group-hover:text-[#E87722] leading-tight mb-0.5">{title}</div>
        <div className="text-[11px] text-[#1B3B5F]/60 font-medium leading-tight">{desc}</div>
      </div>
    </Link>
  );
}
