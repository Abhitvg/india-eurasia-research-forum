"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Globe, BookOpen, CalendarDays, Users, PenLine, Camera, MessageSquare, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const pathname = usePathname() || '/';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = target;
      combo.dispatchEvent(new Event('change'));
      return;
    }

    const domain = window.location.hostname;
    document.cookie = `googtrans=/en/${target};path=/;domain=${domain}`;
    document.cookie = `googtrans=/en/${target};path=/`;
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none transition-all duration-500">
      <motion.div
        animate={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(24px)',
          boxShadow: scrolled
            ? '0 20px 40px -10px rgba(10,25,47,0.1), 0 0 0 1px rgba(255,255,255,0.5)'
            : '0 10px 30px -10px rgba(10,25,47,0.05), 0 0 0 1px rgba(255,255,255,0.4)',
          y: scrolled ? -8 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="pointer-events-auto relative flex items-center justify-between w-full max-w-[1200px] h-[68px] md:h-[76px] px-3 md:px-4 rounded-full border border-white/60"
      >
        {/* ── Logo ── */}
        <div className="flex shrink-0 items-center pl-2">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white rounded-full shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-[#E87722]/30 transition-all duration-300">
              <img
                src="/ierf_normal.png"
                alt="IERF Logo"
                className="w-[70%] h-[70%] object-contain"
              />
            </div>
            <span className="hidden lg:block font-black tracking-[0.1em] text-[#0A192F] text-[12px] uppercase group-hover:text-[#E87722] transition-colors" style={{ fontFamily: 'var(--font-outfit)' }}>
              India Eurasia<br/><span className="text-gray-400 font-medium tracking-[0.2em] text-[9px]">Research Forum</span>
            </span>
          </Link>
        </div>

        {/* ── Desktop Nav ── */}
        <div className="hidden lg:flex flex-1 justify-center items-center px-4">
          <nav className="flex items-center gap-2">
            <NavLink to="/" label="Home" active={pathname === '/'} />
            <NavLink to="/about" label="About Us" active={pathname === '/about'} />

            {/* Events Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsEventsOpen(true)}
              onMouseLeave={() => setIsEventsOpen(false)}
            >
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[14px] font-bold transition-all duration-300 ${pathname.includes('/events') ? 'text-[#E87722] bg-[#E87722]/10' : 'text-[#0A192F] hover:text-[#E87722] hover:bg-gray-50'}`}>
                Events <ChevronDown size={14} className={`transition-transform duration-300 ${isEventsOpen ? 'rotate-180 text-[#E87722]' : 'text-gray-400'}`} />
              </button>
              <AnimatePresence>
                {isEventsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/80 p-3 flex flex-col gap-1"
                  >
                    <DropdownItem to="/events/volga-to-ganga" title="Volga to Ganga" desc="Civilizational Dialogue Series" icon={<CalendarDays size={20} />} />
                    <DropdownItem to="/events/ierf-talks" title="IERF Talks" desc="Expert Perspectives & Analysis" icon={<MessageSquare size={20} />} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Research Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setIsResearchOpen(true)}
              onMouseLeave={() => setIsResearchOpen(false)}
            >
              <button className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[14px] font-bold transition-all duration-300 ${pathname.includes('/research') || pathname.includes('/digieurasia') ? 'text-[#E87722] bg-[#E87722]/10' : 'text-[#0A192F] hover:text-[#E87722] hover:bg-gray-50'}`}>
                Research <ChevronDown size={14} className={`transition-transform duration-300 ${isResearchOpen ? 'rotate-180 text-[#E87722]' : 'text-gray-400'}`} />
              </button>
              <AnimatePresence>
                {isResearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-white/80 p-3 flex flex-col gap-1"
                  >
                    <DropdownItem to="/research" title="Publications" desc="Analytical articles on Eurasia" icon={<PenLine size={20} />} />
                    <DropdownItem to="/digieurasia" title="DigiEurasia" desc="Digital Heritage Gallery" icon={<Camera size={20} />} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink to="/our-people" label="Our People" active={pathname === '/our-people'} />
          </nav>
        </div>

        {/* ── Right CTA Container ── */}
        <div className="flex shrink-0 items-center gap-2 pr-1 md:pr-2">
          {/* Language Switcher */}
          <div className="hidden lg:flex items-center gap-1 p-1.5 bg-gray-100/50 rounded-full border border-gray-200/50 mr-2">
            {(['EN', 'HI', 'RU'] as const).map((l) => (
              <button
                key={l}
                onClick={() => switchLanguage(l)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-black tracking-wider transition-all duration-300 ${lang === l
                  ? 'bg-white text-[#0A192F] shadow-sm'
                  : 'text-gray-400 hover:text-[#0A192F] hover:bg-white/50'
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <Link
            href="/write-for-us"
            className="hidden md:flex items-center justify-center px-5 py-2.5 rounded-full text-[13px] font-bold text-[#0A192F] hover:text-[#E87722] hover:bg-[#E87722]/5 transition-colors"
          >
            Submit Analysis
          </Link>
          
          <Link
            href="/contact"
            className="hidden sm:flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold tracking-wide text-white bg-[#E87722] hover:bg-orange-600 transition-all shadow-[0_4px_14px_rgba(232,119,34,0.3)] hover:shadow-[0_6px_20px_rgba(232,119,34,0.4)] hover:-translate-y-0.5"
          >
            Connect <ArrowRight size={14} />
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-3 rounded-full lg:hidden block transition-all text-[#0A192F] bg-gray-50 hover:bg-gray-100 border border-gray-200/50 ml-2"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
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
              className="absolute inset-0 bg-[#0A192F]/40 backdrop-blur-md pointer-events-auto"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[320px] max-w-[85vw] bg-[#FAFAFA] flex flex-col pointer-events-auto shadow-2xl overflow-hidden rounded-l-[2rem]"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-200/50 bg-white">
                <div className="text-[#0A192F] font-black tracking-tight text-xl font-display">IERF</div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 text-[#0A192F] hover:bg-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                <div className="space-y-6">
                  {/* Language Selector */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 block px-1">Language</span>
                    <div className="flex items-center gap-2">
                      {(['EN', 'HI', 'RU'] as const).map((l) => (
                        <button
                          key={l}
                          onClick={() => switchLanguage(l)}
                          className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${lang === l
                            ? 'bg-[#0A192F] text-white shadow-md'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {l === 'EN' ? 'English' : l === 'HI' ? 'हिन्दी' : 'Русский'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <MobileNavLink to="/" label="Home" icon={<Globe size={20} />} onClick={() => setIsMenuOpen(false)} />
                    <MobileNavLink to="/about" label="About Us" icon={<BookOpen size={20} />} onClick={() => setIsMenuOpen(false)} />
                    
                    {/* Nested Research */}
                    <div className="pt-4 pb-2">
                      <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Research</div>
                      <MobileNavLink to="/research" label="Publications" icon={<PenLine size={20} />} onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/digieurasia" label="DigiEurasia" icon={<Camera size={20} />} onClick={() => setIsMenuOpen(false)} />
                    </div>

                    {/* Nested Events */}
                    <div className="pt-2 pb-2">
                      <div className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Initiatives</div>
                      <MobileNavLink to="/events/volga-to-ganga" label="Volga to Ganga" icon={<CalendarDays size={20} />} onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/events/ierf-talks" label="IERF Talks" icon={<MessageSquare size={20} />} onClick={() => setIsMenuOpen(false)} />
                    </div>

                    <MobileNavLink to="/our-people" label="Our People" icon={<Users size={20} />} onClick={() => setIsMenuOpen(false)} />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white border-t border-gray-200/50 flex flex-col gap-3">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-4 rounded-2xl bg-[#E87722] text-white font-bold text-sm shadow-[0_8px_20px_rgba(232,119,34,0.3)] transition-all"
                >
                  Contact Us
                </Link>
                <Link
                  href="/write-for-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center py-4 rounded-2xl bg-gray-50 text-[#0A192F] border border-gray-200 hover:bg-gray-100 font-bold text-sm transition-all"
                >
                  Submit Analysis
                </Link>
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
      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-[#0A192F] font-bold text-[15px] hover:bg-white hover:shadow-sm hover:text-[#E87722] transition-all group"
    >
      <span className="text-gray-400 group-hover:text-[#E87722] transition-colors">{icon}</span>
      {label}
    </Link>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      href={to}
      className={`px-4 py-2 rounded-full text-[14px] font-bold whitespace-nowrap transition-all duration-300 ${
        active ? 'text-[#E87722] bg-[#E87722]/10' : 'text-[#0A192F] hover:text-[#E87722] hover:bg-gray-50'
      }`}
    >
      {label}
    </Link>
  );
}

function DropdownItem({ to, title, desc, icon }: { to: string; title: string; desc: string; icon: React.ReactNode }) {
  return (
    <Link
      href={to}
      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all group"
    >
      <div className="mt-0.5 text-gray-400 group-hover:text-[#E87722] transition-colors">
        {icon}
      </div>
      <div>
        <div className="text-[14px] font-bold text-[#0A192F] group-hover:text-[#E87722] mb-1 transition-colors">{title}</div>
        <div className="text-[12px] text-gray-500 font-medium leading-snug">{desc}</div>
      </div>
    </Link>
  );
}
